import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import { server, app } from './SocketIO/server.js';

dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use(cookieParser());


const PORT = process.env.PORT || 5001;
const URI = process.env.MONGODB_URI;

// MongoDB connection
mongoose.connect(URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Route middleware
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

//------------------------ code for deployment-------------------------

if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static("./Frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirPath, './Frontend/dist','index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`🚀 Chat app listening on port ${PORT}`);
});
