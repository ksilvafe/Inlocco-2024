"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: ".env",
});
exports.default = {
    baseUrl: process.env.BASE_URL,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    secretKey: String(process.env.JWT_SECRET_KEY),
    expiresIn: String(process.env.JWT_EXPIRES_IN),
    salt: Number(process.env.BCRYPT_SALT),
    maxUploadSize: process.env.MAX_UPLOAD_SIZE,
    database: {
        url: process.env.DATABASE_URL,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
    },
    rateLimit: {
        windowMs: Number(process.env.RATE_LIMITER_TIME),
        max: Number(process.env.RATE_LIMITER_REQUESTS),
    },
    aws: {
        storageType: process.env.STORAGE_TYPE,
        bucketName: process.env.BUCKET_NAME,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        defaultRegion: process.env.AWS_DEFAULT_REGION,
    },
};
//# sourceMappingURL=env.js.map