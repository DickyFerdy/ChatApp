import express from "express";
import cookieParser from "cookie-parser"; 
import authRouter from "../routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
// app.use("/api/users");
// app.use("/api/messages");