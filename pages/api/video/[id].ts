import connect from "../../../utils/mongoConnect";

import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";

const apiRoute = getNextConnectInstance();

apiRoute.get(async (req, res) => {
  const { id } = req.query;

  if (id === undefined || id === null) {
    res
      .status(400)
      .json({ success: false, error: "Video Not Found", data: {} });
    return;
  }

  const { Video } = await connect();

  let video: { author_id: any; _doc: any };
  try {
    video = await Video.findOne({ _id: id });
  } catch {} // Unnecessary error when id is undefined; ignore.

  if (!video) {
    res
      .status(400)
      .json({ success: false, error: "Video Not Found", data: {} });
    return;
  }

  const author = await (
    await fetch(`http://localhost:3000/api/user/${video.author_id}`)
  ).json();

  if (author) {
    res.status(200).json({
      success: true,
      data: {
        video: { ...video._doc },
        author: { ...author.data.user },
      },
    });
  } else {
    // Author of video has been deleted, so delete the video.
    await Video.findOneAndDelete({ _id: id });

    res
      .status(400)
      .json({ success: false, error: "Video Not Found", data: {} });
  }
});

export default apiRoute;
