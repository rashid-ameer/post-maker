import { HTTP_CODE } from "../constants/http-codes";
import ApiResponse from "../lib/api-response";
import asyncHandler from "../lib/async-handler";
import { registerUserSchema } from "../lib/schemas";
import { registerUser } from "../services/user.services";

export const registerHandler = asyncHandler(async (req, res) => {
  // validate a request
  const request = registerUserSchema.parse(req.body);

  // call a service
  const user = await registerUser(request);

  // return a response
  res
    .status(HTTP_CODE.CREATED)
    .json(new ApiResponse("User registered successfully", user));
});
