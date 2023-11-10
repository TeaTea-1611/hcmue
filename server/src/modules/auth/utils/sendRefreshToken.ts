import { Response } from "express";
import { RT_COOKIE_NAME } from "../../../constants.js";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(RT_COOKIE_NAME, token, {
    httpOnly: true,
    // path: "/refresh-token",
  });
};
