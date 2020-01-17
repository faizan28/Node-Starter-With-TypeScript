import { Response, NextFunction } from 'express';
export declare class JsonWebToken {
    SecretKey: string;
    signToken(Payload: any): string;
    jwtSign(req: any, res: any): void;
    verifyToken(req: any, res: Response, next: NextFunction): void;
}
