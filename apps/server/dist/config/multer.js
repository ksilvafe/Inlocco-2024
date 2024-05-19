"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadConfig = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = __importDefault(require("path"));
//const MAX_UPLOAD_SIZE = 2 * 1024 * 1024;
const env_1 = __importDefault(require("./env"));
const s3 = new client_s3_1.S3Client({ region: env_1.default.aws.defaultRegion });
const storageTypes = {
    local: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path_1.default.resolve(__dirname, "..", "..", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err, "");
                file.key = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, file.key);
            });
        },
    }),
    s3: (0, multer_s3_1.default)({
        s3: s3,
        bucket: env_1.default.aws.bucketName,
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err);
                const fileName = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, fileName);
            });
        },
    }),
};
const uploadConfig = {
    dest: path_1.default.resolve(__dirname, "..", "..", "uploads"),
    storage: storageTypes[env_1.default.aws.storageType],
    limits: {
        fileSize: eval(env_1.default.maxUploadSize),
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
exports.uploadConfig = uploadConfig;
//# sourceMappingURL=multer.js.map