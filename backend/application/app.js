import express from "express";
import cookieParser from "cookie-parser"; 
import authRouter from "../routes/authRoutes.js";
import messageRouter from "../routes/messageRoutes.js";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
// app.use("/api/users");