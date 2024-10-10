import { Document } from "mongoose";

// user model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  getRequiredFields(): Pick<
    IUser,
    "_id" | "username" | "email" | "createdAt" | "updatedAt"
  >;
}

// Post model
export interface IPost extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
