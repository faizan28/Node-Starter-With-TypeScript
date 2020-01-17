import { ChannelClass } from './ChannelController';
import * as mongoose from 'mongoose';
import { MessageObj } from '../Interfaces';
export declare class ConversationClass {
    _Channel: ChannelClass;
    Conversation: mongoose.Model<mongoose.Document, {}>;
    MessagePush(messageObj: MessageObj): Promise<void>;
    insertMSGinDB(ChannelId: any, messageObj: MessageObj): void;
    LoadMessagesByChannelName(ChannelName: any): Promise<any>;
    updateMessageDeliveredStatus(messageObj: MessageObj): void;
    markAllReadMessages(ChannelName: any, UserId: any): void;
}
