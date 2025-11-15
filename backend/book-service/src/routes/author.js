import express from "express";
import { createAuthor } from "../controllers/authors.js";

const authorRoute = express.Router();

authorRoute.post("/", createAuthor);

export default authorRoute;
