import { ConversationSchema } from './../models/conversationsModel';
import { ConversationClass } from './ConverstaionController';
import { MessageType } from './../enums/index';
import { ChannelSchema } from './../models/channelsModel';
import * as mongoose from 'mongoose';

export class ChannelClass {
    public ChannelSchema = mongoose.model('Channel', ChannelSchema);
    public Conversation = mongoose.model('Conversation', ConversationSchema);
    // _ConversationClass = new ConversationClass;
    constructor() {
    }
    getChannelIdbyChannelName(ChannelName) {
        return new Promise<string>((resolve, reject) => {
            try {
                this.ChannelSchema.findOne({ Channel: ChannelName }, (err, res: any) => {
                    if (!err) {
                        if (res && res._id) {
                            resolve(res._id);
                        } else {
                            resolve(res);
                        }
                    }
                    else {
                        reject(new Error(err))
                    }
                });
            } catch (error) {
                reject(new Error(error))
            }
        });

    }
    registerChannel(channelName: String) {
        try {
            let channelObject = channelName.split(':');
            if (channelObject.length > 0) {
                let Source = channelObject[0];
                let Channel = channelObject[1];
                let Destination = channelObject[2];
                // console.log('ChannelName=>',channelObject);                                     
                this.ChannelSchema.findOneAndUpdate(
                    { Channel: Channel },
                    {
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
        } catch (err) {
            console.log('err', err);
        }
    }
    registerChannelv2(channelName: String) {
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
                        }
                        this.ChannelSchema.create(ChannelObj, data => {
                            console.log(data);
                        });
                    }
                });
            }
        } catch (err) {
            console.log('err', err);
        }
    }
    getCountMessagesByChannelName(channelName) {
        return new Promise<any>((resolve, reject) => {
            try {
                this.Conversation.findOne({ ChannelName: channelName })
                    .select('Messages')
                    .exec(function (err, res: any) {
                        if (res && res.Messages && res.Messages.length) {
                            resolve({
                                LastMessage: res.Messages[res.Messages.length-1],
                                MessageCount: res.Messages.length
                            })
                            console.log('Message=>', res.Messages.length);
                        }
                        else{
                            resolve({
                                LastMessage: null,
                                MessageCount: null
                            })
                        }
                    });
            } catch (error) {

            }
        });
    }
    async getChannelListbyUserId(Userid: Number) {
        console.log('USerId=>', Userid)
        return new Promise<any>((resolve, reject) => {
            try {
                this.ChannelSchema.find({ "Participants.UserId": Userid }, (err, res: any) => {
                    if (!err) {
                        // console.log(res)


                        resolve(res);
                    }
                    else {
                        console.log(err)
                        resolve(err.message);
                    }

                })

            } catch (error) {
                reject(new Error(error))
            }
        });
    }
    async getChannelData(userId) {
        let ChannelData = await this.getChannelListbyUserId(userId);
        let messageData = []
        let finalData = []

        for (let i = 0; i < ChannelData.length; i++) {
            messageData.push(await this.getCountMessagesByChannelName(ChannelData[i].Channel));
        }
        for (let index = 0; index < ChannelData.length; index++) {
            finalData.push({
                ChannelData:ChannelData[index],
                 Message:messageData[index]
            })
    
        }
        return new Promise<any>((resolve, reject) => {
            resolve(finalData);
        });


    }
}