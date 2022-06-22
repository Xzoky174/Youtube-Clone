import { getNextConnectInstance } from "../../../utils/getNextConnectInstance";
import getTokens from "../../../utils/getTokens";

import { sign } from "jsonwebtoken";
import { setCookies } from "cookies-next";

const apiRoute = getNextConnectInstance();

apiRoute.get(async (req, res) => {
  const code = req.query.code;
  !code && res.redirect(process.env.ROOT_URL);

  const { access_token, id_token } = await getTokens(code);
  const googleUser = await (
    await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
    )
  ).json();

  const token = sign(googleUser, process.env.JWT_SECRET);
  setCookies("token", token, {
    req,
    res,
    maxAge: 900000,
    httpOnly: true,
    secure: false,
  });

  res.redirect(process.env.ROOT_URL);
});

export default apiRoute;
