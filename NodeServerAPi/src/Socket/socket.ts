import { MessageDeliveryType, MessageStatusType, MessageSendingType } from './../enums/index';
// const SocketIO = require("socket.io");
import * as SocketIO from 'socket.io';
import { ChannelClass } from '../controllers/ChannelController';
import { ConversationClass } from '../controllers/ConverstaionController';
import { MessageObj } from '../Interfaces';
const moment = require("moment");
let _io;

export class ChatSocket {
    _Channel = new ChannelClass();
    _Conversation = new ConversationClass();
    constructor() {
    }
    init(listener) {
        try {
            _io = SocketIO.listen(listener);
            _io.on('connection', (socket: SocketIO.Socket) => {
                console.log(socket.conn.id);
                socket.on('io:sendmessageagent', data=>{
                    this.SendMessage(data);
                });
                socket.on('subscribe:channel', data => {
                    if (data) {
                        //Create Channel With Participants
                        this._Channel.registerChannelv2(data)
                    }
                });
                
            });
        }
        catch (err) {
            console.log('Error starting server: ', err);
            throw err;
        }
    }
    SendMessage(messageObject:MessageObj) {
        // message: Sanitise(messageObject.message),
        // let message = {
        //     id: messageObject.id,
        //     message: messageObject.message,
        //     date: new Date(moment().toDate()),
        //     senderUserName: messageObject.senderUserName,
        //     senderUserId: messageObject.senderUserId,
        //     senderUserImage: messageObject.senderUserImage,
        //     isMedia: messageObject.mediaURL && messageObject.mediaURL.length > 0 ? true : false,
        //     mediaURL: messageObject.mediaURL,
        //     channel: messageObject.channel,
        //     messageType: messageObject.messageType,
        //     messageDeliveryStatus: MessageDeliveryType.delivered,
        //     messageStatusType: MessageStatusType.none,

        // };
        messageObject.MessageDeliveredStatus = MessageDeliveryType.delivered;
        messageObject.MessageStatusType =  MessageStatusType.none;
        if (messageObject.MessageType === MessageSendingType.TEXT) {
            var clients = _io.sockets.Client;
            console.log('Clients=>',clients);
            _io.emit(messageObject.ConverstationChannel,messageObject);
            this.PublishSocket(messageObject);
                // this.PublishSocket(message.channel,message);
        }
        console.log('MessageRecived=>', messageObject);
    }
    PublishSocket(message){
        this._Conversation.MessagePush(message)
     
    }
}
