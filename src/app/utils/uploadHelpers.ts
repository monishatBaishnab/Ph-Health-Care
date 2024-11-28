import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { localConfig } from "../../config";
import { TCloudinaryResponse, TFile } from "../interface/file";
import fs from "fs";

cloudinary.config({
  cloud_name: localConfig.cloudinary_cloud_name,
  api_key: localConfig.cloudinary_api_key,
  api_secret: localConfig.cloudinary_api_secret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/upload"));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: TFile | undefined
): Promise<TCloudinaryResponse | undefined> => {
  if (file === undefined) return;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error: Error, result: TCloudinaryResponse) => {
      fs.unlinkSync(file.path);
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const uploadHelpers = {
  upload,
  uploadToCloudinary,
};
