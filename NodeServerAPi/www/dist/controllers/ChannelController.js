"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersModel_1 = require("./../models/usersModel");
const conversationsModel_1 = require("./../models/conversationsModel");
const channelsModel_1 = require("./../models/channelsModel");
const mongoose = require("mongoose");
class ChannelClass {
    // _ConversationClass = new ConversationClass;
    constructor() {
        this.ChannelSchema = mongoose.model('Channel', channelsModel_1.ChannelSchema);
        this.Conversation = mongoose.model('Conversation', conversationsModel_1.ConversationSchema);
        this.User = mongoose.model('Users', usersModel_1.UserSchema);
    }
    getChannelIdbyChannelName(ChannelName) {
        return new Promise((resolve, reject) => {
            try {
                this.ChannelSchema.findOne({ Channel: ChannelName }, (err, res) => {
                    if (!err) {
                        if (res && res._id) {
                            resolve(res._id);
                        }
                        else {
                            resolve(res);
                        }
                    }
                    else {
                        reject(new Error(err));
                    }
                });
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    registerChannel(channelName) {
        try {
            let channelObject = channelName.split(':');
            if (channelObject.length > 0) {
                let Source = channelObject[0];
                let Channel = channelObject[1];
                let Destination = channelObject[2];
                // console.log('ChannelName=>',channelObject);                                     
                this.ChannelSchema.findOneAndUpdate({ Channel: Channel }, {
                    $set: {
                        Participants: [
                            {
                                UserId: Source
                            },
                            {
                                UserId: Destination
                            }
                        ]
                    }
                }, { new: true, upsert: true }, (err, data) => {
                    if (err) {
                        console.log('err=>', err);
                    }
                    console.log('data=>', data);
                });
            }
        }
        catch (err) {
            console.log('err', err);
        }
    }
    registerChannelv2(channelName) {
        try {
            let channelObject = channelName.split(':');
            if (channelObject.length > 0) {
                let Source = channelObject[0];
                let Channel = `${channelObject[0]}:${channelObject[1]}:${channelObject[2]}`;
                let Destination = channelObject[2];
                // console.log('ChannelName=>',channelObject);                                     
                this.ChannelSchema.findOne({ Channel: Channel }, (err, res) => {
                    console.log('res=>', res);
                    if (res == null) {
                        let ChannelObj = {
                            Channel: Channel,
                            Participants: [
                                {
                                    UserId: Source,
                                },
                                {
                                    UserId: Destination,
                                },
                            ]
                        };
                        this.ChannelSchema.create(ChannelObj, (data) => {
                            console.log(data);
                        });
                    }
                });
            }
        }
        catch (err) {
            console.log('err', err);
        }
    }
    getCountMessagesByChannelName(channelName, userId) {
        return new Promise((resolve, reject) => {
            try {
                this.Conversation.findOne({ ChannelName: channelName })
                    .select('Messages')
                    .exec(function (err, res) {
                    if (res && res.Messages && res.Messages.length) {
                        let unReadMsg = res.Messages.filter((x) => x.MessageDeliveredStatus == 1 && x.SourceId != userId);
                        resolve({
                            LastMessage: res.Messages[res.Messages.length - 1],
                            MessageCount: unReadMsg.length
                        });
                        console.log('Message=>', unReadMsg.length);
                    }
                    else {
                        resolve({
                            LastMessage: null,
                            MessageCount: null
                        });
                    }
                });
            }
            catch (error) {
            }
        });
    }
    async getChannelListbyUserId(Userid) {
        console.log('USerId=>', Userid);
        return new Promise((resolve, reject) => {
            try {
                this.ChannelSchema.find({ "Participants.UserId": Userid }, (err, res) => {
                    if (!err) {
                        // console.log(res)
                        resolve(res);
                    }
                    else {
                        console.log(err);
                        resolve(err.message);
                    }
                });
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async getUserNameById(UserId) {
        return new Promise((resolve, reject) => {
            try {
                this.User.find({ "UserId": UserId })
                    .select({ 'UserName': 1, "_id": 0, "UserId": 1 })
                    .exec((err, res) => {
                    if (!err) {
                        // console.log(res)
                        resolve(res);
                    }
                    else {
                        console.log(err);
                        resolve(err.message);
                    }
                });
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async getChannelData(userId) {
        let ChannelData = await this.getChannelListbyUserId(userId);
        let messageData = [];
        let finalData = [];
        let IndexChannelData = [];
        for (let i = 0; i < ChannelData.length; i++) {
            IndexChannelData.push({
                _id: ChannelData[i]._id,
                Channel: ChannelData[i].Channel,
                Participants: ChannelData[i].Participants,
                createdAt: ChannelData[i].createdAt,
                updatedAt: ChannelData[i].updatedAt,
                SourceInfo: {}
            });
            if (ChannelData[i] && ChannelData[i].Participants) {
                for (let j = 0; j < ChannelData[i].Participants.length; j++) {
                    let UserName = await this.getUserNameById(ChannelData[i].Participants[j].UserId);
                    if (UserName) {
                        Object.assign(ChannelData[i].Participants[j], UserName[0]);
                    }
                }
                let SourceInfo = ChannelData[i].Participants.filter((x) => x.UserId != userId);
                // ChannelData[i].SourceInfo = SourceInfo[0];            
                IndexChannelData[i].SourceInfo = SourceInfo.length > 0 ? SourceInfo[0] : SourceInfo;
            }
            messageData.push(await this.getCountMessagesByChannelName(ChannelData[i].Channel, userId));
        }
        for (let index = 0; index < IndexChannelData.length; index++) {
            finalData.push({
                ChannelData: IndexChannelData[index],
                Message: messageData[index]
            });
        }
        return new Promise((resolve, reject) => {
            resolve(finalData);
        });
    }
}
exports.ChannelClass = ChannelClass;
