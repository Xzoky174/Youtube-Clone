import { UserDocument } from "../../../../types/UserDocument";
import getAccessToken from "../../../../utils/getAccessToken";
import { getNextConnectInstance } from "../../../../utils/getNextConnectInstance";
import connect from "../../../../utils/mongoConnect";

const apiRoute = getNextConnectInstance();

apiRoute.get(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ data: null, success: false });
    return;
  }

  const { User, Video } = await connect();

  const user: UserDocument = await User.findOne({ id });
  if (!user) {
    res.status(404).json({ data: null, success: false });
    return;
  }

  const { access_token } = await getAccessToken(user.refresh_token);
  const googleUser = await (
    await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
    )
  ).json();

  const videos = await Video.find({ author_id: id });

  res.status(200).json({
    data: { user: { ...googleUser }, videos: videos },
    success: true,
  });
});

export default apiRoute;
