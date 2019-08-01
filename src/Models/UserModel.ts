import bcrypt from 'bcryptjs';
import { isEmail } from 'validator';
import { Document, Schema, Model, model } from 'mongoose';

export interface IUser extends Document {
    firstName: string,
    lastName: string,
    email: string, 
    password: string,
}
export interface IUserModel {
    createUser(user: IUser, callback: any): void
    comparePassword(candidatePassword: string, hash: string, callback: Function): void
    findByEmail(email: string, callback: Function): void
}

export const UserSchema = new Schema (
    {
        firstName: {
            type: String,
            required: 'Enter fisrt name',
        },
        lastName: {
            type: String,
            required: 'Enter last name',
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            validate: [ isEmail, 'invalid email' ]
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
            select: false
        }
    },
    {
        timestamps: true,
        useNestedStrict: true
    },
);

UserSchema.static('createUser', (user: IUser, callback: any) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save(callback);
        });
    });
});

UserSchema.static('comparePassword', (candidatePassword: string, hash: string, callback: Function) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
});

UserSchema.static('findByEmail', (email: string, callback: Function) => {
    User.findOne({email: email}, callback).select('+password');
});
   
export type UserModel = Model<IUser> & IUserModel & IUser;

export const User: UserModel = <UserModel>model<IUser>('User', UserSchema);