import connect from "../../../utils/mongoConnect";

import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import mongoose from "mongoose";

const apiRoute = getNextConnectInstance();

apiRoute.get(async (req, res) => {
  const { id } = req.query;

  if (id !== undefined && id !== null) {
    const { User, Video } = await connect();

    const user = await User.findById(
      new mongoose.Types.ObjectId(id as unknown as string)
    );
    if (!user) res.status(404).json({ success: false, data: {} });

    const videos = await Video.find({ author_id: user._id });

    res.status(200).json({ success: true, data: { ...user._doc, videos } });
  } else {
    res.status(400).json({ success: false, data: {} });
  }
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
