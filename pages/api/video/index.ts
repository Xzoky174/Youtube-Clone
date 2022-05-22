import connect from "../../../utils/mongoConnect";

import { getMulterObj } from "../../../utils/getMulterObj";
import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import { getSession } from "next-auth/react";
import mongoose from "mongoose";

const upload = getMulterObj();
const apiRoute = getNextConnectInstance();

apiRoute.get(async (_, res) => {
  const { Video } = await connect();
  const videos = await Video.find({});

  res.status(200).json({ success: true, data: videos });
});

apiRoute.post(upload.single("file"), async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).json({
      success: false,
      error: "You must be signed in to upload videos.",
      data: null,
    });
  }

  const { Video, User } = await connect();
  const user = await User.findOne({ email: session.user.email });
  console.log(user);

  const result = new Video({
    ...req.body,
    path: req.file.path.replace(/\\/g, "/"),
    author_id: new mongoose.Types.ObjectId(user._id),
  });
  await result.save();

  res.redirect(`/video/${result._id}`);
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
