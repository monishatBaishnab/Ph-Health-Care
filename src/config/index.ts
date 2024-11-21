import env from 'dotenv';
import path from 'path';

env.config({path: path.join(process.cwd(), '.env')});


export const localConfig = {
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    bcrypt_salt: process.env.BCRYPT_SALT,
}