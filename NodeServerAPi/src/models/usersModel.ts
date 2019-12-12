import * as Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

export const UserSchema = new Schema({
    UDID: {
        type: Number,
        required:true
    },
    UserId: {
        type: Number,
        required:true
    },
    UserName: {
        type: String,
        required:true
    },
    UserType: {
        type: Number,
    },
    Token: {
        type: String,
        required:true
    },
}, { timestamps: true });