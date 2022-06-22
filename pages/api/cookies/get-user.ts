import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import checkAuthenticated from "../../../utils/checkAuthenticated";

const apiRoute = getNextConnectInstance();

apiRoute.get(async (req, res) => {
  const { authenticated, user } = await checkAuthenticated(req, res);
  if (!authenticated) {
    res.status(404).json({ user });
    return;
  }

  res.status(200).json({ user });
});

export default apiRoute;
