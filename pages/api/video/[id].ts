import connect from "../../../utils/mongoConnect";

import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import mongoose from "mongoose";

const apiRoute = getNextConnectInstance();

apiRoute.get(async (req, res) => {
  const { id } = req.query;

  if (id !== undefined && id !== null) {
    const { User, Video } = await connect();

    try {
      const video = await Video.findById(
        new mongoose.Types.ObjectId(id as unknown as string)
      );

      const author = await (
        await fetch(`http://localhost:3000/api/user/${video.author_id}`)
      ).json();

      video
        ? res.status(200).json({
            success: true,
            data: {
              video: { ...video._doc },
              author: { ...author.data.user },
            },
          })
        : res
            .status(400)
            .json({ success: false, error: "Video Not Found", data: {} });
    } catch (e) {
      console.log(e);

      res
        .status(404)
        .json({ success: false, error: "Video Not Found", data: {} });
    }
  } else {
    res.status(400).json({ success: false, data: {} });
  }
});

export default apiRoute;
