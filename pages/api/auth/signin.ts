import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import googleAuthUrl from "../../../utils/googleAuthUrl";

const apiRoute = getNextConnectInstance();

apiRoute.get((req, res) => {
  res.redirect(googleAuthUrl());
});

export default apiRoute;
