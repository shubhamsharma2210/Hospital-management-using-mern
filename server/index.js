import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import cloudinary from "cloudinary";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import bodyParser from 'body-parser'


const app = express();
// env configuration
dotenv.config();
const PORT = process.env.PORT;

// middleware
app.use(bodyParser())
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

// Database connection
dbConnection();

// cloudinary setup
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SCERET,
});

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);

// listning server
app.listen(process.env.PORT, () => {
  console.log(`server started on ${PORT} Port`);
});
