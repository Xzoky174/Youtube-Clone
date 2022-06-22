import { getCookie } from "cookies-next";
import { ServerResponse } from "http";
import { verify } from "jsonwebtoken";
import { NextApiRequest } from "next";
import connect from "./mongoConnect";

interface JwtPayload {
  id: string;
}

export default async function checkAuthenticated(
  req: NextApiRequest,
  res: ServerResponse
): Promise<{ authenticated: boolean; user: any }> {
  const token = getCookie("token", { req, res });
  if (!token) {
    return { authenticated: false, user: null };
  }

  const { User } = await connect();

  try {
    const decoded = verify(
      token.toString(),
      process.env.JWT_SECRET
    ) as JwtPayload;
    const user = await User.findOne({ id: decoded.id });

    if (!user) {
      return { authenticated: false, user: null };
    }

    return { authenticated: true, user: decoded };
  } catch {
    return { authenticated: false, user: null };
  }
}
