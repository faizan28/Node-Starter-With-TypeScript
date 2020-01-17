"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Source"] = 0] = "Source";
    MessageType[MessageType["Destinaton"] = 1] = "Destinaton";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var MessageDeliveryType;
(function (MessageDeliveryType) {
    MessageDeliveryType[MessageDeliveryType["pending"] = 0] = "pending";
    MessageDeliveryType[MessageDeliveryType["delivered"] = 1] = "delivered";
    MessageDeliveryType[MessageDeliveryType["seen"] = 2] = "seen";
})(MessageDeliveryType = exports.MessageDeliveryType || (exports.MessageDeliveryType = {}));
var MessageStatusType;
(function (MessageStatusType) {
    MessageStatusType[MessageStatusType["none"] = 0] = "none";
    MessageStatusType[MessageStatusType["update"] = 1] = "update";
    MessageStatusType[MessageStatusType["delete"] = 2] = "delete";
})(MessageStatusType = exports.MessageStatusType || (exports.MessageStatusType = {}));
var MessageSendingType;
(function (MessageSendingType) {
    MessageSendingType[MessageSendingType["TEXT"] = 0] = "TEXT";
    MessageSendingType[MessageSendingType["IMAGE"] = 1] = "IMAGE";
    MessageSendingType[MessageSendingType["TYPING"] = 2] = "TYPING";
    MessageSendingType[MessageSendingType["STOP_TYPING"] = 3] = "STOP_TYPING";
    MessageSendingType[MessageSendingType["AUDIO"] = 4] = "AUDIO";
    MessageSendingType[MessageSendingType["VIDEO"] = 5] = "VIDEO";
})(MessageSendingType = exports.MessageSendingType || (exports.MessageSendingType = {}));
