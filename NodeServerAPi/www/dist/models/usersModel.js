"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
exports.UserSchema = new Schema({
    UDID: {
        type: String,
        required: true
    },
    UserId: {
        type: Number,
        required: true
    },
    UserName: {
        type: String,
        required: true
    },
    UserType: {
        type: Number,
    },
    Token: {
        type: String,
        required: true
    },
}, { timestamps: true });
