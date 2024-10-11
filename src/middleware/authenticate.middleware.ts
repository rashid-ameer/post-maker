import { RequestHandler } from "express";
import ApiError from "../lib/api-error";
import { HTTP_CODE } from "../constants/http-codes";
import { verifyToken } from "../lib/jwt";
import { AccessTokenPayload } from "../types/jwt.types";
import { ACCESS_TOKEN_SECRET } from "../constants/env";
import { ERROR_CODES } from "../constants/error-codes";

const authenticate: RequestHandler = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new ApiError(
      HTTP_CODE.UNAUTHORIZED,
      "Access token is missing",
      ERROR_CODES.MISSING_ACCESS_TOKEN
    );
  }

  const accessToken = authToken.split(" ")[1];
  const { error, payload } = verifyToken<AccessTokenPayload>(
    accessToken,
    ACCESS_TOKEN_SECRET
  );

  if (error) {
    throw new ApiError(
      HTTP_CODE.UNAUTHORIZED,
      "Invalid or expired access token",
      ERROR_CODES.INVALID_ACCESS_TOKEN
    );
  }

  req.userId = payload.id;
  next();
};

export default authenticate;
