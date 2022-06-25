import connect from "../../../utils/mongoConnect";

import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import checkAuthenticated from "../../../utils/checkAuthenticated";

const apiRoute = getNextConnectInstance();

apiRoute.get(async (req, res) => {
  const { user } = await checkAuthenticated(req, res);
  const { id } = req.query;

  if (id === undefined || id === null) {
    res
      .status(400)
      .json({ success: false, error: "Video Not Found", data: {} });
    return;
  }

  const { Video } = await connect();

  let video: any;
  video = await Video.findOne({ _id: id });

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
    if (!user || !video.users_viewed.includes(user.id)) {
      video.views += 1;
      user && video.users_viewed.push(user.id);

      await video.save();
    }

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
