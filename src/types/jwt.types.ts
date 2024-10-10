import mongoose from "mongoose";

export type AccessTokenPayload = {
  id: mongoose.Types.ObjectId;
};

export type RefreshTokenPayload = {
  id: mongoose.Types.ObjectId;
};
