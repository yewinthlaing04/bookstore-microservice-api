import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import authorRoute from "./routes/author.js";
import bookRoute from "./routes/book.js";

dotenv.config();
dbConnect();
const app = express();

app.use(express.json());

const port = process.env.port || 3000;

app.use("/author", authorRoute);
app.use("/book", bookRoute);

app.listen(port, () => {
  console.log("Server started on port", port);
});
