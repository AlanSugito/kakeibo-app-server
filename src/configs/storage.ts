import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../public/images");
  },
  filename(req, file, callback) {
    const prefix = Date.now();
    const filename = `${prefix}-${file.originalname}`;
    req.body.profile_picture = filename;

    callback(null, filename);
  },
});

export default storage;
