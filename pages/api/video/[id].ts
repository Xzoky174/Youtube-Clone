import connect from "../../../utils/mongoConnect";

import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import mongoose from "mongoose";
import { VideoDocument } from "../../../types/VideoDocument";
import { UserDocument } from "../../../types/UserDocument";

const apiRoute = getNextConnectInstance();

apiRoute.get(async (req, res) => {
  const { id } = req.query;

  if (id !== undefined && id !== null) {
    const { User, Video } = await connect();

    try {
      const video = await Video.findById(
        new mongoose.Types.ObjectId(id as unknown as string)
      );
      const user: UserDocument = await User.findById(video.author_id);

      video
        ? res
            .status(200)
            .json({ success: true, data: { ...video._doc, author: user } })
        : res
            .status(400)
            .json({ success: false, error: "Video Not Found", data: {} });
    } catch {
      res
        .status(404)
        .json({ success: false, error: "Video Not Found", data: {} });
    }
  } else {
    res.status(400).json({ success: false, data: {} });
  }
});

export default apiRoute;
