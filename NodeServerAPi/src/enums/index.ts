export enum MessageType {
    Source = 0,
    Destinaton = 1,
}
export enum MessageDeliveryType {
    pending = 0,
    delivered = 1,
    seen = 2,
}
export enum MessageStatusType {
    none = 0,
    update = 1,
    delete = 2,
}
export enum MessageSendingType {
    TEXT = 0,
    IMAGE = 1,
    TYPING = 2,
    STOP_TYPING = 3,
    AUDIO = 4,
    VIDEO = 5,
}