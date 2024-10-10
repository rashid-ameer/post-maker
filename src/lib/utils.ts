import * as argon2 from "argon2";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/env";

export const hashPassword = async (password: string): Promise<string> => {
  return argon2.hash(password);
};

export const verifyPassword = async (password: string, hash: string) => {
  return argon2.verify(hash, password);
};
