import { MessageDeliveryType } from './../enums/index';
import { ChannelClass } from './ChannelController';
import { ConversationSchema } from './../models/conversationsModel';
import * as mongoose from 'mongoose';
import { MessageObj } from '../Interfaces';
export class ConversationClass {
    _Channel = new ChannelClass();
    public Conversation = mongoose.model('Conversation', ConversationSchema);
    async MessagePush(messageObj: MessageObj) {
        try {
            if (messageObj) {
                let channelname = messageObj.ConverstationChannel;
                let ChannelId = await this._Channel.getChannelIdbyChannelName(channelname);
                // console.log('ChannelId=>', ChannelId);
                if (ChannelId != null) {
                    // console.log('InserDb')
                    this.insertMSGinDB(ChannelId, messageObj)
                }
            }
            // this._Channel.getChannelIdbyChannelName(channel).then(data=>{
            //     console.log('Reciced=>',data);
            // }).catch(err=>{
            //     console.log('err=>',err);
            // })
        } catch (error) {
            console.log('error=>', error);
        }
    }
    insertMSGinDB(ChannelId: any, messageObj: MessageObj) {
        this.Conversation.findOneAndUpdate(
            { ChannelId: ChannelId },
            {
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
    LoadMessagesByChannelName(ChannelName: any) {
        return new Promise<any>((resolve, reject) => {
            try {
                this.Conversation.findOne({ ChannelName: ChannelName }, (err, res) => {
                    if (!err) {
                        resolve(res)
                    }
                    else {
                        resolve(err);
                    }
                });
            } catch (error) {
                reject(error);
            }

        });
    }
    updateMessageDeliveredStatus(messageObj: MessageObj) {
        try {
            console.log('DelvierEntry=>', messageObj)
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
        } catch (error) {
            console.log('Error Marking Delivered=>', error);
        }
    }
    markAllReadMessages(ChannelName: any, UserId: any) {
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
                this.Conversation.updateOne({"ChannelName":ChannelName}, {
                    "$set": {
                        "Messages.$[i].MessageDeliveredStatus": MessageDeliveryType.seen
                    },
                }, {
                        arrayFilters: [{
                            "i.SourceId": SourceId
                        }]
                    }
                ).exec((err, res) => {
                    if (!err) {
                        console.log('markAllReadMessages=>', res);
                    }
                    else {
                        console.log('markAllReadMessages:ERROR=>', err.message);
                    }
                });
            }
            else{
                console.log('markAllReadMessages:ERROR=>Channel Not Defined Properly');
            }
        } catch (error) {
            console.log('ERROR:=>', error);
        }
    }
}