/**
 * @param file The file to process
 * @param defaultExt Optional, define a default extension for the file @default jpeg
 * @returns the extension of the file
 */
export const getFileExtension = (
  file: Express.Multer.File,
  defaultExt = "jpeg"
) => {
  const fileNameParts = file.originalname.split(".");
  let fileExt = defaultExt;
  if (fileNameParts.length > 1) {
    const ext = fileNameParts.pop();
    if (ext) {
      fileExt = ext;
    }
  }
  return fileExt;
};

/**
 *
 * @param file The file to process
 * @returns a parsed filename
 */
export const generateFileName = (file: Express.Multer.File) => {
  const fileExtension = getFileExtension(file);
  const ts = Date.now();
  const fileName = `user-${ts}.${fileExtension}`;
  return fileName;
};
