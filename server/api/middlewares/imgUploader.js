import multer from "multer";
import { asyncErrorWrapper } from "~utils/asyncErrorWrapper.js";
import { CustomError } from "~utils/CustomError.js";
import logger from "~logger";
import config from '~config';
import { getImgFileName } from "~utils/convert.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${config.public}/`);
  },
  filename(req, file, cb) {
    cb(null, getImgFileName(file.originalname));
  },
});
const upload = multer({ storage: storage });

const imgUploader = upload.single("image");

export { imgUploader };
