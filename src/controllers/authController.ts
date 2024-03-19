
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User, { UserRole } from '../models/User';
import logger from '../utils/logger';

const secretKey = process.env.SECRET_KEY || 'secretkey';
const superAdminCode = process.env.SUPER_ADMIN_CODE || 'superadmincode';

if (!secretKey) {
    throw new Error('Secret key not found in environment variables');
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !await user.validatePassword(password)) {
            logger.info(`${req.traceId} - 401 - Invalid credentials`)
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, secretKey);
        res.json({ token });
    } catch (error) {
        next(error);
    }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, specialCode } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        let role = specialCode === superAdminCode ? UserRole.SuperAdmin : UserRole.User;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, secretKey)
        res.json({ message: 'Signup successful', token });

    } catch (error) {
        next(error)
    }
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, oldPassword, newPassword } = req.body;
        const user = await User.findOne({ username });
        if (!user || !await user.validatePassword(oldPassword)) {
            return res.status(401).json({ message: 'Invalid old password' });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        next(error)
    }
};

export const changeUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({ message: 'Role changed successfully', token: res.locals.userToken });
    } catch (error) {
        next(error)
    }
};
