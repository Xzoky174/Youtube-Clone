import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import connect from "../../../utils/mongoConnect";

const apiRoute = getNextConnectInstance();

apiRoute.get(async (req, res) => {
  const { search_query } = req.query as { search_query: string };
  if (!search_query) {
    res.status(400).json({ results: null });
  }

  const { Video } = await connect();
  const videos = await Video.find({
    $text: { $search: search_query, $caseSensitive: false },
  }).select("title"); // _id is selected by default

  res.status(200).json({ results: videos });
});

export default apiRoute;
