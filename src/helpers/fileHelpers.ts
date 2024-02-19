import path from "path";

export const getFileExtension = (filename: string) => {
  return path.extname(filename);
};
