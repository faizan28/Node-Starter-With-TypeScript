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
                console.log('ChannelId=>', ChannelId);
                if (ChannelId != null) {
                    console.log('InserDb')
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
    insertMSGinDB(ChannelId, messageObj: MessageObj) {
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
                console.log('data=>', data);
            });
    }
    LoadMessagesByChannelName(ChannelName) {
        return new Promise<any>((resolve, reject) => {
            try {
                this.Conversation.findOne({ ChannelName: ChannelName }, (err, res) => {
                    if(!err){
                        resolve(res)
                    }
                    else{
                        resolve(err);
                    }
                });    
            } catch (error) {
                reject(error);
            }
            
        })
    
    }
}