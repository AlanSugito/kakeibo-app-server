import fs from "fs";

const removeFile = (path: string) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

export default removeFile;
