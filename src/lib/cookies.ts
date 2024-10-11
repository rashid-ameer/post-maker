import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env";

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  return res.cookie("refreshToken", refreshToken, cookieOptions);
};

export const clearRefreshTokenCookie = (res: Response) => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "none",
  };
  return res.clearCookie("refreshToken", cookieOptions);
};
