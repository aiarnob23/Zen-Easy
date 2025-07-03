import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rentRoutes } from "./app/modules/rent/rent.route";
import { imageRoutes } from "./app/modules/image/image.route";
import { userRoutes } from "./app/modules/user/user.route";



const app: Application = express();

//cors and middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);


//routes
app.use("/api/v1/rent", rentRoutes);
app.use("/api/v1/image", imageRoutes);
app.use("/api/v1/user", userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Zen Easy BD server is running...");
});



export default app;