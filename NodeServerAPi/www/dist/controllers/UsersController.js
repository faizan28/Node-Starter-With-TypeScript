"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConverstaionController_1 = require("./ConverstaionController");
const ChannelController_1 = require("./ChannelController");
const usersModel_1 = require("./../models/usersModel");
const mongoose = require("mongoose");
const User = mongoose.model('User', usersModel_1.UserSchema);
async function SignIn(req, res, next) {
    try {
        res.json({
            Message: "SignInHere"
        });
    }
    catch (err) {
        console.log('err', err);
        next(err);
    }
}
exports.SignIn = SignIn;
async function RegisterNewUser(req, res, next) {
    try {
        User.findOneAndUpdate({ UserId: req.body.UserId }, req.body, { new: true, upsert: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    catch (err) {
        console.log('err', err);
        next(err);
    }
}
exports.RegisterNewUser = RegisterNewUser;
async function GetChannelsByUserId(req, res, next) {
    try {
        let Params = req.query;
        if (Params) {
            let UserId = Params.UserId;
            let Channel = new ChannelController_1.ChannelClass();
            let ChannelList = await Channel.getChannelData(UserId);
            res.send(ChannelList);
        }
        else {
            res.json({ Message: 'UserId required' });
        }
    }
    catch (err) {
        console.log('err', err);
        next(err);
    }
}
exports.GetChannelsByUserId = GetChannelsByUserId;
async function LoadMessageByChannel(req, res, next) {
    try {
        let Params = req.query;
        if (Params) {
            let ChannelName = Params.ChannelName;
            let UserId = Params.UserId;
            let Channel = new ConverstaionController_1.ConversationClass();
            let MessageList = await Channel.LoadMessagesByChannelName(ChannelName);
            Channel.markAllReadMessages(ChannelName, UserId);
            res.send(MessageList);
        }
        else {
            res.json({ Message: 'UserId required' });
        }
    }
    catch (err) {
        console.log('err', err);
        next(err);
    }
}
exports.LoadMessageByChannel = LoadMessageByChannel;
// export async function RegisterNewUser(req, res, next) {
//     try {
//         console.log(req.body)
//         let newUser = new User(req.body);
//         newUser.save((err, user) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(user);
//         });
//     } catch (err) {
//         console.log('err', err);
//         next(err);
//     }
// }
