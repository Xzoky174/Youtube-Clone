import connect from "../../../utils/mongoConnect";

import { getMulterObj } from "../../../utils/getMulterObj";
import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import checkAuthenticated from "../../../utils/checkAuthenticated";

const upload = getMulterObj();
const apiRoute = getNextConnectInstance();

apiRoute.post(upload.single("file"), async (req, res) => {
  const { authenticated, user } = await checkAuthenticated(req, res);
  if (!authenticated) {
    // TODO: Update to 401
    res.status(403).json({
      success: false,
      error: "You must be signed in to upload videos.",
      data: null,
    });
  }

  const { Video } = await connect();

  const result = new Video({
    ...req.body,
    path: req.file.path.replace(/\\/g, "/"),
    author_id: user.id,
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
