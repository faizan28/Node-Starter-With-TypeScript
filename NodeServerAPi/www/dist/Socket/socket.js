"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../enums/index");
// const SocketIO = require("socket.io");
const SocketIO = require("socket.io");
const ChannelController_1 = require("../controllers/ChannelController");
const ConverstaionController_1 = require("../controllers/ConverstaionController");
const moment = require("moment");
let _io;
class ChatSocket {
    constructor() {
        this._Channel = new ChannelController_1.ChannelClass();
        this._Conversation = new ConverstaionController_1.ConversationClass();
    }
    init(listener) {
        try {
            _io = SocketIO.listen(listener);
            _io.on('connection', (socket) => {
                console.log(socket.conn.id);
                console.log(socket.client.sockets);
                socket.on('disconnect', function () {
                    console.log('socket has disconnected from the chat.' + socket.id);
                });
                socket.on('agentmarkasdelivered:channel', (data) => {
                    this.MarkasDelivered(data);
                });
                socket.on('io:sendmessageagent', (data) => {
                    this.SendMessage(data);
                });
                socket.on('subscribe:channel', (data) => {
                    if (data) {
                        //Create Channel With Participants
                        this._Channel.registerChannelv2(data);
                    }
                });
            });
        }
        catch (err) {
            console.log('Error starting server: ', err);
            throw err;
        }
    }
    MarkasDelivered(messageObject) {
        console.log('agentmarkasdelivered:channel=>', messageObject);
        messageObject.MessageDeliveredStatus = index_1.MessageDeliveryType.seen;
        this._Conversation.updateMessageDeliveredStatus(messageObject);
    }
    SendMessage(messageObject) {
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
        messageObject.MessageDeliveredStatus = index_1.MessageDeliveryType.delivered;
        messageObject.MessageStatusType = index_1.MessageStatusType.none;
        if (messageObject.MessageType === index_1.MessageSendingType.TEXT) {
            var clients = _io.sockets.Client;
            // console.log('Clients=>',clients);
            _io.emit(messageObject.ConverstationChannel, messageObject);
            this.PublishSocket(messageObject);
            // this.PublishSocket(message.channel,message);
        }
        // console.log('MessageRecived=>', messageObject);
    }
    PublishSocket(message) {
        this._Conversation.MessagePush(message);
    }
}
exports.ChatSocket = ChatSocket;
