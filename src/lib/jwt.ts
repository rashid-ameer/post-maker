import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/env";

export const generateRefreshToken = async (id: string) => {
  return jwt.sign({ id }, REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
};

export const generateAccessToken = async (id: string) => {
  return jwt.sign({ id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const verifyToken = <TokenPayload>(token: string, secret: string) => {
  try {
    const payload = jwt.verify(token, secret) as TokenPayload;
    return payload;
  } catch (error) {
    return error as JsonWebTokenError;
  }
};
