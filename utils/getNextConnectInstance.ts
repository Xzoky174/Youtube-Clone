import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export function getNextConnectInstance() {
  const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(err, _, res) {
      console.log(err);
      res.status(500).json({ message: "Something Went Wrong", data: [] });
    },
    onNoMatch(_, res) {
      res.status(404).json({ message: "URL Not Found", data: [] });
    },
  });

  return apiRoute;
}
