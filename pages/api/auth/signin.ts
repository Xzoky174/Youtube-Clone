import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import getGoogleAuthUrl from "../../../utils/getGoogleAuthUrl";

const apiRoute = getNextConnectInstance();

apiRoute.get((req, res) => {
  res.redirect(getGoogleAuthUrl());
});

export default apiRoute;
