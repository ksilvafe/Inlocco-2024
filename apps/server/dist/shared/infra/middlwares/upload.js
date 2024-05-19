"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("../../../config/multer");
const upload = (0, multer_1.default)(multer_2.uploadConfig);
exports.upload = upload;
//# sourceMappingURL=upload.js.map