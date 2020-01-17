"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const UserParticipants = new Schema({
    UserId: {
        type: Number,
        required: true
    }
});
exports.ChannelSchema = new Schema({
    Channel: {
        type: String,
        required: true
    },
    Participants: [UserParticipants],
}, { timestamps: true });
