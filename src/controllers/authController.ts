
import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ name: username });
        console.log('req', req.body)
        const token = 'token';
        res.json({ token, body: req.body, user })
    } catch (error) {
        next(error)
    }
}




// // backend/controllers/authController.ts

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { secretKey } from '../config';
// import User from '../models/User';

// export const login = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });

//     if (!user || !user.validatePassword(password)) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id, username: user.username }, secretKey);
//     res.json({ token });
//   } catch (error) {
//     next(error);
//   }
// };

// export const signup = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { username, password } = req.body;
//     const existingUser = await User.findOne({ username });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     const newUser = new User({ username, password });
//     await newUser.save();

//     res.json({ message: 'Signup successful' });
//   } catch (error) {
//     next(error);
//   }
// };
