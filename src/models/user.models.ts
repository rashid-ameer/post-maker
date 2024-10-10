import mongoose, { CallbackError, Schema } from "mongoose";
import { IUser } from "../types/model.types";
import { hashPassword, verifyPassword } from "../lib/utils";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // hash password
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  return await verifyPassword(password, this.password);
};

userSchema.methods.getRequiredFields = function () {
  return {
    _id: this._id,
    username: this.username,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
