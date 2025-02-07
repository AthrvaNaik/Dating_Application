import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import messageRoutes from "./Routes/messages.routes.js";
import matchesRoutes from "./Routes/matches.routes.js";
import { initializeSocketServer } from "./socket/socket.server.js";

import connectDB from "./Config/db.js";

import cors from "cors";

import { createServer } from "http";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 5001;

initializeSocketServer(httpServer);

app.use(express.json());
app.use(cookieParser());
// Backend CORS configuration example
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend URL
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/matches", matchesRoutes);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
