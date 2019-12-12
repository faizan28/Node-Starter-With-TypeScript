import {Router} from "express";
import { SignIn, RegisterNewUser, GetChannelsByUserId, LoadMessageByChannel } from "../controllers/UsersController";


let router = Router();
router.get('/', SignIn);
router.post('/RegisterNewUser', RegisterNewUser);
router.get('/LoadChannels',GetChannelsByUserId)
router.get('/LoadMessage',LoadMessageByChannel)

export {router};