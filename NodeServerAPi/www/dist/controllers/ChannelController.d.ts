import * as mongoose from 'mongoose';
export declare class ChannelClass {
    ChannelSchema: mongoose.Model<mongoose.Document, {}>;
    Conversation: mongoose.Model<mongoose.Document, {}>;
    User: mongoose.Model<mongoose.Document, {}>;
    constructor();
    getChannelIdbyChannelName(ChannelName: any): Promise<string>;
    registerChannel(channelName: String): void;
    registerChannelv2(channelName: String): void;
    getCountMessagesByChannelName(channelName: any, userId: any): Promise<any>;
    getChannelListbyUserId(Userid: Number): Promise<any>;
    getUserNameById(UserId: any): Promise<any>;
    getChannelData(userId: any): Promise<any>;
}
