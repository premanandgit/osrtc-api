import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserRole } from "../models/User";
import { AuthenticationError } from "../models/CustomError";
const secretKey = process.env.SECRET_KEY || 'secretkey';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        next(new AuthenticationError('Missing Token'));
    } else {
        try {
            const decodedToken = jwt.verify(token, secretKey) as { id: string; username: string; role: UserRole };
            res.locals.userToken = decodedToken;
            next();
        } catch (error) {
            next(new AuthenticationError('Invalid Token'));
        }
    }
};