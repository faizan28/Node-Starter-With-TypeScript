import { Request } from 'express';
export declare function SignIn(req: any, res: any, next: any): Promise<void>;
export declare function RegisterNewUser(req: any, res: any, next: any): Promise<void>;
export declare function GetChannelsByUserId(req: any, res: any, next: any): Promise<void>;
export declare function LoadMessageByChannel(req: Request, res: any, next: any): Promise<void>;
