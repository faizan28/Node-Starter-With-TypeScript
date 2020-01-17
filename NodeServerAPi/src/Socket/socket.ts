import { MessageDeliveryType, MessageStatusType, MessageSendingType } from './../enums/index';
// const SocketIO = require("socket.io");
import * as SocketIO from 'socket.io';
import { ChannelClass } from '../controllers/ChannelController';
import { ConversationClass } from '../controllers/ConverstaionController';
import { MessageObj } from '../Interfaces';
import { FCMNODE } from '../FCM/fcm-node';
const moment = require("moment");
let _io: any;

export class ChatSocket {

    _Channel = new ChannelClass();
    _Conversation = new ConversationClass();
    _FCMNode = new FCMNODE();
    constructor() {
    }
    init(listener: any) {
        try {
            _io = SocketIO.listen(listener);
            _io.on('connection', (socket: SocketIO.Socket) => {
                console.log(socket.conn.id);
                // console.log(socket.client.sockets);           
                socket.on('disconnect', function () {
                    console.log('socket has disconnected from the chat.' + socket.id);
                });
                socket.on('agentmarkasdelivered:channel', (data: MessageObj) => {
                    this.MarkasDelivered(data);
                });
                socket.on('io:sendmessageagent', (data: any) => {
                    this.SendMessage(data);
                });
                socket.on('subscribe:channel', (data: any) => {
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
    MarkasDelivered(messageObject: MessageObj) {
        console.log('agentmarkasdelivered:channel=>', messageObject);
        messageObject.MessageDeliveredStatus = MessageDeliveryType.seen;
        this._Conversation.updateMessageDeliveredStatus(messageObject);
    }
    SendMessage(messageObject: MessageObj) {
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
        messageObject.MessageStatusType = MessageStatusType.none;
        if (messageObject.MessageType === MessageSendingType.TEXT) {
            var clients = _io.sockets.Client;
            // console.log('Clients=>',clients);
            this.getIdandSendNotification(messageObject)
            this.PublishSocket(messageObject);
            // this.PublishSocket(message.channel,message);
        }
        _io.emit(messageObject.ConverstationChannel, messageObject);
        // console.log('MessageRecived=>', messageObject);
    }
    async getIdandSendNotification(messageObject: MessageObj) {
        if (messageObject) {
            let UserId = messageObject.SourceId;
            let ChannelSplit = messageObject.ConverstationChannel.split(':');
            if (ChannelSplit && ChannelSplit.length > 0) {
                if (ChannelSplit[0] == UserId.toString()) {
                    UserId = +ChannelSplit[2];
                }else{
                    UserId = +ChannelSplit[0];
                }     
                 console.log("UserId=>",UserId);
                let Token = await this._Channel.GetTokenByUserId(UserId);
          
                this._FCMNode.sendPushNotification(
                    Token,messageObject.SourceUserName,messageObject.MessageBody,messageObject.ConverstationChannel,UserId.toString())
            }
        }
    }
    PublishSocket(message: any) {
        this._Conversation.MessagePush(message)

    }
}
