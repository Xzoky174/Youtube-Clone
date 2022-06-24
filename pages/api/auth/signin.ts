import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import getGoogleAuthUrl from "../../../utils/getGoogleAuthUrl";

const apiRoute = getNextConnectInstance();

apiRoute.get((_, res) => {
  res.redirect(getGoogleAuthUrl());
});

export default apiRoute;
