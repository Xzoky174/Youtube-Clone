import checkAuthenticated from "../../../../utils/checkAuthenticated";
import { getNextConnectInstance } from "../../../../utils/getNextConnectInstance";
import connect from "../../../../utils/mongoConnect";

const apiRoute = getNextConnectInstance();

apiRoute.put(async (req, res) => {
  const { video_id } = req.body;
  const { authenticated } = await checkAuthenticated(req, res);

  if (!authenticated) {
    res.status(401).json({
      success: false,
      error: "You must be signed in to like videos.",
      likes: null,
    });
    return;
  }
  if (!video_id) {
    res.status(400).json({
      success: false,
      error: "Video ID not provided.",
      likes: null,
    });
    return;
  }

  const { Video } = await connect();
  const video_likes = await Video.findOneAndUpdate(
    { _id: video_id },
    { $inc: { likes: 1 } },
    { new: true }
  ).select("likes -_id");

  if (!video_likes) {
    res.status(400).json({
      success: false,
      error: "Video not found.",
      likes: null,
    });
    return;
  }

  res
    .status(200)
    .json({ success: true, error: null, likes: video_likes.likes });
});

export default apiRoute;
