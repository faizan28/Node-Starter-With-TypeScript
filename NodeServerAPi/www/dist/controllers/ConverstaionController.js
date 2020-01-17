"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../enums/index");
const ChannelController_1 = require("./ChannelController");
const conversationsModel_1 = require("./../models/conversationsModel");
const mongoose = require("mongoose");
class ConversationClass {
    constructor() {
        this._Channel = new ChannelController_1.ChannelClass();
        this.Conversation = mongoose.model('Conversation', conversationsModel_1.ConversationSchema);
    }
    async MessagePush(messageObj) {
        try {
            if (messageObj) {
                let channelname = messageObj.ConverstationChannel;
                let ChannelId = await this._Channel.getChannelIdbyChannelName(channelname);
                // console.log('ChannelId=>', ChannelId);
                if (ChannelId != null) {
                    // console.log('InserDb')
                    this.insertMSGinDB(ChannelId, messageObj);
                }
            }
            // this._Channel.getChannelIdbyChannelName(channel).then(data=>{
            //     console.log('Reciced=>',data);
            // }).catch(err=>{
            //     console.log('err=>',err);
            // })
        }
        catch (error) {
            console.log('error=>', error);
        }
    }
    insertMSGinDB(ChannelId, messageObj) {
        this.Conversation.findOneAndUpdate({ ChannelId: ChannelId }, {
            ChannelName: messageObj.ConverstationChannel,
            $push: {
                Messages: [
                    messageObj
                ]
            }
        }, { new: true, upsert: true }, (err, data) => {
            if (err) {
                console.log('err=>', err);
            }
            // console.log('data=>', data);
        });
    }
    LoadMessagesByChannelName(ChannelName) {
        return new Promise((resolve, reject) => {
            try {
                this.Conversation.findOne({ ChannelName: ChannelName }, (err, res) => {
                    if (!err) {
                        resolve(res);
                    }
                    else {
                        resolve(err);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    updateMessageDeliveredStatus(messageObj) {
        try {
            console.log('DelvierEntry=>', messageObj);
            this.Conversation.findOneAndUpdate({
                "ChannelName": messageObj.ConverstationChannel,
                "Messages.MessageId": messageObj.MessageId
            }, {
                "$set": {
                    'Messages.$': messageObj
                }
            }).exec((err, res) => {
                console.log('DeliverdRes=>', res);
            });
        }
        catch (error) {
            console.log('Error Marking Delivered=>', error);
        }
    }
    markAllReadMessages(ChannelName, UserId) {
        try {
            let ChannelSplit = ChannelName.split(':');
            let SourceId = -1;
            if (ChannelSplit && ChannelSplit.length > 0) {
                if (ChannelSplit[0] == UserId) {
                    SourceId = ChannelSplit[2];
                }
                else {
                    SourceId = ChannelSplit[0];
                }
                console.log('ChannelName=>', ChannelName);
                console.log('SourceId=>', SourceId);
                this.Conversation.updateOne({ "ChannelName": ChannelName }, {
                    "$set": {
                        "Messages.$[i].MessageDeliveredStatus": index_1.MessageDeliveryType.seen
                    },
                }, {
                    arrayFilters: [{
                            "i.SourceId": SourceId
                        }]
                }).exec((err, res) => {
                    if (!err) {
                        console.log('markAllReadMessages=>', res);
                    }
                    else {
                        console.log('markAllReadMessages:ERROR=>', err.message);
                    }
                });
            }
            else {
                console.log('markAllReadMessages:ERROR=>Channel Not Defined Properly');
            }
        }
        catch (error) {
            console.log('ERROR:=>', error);
        }
    }
}
exports.ConversationClass = ConversationClass;
