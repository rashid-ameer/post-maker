import { HTTP_CODE } from "../constants/http-codes";
import ApiError from "../lib/api-error";
import UserModel from "../models/user.models";

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
  const existingUser = await UserModel.find({ email });

  if (existingUser) {
    throw new ApiError(HTTP_CODE.CONFLICT, "User already exists");
  }

  const user = await UserModel.create({ email, username, password });

  return user.getRequiredFields();
};
