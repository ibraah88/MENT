import mongoose from 'mongoose';
import { MONGODB_URI } from './config';

const URI = MONGODB_URI || '';

export const connect = (async () => {
    try {
        await mongoose.connect(
            URI,
            { 
                useNewUrlParser: true,
                useCreateIndex: true,
            }
        );
        console.log(`MongoDB connected to -> ${URI}`);
    } catch (err) {
        console.log(`${err} Could not Connect to the Database. Exiting Now...`);
        process.exit();
    }
});