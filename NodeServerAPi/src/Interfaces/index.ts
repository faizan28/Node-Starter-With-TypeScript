export interface OldMessageObj{
    message: String,
    date:Date,
    senderUserName: String,
    senderUserId: Number,
    senderUserImage: String,
    isMedia: boolean,
    mediaURL: [],
    channel: String,
    messageType: Number,
    messageDeliveryStatus:Number,
    messageStatusType: Number
}
export interface MessageObj{
    MessageId:String
    MessageBody: String,
    CreatedAt:Date,
    SourceUserName: String,
    SourceId: Number,
    SourceUserImage: String,
    IsMedia: boolean,
    MediaURL: [],
    ConverstationChannel: String,
    MessageType: Number,
    MessageDeliveredStatus:Number,
    MessageStatusType: Number
}
export interface IParticipants{
    UserId: Number,
    UserName: String
}
export interface LoadChannelObj{
        _id: String,
        Channel: String,
        Participants: IParticipants[],
        createdAt: String,
        updatedAt: String,
        SourceInfo:{}
} 