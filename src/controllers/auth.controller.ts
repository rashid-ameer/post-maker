import { HTTP_CODE } from "../constants/http-codes";
import ApiResponse from "../lib/api-response";
import asyncHandler from "../lib/async-handler";
import { loginUserSchema, registerUserSchema } from "../lib/schemas";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../services/auth.services";
import { NODE_ENV, REFRESH_TOKEN_SECRET } from "../constants/env";
import { verifyToken } from "../lib/jwt";
import { RefreshTokenPayload } from "../types/jwt.types";
import ApiError from "../lib/api-error";
import { ERROR_CODES } from "../constants/error-codes";
import { clearRefreshTokenCookie, setRefreshTokenCookie } from "../lib/cookies";

export const registerHandler = asyncHandler(async (req, res) => {
  // validate a request
  const request = registerUserSchema.parse(req.body);

  // call a service
  await registerUser(request);

  // return a response
  res
    .status(HTTP_CODE.CREATED)
    .json(new ApiResponse("User registered successfully"));
});

export const loginHandler = asyncHandler(async (req, res) => {
  // validate a request
  const request = loginUserSchema.parse(req.body);
  // call a service
  const { user, accessToken, refreshToken } = await loginUser(request);

  // send response
  setRefreshTokenCookie(res, refreshToken)
    .status(HTTP_CODE.OK)
    .json(
      new ApiResponse("User logged in successfully", { user, accessToken })
    );
});

export const logoutHandler = asyncHandler(async (req, res) => {
  const id = req.userId.toString();
  // call a service
  await logoutUser(id);

  // return a response
  clearRefreshTokenCookie(res).status(HTTP_CODE.NO_CONTENT).send();
});

export const refreshAccessTokenHandler = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new ApiError(
      401,
      "Missing refresh token",
      ERROR_CODES.MISSING_REFRESH_TOKEN
    );
  }

  // validate a refresh token
  const { payload, error } = verifyToken<RefreshTokenPayload>(
    refreshToken,
    REFRESH_TOKEN_SECRET
  );

  if (error) {
    throw new ApiError(
      HTTP_CODE.UNAUTHORIZED,
      "Invalid or expired refresh token",
      ERROR_CODES.INVALID_REFRESH_TOKEN
    );
  }

  // call a service
  const { newRefreshToken, accessToken } = await refreshAccessToken(
    payload.id.toString(),
    refreshToken
  );

  // send response
  setRefreshTokenCookie(res, newRefreshToken)
    .status(HTTP_CODE.OK)
    .json(
      new ApiResponse("Fetched access token successfully", { accessToken })
    );
});
