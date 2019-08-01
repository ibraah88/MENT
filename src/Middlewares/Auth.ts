import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../Config/config';
import { Request, Response, NextFunction } from 'express';

const JWT_SIGN = JWT_SECRET || '';

export const Auth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];
    const token = authorization ? authorization.split(' ')[1] : null;
    if (token) {
        jwt.verify(token, JWT_SIGN, (err, user: any) => {
            if (err) {
                console.log(err.message);
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.body.user = user;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        })
    }
}