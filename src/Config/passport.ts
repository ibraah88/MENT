import passport from 'passport';
import { JWT_SECRET } from './config';
import { User } from './../Models/UserModel';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class PassportConfig {

    public static init = async () => {
        let opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET
        };
        passport.use(new Strategy(opts, (jwtPayload, done) => {
            User.findOne({_id: jwtPayload._doc._id}, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
        }));
    }
}