import multer from "multer";

import { uploadConfig } from "../../../config/multer";
const upload = multer(uploadConfig);

export { upload };
