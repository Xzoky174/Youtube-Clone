import checkAuthenticated from "../../../../utils/checkAuthenticated";
import { getNextConnectInstance } from "../../../../utils/getNextConnectInstance";
import connect from "../../../../utils/mongoConnect";

const apiRoute = getNextConnectInstance();

apiRoute.put(async (req, res) => {
  const { video_id } = req.body;
  const { user, authenticated } = await checkAuthenticated(req, res);

  if (!authenticated) {
    res.status(401).json({
      success: false,
      error: "User has not signed in.",
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
  const video = await Video.findOne({ _id: video_id });

  if (!video) {
    res.status(400).json({
      success: false,
      error: "Video not found.",
      likes: null,
    });
    return;
  }
  if (!video.users_liked.includes(user.id)) {
    res.status(403).json({
      success: false,
      error: "User hasn't liked this video.",
      likes: null,
    });
    return;
  }

  video.users_liked.pull(user.id);
  video.likes -= 1;
  video.save();

  res.status(200).json({ success: true, error: null, likes: video.likes });
});

export default apiRoute;
