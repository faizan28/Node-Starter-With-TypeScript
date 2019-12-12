import { ConversationClass } from './ConverstaionController';
import { ChannelClass } from './ChannelController';

import { UserSchema } from './../models/usersModel';
import * as mongoose from 'mongoose';
import { Request } from 'express';

const User = mongoose.model('User', UserSchema);
export async function SignIn(req, res, next) {
    try {
        res.json({
            Message: "SignInHere"
        });
    } catch (err) {
        console.log('err', err);
        next(err);
    }
}
export async function RegisterNewUser(req, res, next) {
    try {
        User.findOneAndUpdate({ UserId: req.body.UserId }, req.body, { new: true ,upsert:true}, (err, contact) => {
            if(err){
                res.send(err);
            }
         res.json(contact);   
        });
  

    } catch (err) {
        console.log('err', err);
        next(err);
    }
}
export async function GetChannelsByUserId(req:Request, res, next) {
    try {
        let Params = req.query;
        if(Params){
            let UserId = Params.UserId;
            let Channel = new ChannelClass();
            let ChannelList = await Channel.getChannelData(UserId);
            res.send(ChannelList);
        }
        else{
            res.json({Message:'UserId required'})
        }
        

    } catch (err) {
        console.log('err', err);
        next(err);
    }
}

export async function LoadMessageByChannel(req:Request, res, next) {
    try {
        let Params = req.query;
        if(Params){
            let ChannelName = Params.ChannelName;
            let Channel = new ConversationClass();
            let MessageList = await Channel.LoadMessagesByChannelName(ChannelName);
            res.send(MessageList);
        }
        else{
            res.json({Message:'UserId required'})
        }
        

    } catch (err) {
        console.log('err', err);
        next(err);
    }
}

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