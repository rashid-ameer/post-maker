import mongoose, { Schema } from "mongoose";
import { IPost } from "../types/models";

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model<IPost>("Post", postSchema);
export default PostModel;
