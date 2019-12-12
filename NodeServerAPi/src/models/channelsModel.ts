import * as Mongoose from 'mongoose';

const Schema = Mongoose.Schema;
const UserParticipants = new Schema({
    UserId:{
        type:Number,
        required:true
    }
})
export const ChannelSchema = new Schema({
    Channel: {
        type: String,
        required:true
    },
    Participants: [UserParticipants],
}, { timestamps: true });