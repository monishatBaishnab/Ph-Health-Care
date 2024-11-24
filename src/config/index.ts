import env from "dotenv";
import path from "path";

env.config({ path: path.join(process.cwd(), ".env") });

export const localConfig = {
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  bcrypt_salt: process.env.BCRYPT_SALT,
  reset_pass_link: process.env.RESET_PASS_LINK,
  app_pass: process.env.APP_PASS,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
