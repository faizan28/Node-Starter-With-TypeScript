import {Router} from "express";
import { SignIn } from "../controllers/UsersController";


let router = Router();
router.get('/', SignIn);


export {router};