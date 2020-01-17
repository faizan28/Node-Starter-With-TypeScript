"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const ConMessages = new Schema({
    MessageId: {
        type: String,
        required: true
    },
    MessageBody: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        required: true
    },
    SourceUserName: {
        type: String,
        required: true
    },
    SourceId: {
        type: Number,
        required: true
    },
    SourceUserImage: {
        type: String,
        required: false
    },
    IsMedia: {
        type: Boolean,
        required: true
    },
    MediaURL: {
        type: Array,
        required: true
    },
    ConverstationChannel: {
        type: String,
        required: true
    },
    MessageType: {
        type: Number,
        required: true
    },
    MessageDeliveredStatus: {
        type: Number,
        required: true
    },
    MessageStatusType: {
        type: Number,
        required: true
    },
});
exports.ConversationSchema = new Schema({
    ChannelId: {
        type: String,
        required: true
    },
    ChannelName: {
        type: String,
        required: true
    },
    Messages: [ConMessages]
}, { timestamps: true });
