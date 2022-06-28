import checkAuthenticated from "../../../../utils/checkAuthenticated";
import { getNextConnectInstance } from "../../../../utils/getNextConnectInstance";
import connect from "../../../../utils/mongoConnect";

const apiRoute = getNextConnectInstance();

apiRoute.put(async (req, res) => {
  const { video_id, comment } = req.body;
  const { user, authenticated } = await checkAuthenticated(req, res);

  if (!authenticated) {
    res.status(401).json({
      success: false,
      error: "You must be signed in to post comments.",
      comments: null,
    });
    return;
  }
  if (!video_id) {
    res.status(400).json({
      success: false,
      error: "Video ID not provided.",
      comments: null,
    });
    return;
  }
  if (!comment) {
    res.status(400).json({
      success: false,
      error: "No comment.",
      comments: null,
    });
    return;
  }

  const { Video } = await connect();
  const video = await Video.findOne({ _id: video_id });

  if (!video) {
    res.status(400).json({
      success: false,
      error: "Video not found.",
      comments: null,
    });
    return;
  }

  video.comments.push({ author_id: user.id, comment });
  await video.save();

  res
    .status(200)
    .json({ success: true, error: null, comments: video.comments });
});

export default apiRoute;
