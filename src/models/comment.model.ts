import { model, Schema, Document } from "mongoose";
import { Comment } from "../interfaces";

const commentSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

const CommentModel = model<Comment & Document>("Comment", commentSchema);

export default CommentModel;