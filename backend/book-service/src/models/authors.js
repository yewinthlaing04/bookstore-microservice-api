import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

export default Author;
