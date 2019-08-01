import bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import { User } from './../Models/UserModel';
import { JWT_SECRET } from '../Config/config';

const JWT_SIGN = JWT_SECRET || '';

export class UserController {

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await User.findOne({email: req.body.email});
            if (!user) {
                const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                await User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword,
                });
                const token = jwt.sign({ email: req.body.email, scope : req.body.scope }, JWT_SIGN);
                res.status(200).send({ token: token });
            } else {
                res.status(409).send({ user : `User with email : ${req.body.email} exist` });
            }
        } catch (err) {
            res.status(500).send({rror: err.message || err});
        }
    }

    public login = (req: Request, res: Response) => {
        try {
            let email = req.body.email;
            User.findByEmail(email, (err: Error, user: any) => {
                if(user) {
                    User.comparePassword(req.body.password, user.password, (err: Error, isMatch: boolean) => {
                        if (err) {
                            res.status(500);
                            res.json({
                                success: false,
                                message: 'oops something went wrong.'
                            });
                        } else if (isMatch) {
                            let payload = user.toJSON();
                            delete payload.password;
                            const token = jwt.sign(payload, JWT_SIGN, {
                                expiresIn: 3600
                            });
                            res.json({
                                success: true,
                                token: token,
                            });
                        } else {
                            res.status(400);
                            res.json({
                                success: false,
                                message: 'wrong credentials.'
                            });
                        }
                    });
                } else {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'wrong credentials.'
                    });
                }
            })
        } catch(err) {
            res.status(500).send({rror: err.message || err});
        }
    }

    public profile = async (req: Request, res: Response) => {
        res.json({
            success: true,
            user: req.body.user
        });
    }

    public edit = async(req: Request, res: Response) => {
        try {
            const user = await User.findOneAndUpdate({ _id: req.body.user._id }, req.body, { new: true });
            res.json(user);
        } catch (err) {
            res.json({error: err.message || err});
        }
    }
}