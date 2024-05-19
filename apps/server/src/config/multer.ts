import { S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
//const MAX_UPLOAD_SIZE = 2 * 1024 * 1024;

import env from "./env";

type MulterS3File = Express.MulterS3.File;
const s3 = new S3Client({ region: env.aws.defaultRegion });

const storageTypes: { [key: string]: multer.StorageEngine } = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, "");

        (file as any).key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, (file as any).key);
      });
    },
  }),
  s3: multerS3({
    s3: s3,
    bucket: env.aws.bucketName as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file: MulterS3File, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};

const uploadConfig: multer.Options = {
  dest: path.resolve(__dirname, "..", "..", "uploads"),
  storage: storageTypes[env.aws.storageType as string],
  limits: {
    fileSize: eval(env.maxUploadSize as string),
  },
  /* fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }, */
};

export { uploadConfig };
