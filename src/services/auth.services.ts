import { ERROR_CODES } from "../constants/error-codes";
import { HTTP_CODE } from "../constants/http-codes";
import ApiError from "../lib/api-error";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt";
import UserModel from "../models/user.models";

/**
 *
 * @param {RegisterUser} param0
 * @returns
 */
type RegisterUser = {
  username: string;
  email: string;
  password: string;
};

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterUser) => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new ApiError(HTTP_CODE.CONFLICT, "User already exists");
  }

  const user = await UserModel.create({ email, username, password });

  return user.getRequiredFields();
};

/**
 *
 * @param {LoginUser} param0
 * @returns
 */

type LoginUser = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginUser) => {
  const user = await UserModel.findOne({ email });

  // check if user exists
  if (!user) {
    throw new ApiError(HTTP_CODE.UNAUTHORIZED, "Incorrect email or password");
  }

  // check password match
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError(HTTP_CODE.UNAUTHORIZED, "Incorrect email or password");
  }

  // create tokens
  const refreshToken = await generateRefreshToken(user.id);
  const accessToken = await generateAccessToken(user.id);

  user.refreshToken = refreshToken;
  await user.save();

  return { user: user.getRequiredFields(), accessToken, refreshToken };
};

export const logoutUser = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(HTTP_CODE.NOT_FOUND, "User not found");
  }

  user.refreshToken = "";
  await user.save();
};

export const refreshAccessToken = async (id: string, refreshToken: string) => {
  // check if the refresh token exist in database
  const user = await UserModel.findById(id);
  if (!user) {
    throw new ApiError(HTTP_CODE.UNAUTHORIZED, "User not found");
  }

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(
      HTTP_CODE.UNAUTHORIZED,
      "Invalid or expired refresh token",
      ERROR_CODES.INVALID_REFRESH_TOKEN
    );
  }

  // generate new tokens
  const newRefreshToken = await generateRefreshToken(user.id);
  const accessToken = await generateAccessToken(user.id);

  // store new refresh token in database
  user.refreshToken = newRefreshToken;
  await user.save();

  return { newRefreshToken, accessToken };
};
