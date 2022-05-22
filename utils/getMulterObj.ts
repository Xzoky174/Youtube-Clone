import multer from "multer";
import path from "path";

export function getMulterObj() {
  const upload = multer({
    storage: multer.diskStorage({
      destination: "./public/uploads",
      filename: (_, file, cb) => {
        cb(null, file.originalname.replace(" ", "-"));
      },
    }),
    fileFilter: (_, file, cb) => {
      const ext = path.extname(file.originalname);

      if (ext !== ".mp4" && ext !== ".webm" && ext !== ".avi") {
        return cb(new Error("Valid File Extensions are: .mp4, .webm, or .avi"));
      }
      cb(null, true);
    },
  });

  return upload;
}
