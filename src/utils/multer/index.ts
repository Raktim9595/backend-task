import { Request } from "express";
import multer from "multer";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { getCurrentDateTimeInIsoString } from "../../helpers/dateTimeHelpers";
import { getFileExtension } from "../../helpers/fileHelpers";
import { FILE_TYPE_ENUM, MULTER_ENUM } from "../../enums/multer";
import { ERROR_FILE_REASON } from "../../enums/errorMessage/fileErrorMessage";

const storage = multer.diskStorage({
  destination: function (_, _res, callback) {
    callback(null, MULTER_ENUM.DESTINATION);
  },
  filename: function (_, file, callback) {
    callback(
      null,
      file.fieldname +
        getCurrentDateTimeInIsoString().toString() +
        getFileExtension(file.originalname).toString()
    );
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (
    file.mimetype === FILE_TYPE_ENUM.CSV ||
    file.mimetype === FILE_TYPE_ENUM.EXCEL
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    return callback(
      new createHttpError[StatusCodes.NOT_ACCEPTABLE](ERROR_FILE_REASON.CSV)
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
