import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env.NODE_ENV)

export const MONGODB_URI = process.env.NODE_ENV === 'development' ?  process.env.MONGO_URI_LOCAL : process.env.MONGO_URI_PROD 

if (!MONGODB_URI) {
    console.log('No mongo connection string. Set MONGODB_URI environment variable.');
    process.exit(1);
}

export const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.log('No JWT secret string. Set JWT_SECRET environment variable.');
    process.exit(1);
} 

export const PORT = process.env.PORT || 3000;
