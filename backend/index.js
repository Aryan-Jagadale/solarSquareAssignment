import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import session from "express-session";

dotenv.config();

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Using Middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND_URL,process.env.FRONTEND_URL_BUILD],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.set("trust proxy", 1);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 604800000, sameSite: "none", secure: true }, //one week
  })
);

app.use(express.json());

app.use(cookieParser());


// Routes
import user from "./routes/userRoutes.js";
import trainRoute from "./routes/trainRoutes.js";
import historyRoute from "./routes/historyRoutes.js";

app.use("/api/v1", user);
app.use("/api/v1", trainRoute);
app.use("/api/v1", historyRoute);





app.get("/", (req, res) => {
  res.json({ do: "SMILE", start: "Developing something great & keep :) :)" });
});

app
  .listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
    process.exit();
  })
  .on("close", () => {
    process.exit();
  });
