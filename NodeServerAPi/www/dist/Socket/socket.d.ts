import { ChannelClass } from '../controllers/ChannelController';
import { ConversationClass } from '../controllers/ConverstaionController';
import { MessageObj } from '../Interfaces';
export declare class ChatSocket {
    _Channel: ChannelClass;
    _Conversation: ConversationClass;
    constructor();
    init(listener: any): void;
    MarkasDelivered(messageObject: MessageObj): void;
    SendMessage(messageObject: MessageObj): void;
    PublishSocket(message: any): void;
}
