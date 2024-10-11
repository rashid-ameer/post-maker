import { CookieOptions } from "express";
import { HTTP_CODE } from "../constants/http-codes";
import ApiResponse from "../lib/api-response";
import asyncHandler from "../lib/async-handler";
import { loginUserSchema, registerUserSchema } from "../lib/schemas";
import { loginUser, logoutUser, registerUser } from "../services/auth.services";
import { NODE_ENV } from "../constants/env";

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

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  // send response
  res
    .status(HTTP_CODE.OK)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse("User logged in successfully", { user, accessToken })
    );
});

export const logoutHandler = asyncHandler(async (req, res) => {
  const id = req.userId.toString();
  // call a service
  await logoutUser(id);

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "none",
  };
  // return a response
  res
    .clearCookie("refreshCookie", cookieOptions)
    .status(HTTP_CODE.NO_CONTENT)
    .send();
});
