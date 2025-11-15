import express from "express";
import {
  addBook,
  addBookPic,
  deleteBook,
  listBooks,
  updateBook,
} from "../controllers/books.js";
import upload from "../config/fileconfig.js";

const bookRoute = express.Router();

bookRoute.post("/", upload.single("bookPic"), addBook);

bookRoute.post("/photo", upload.single("bookPic"), addBookPic);

bookRoute.get("/list", listBooks);

bookRoute.put("/update", updateBook);

bookRoute.delete("/delete", deleteBook);
export default bookRoute;
