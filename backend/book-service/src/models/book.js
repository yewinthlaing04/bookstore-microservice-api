import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  bookPic: {
    type: String,
    required: false,
  },
  categories: {
    type: [String],
    required: false,
  },
  release_date: {
    type: Date,
    required: false,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
