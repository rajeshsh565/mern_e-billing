import "express-async-errors";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import path, {dirname} from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import CookieParser from "cookie-parser";
import { start } from "./db/connect.js";
import cloudinary from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//Middleware Imports
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { validateUser } from "./middlewares/authMiddleware.js";
//Route Imports
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import meterRouter from "./routes/meterRoutes.js";
import billRouter from "./routes/billRoutes.js";
import chargeRouter from "./routes/chargeRoute.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Middlewares
app.use(express.json()); //to get the json body from req.body
app.use(CookieParser()); //to access cookies from req.cookie
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "client/dist")));

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "hello there!" });
});

//Route Middlewares
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", validateUser, userRouter);
app.use("/api/v1/meter", validateUser, meterRouter);
app.use("/api/v1/bill", validateUser, billRouter);
app.use("/api/v1/charge", validateUser, chargeRouter);

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "./index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "route not found" });
});

//ErrorMiddleware after all routes to throw any error occuring there.
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  start(process.env.MONGODB_URI);
  console.log(`server listening to port ${port}`);
});
