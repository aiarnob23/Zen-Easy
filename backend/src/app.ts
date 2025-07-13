import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rentRoutes } from "./app/modules/rent/rent.route";
import { imageRoutes } from "./app/modules/image/image.route";
import { userRoutes } from "./app/modules/user/user.route";
import { profHandleRoutes } from "./app/modules/professional-service/profService.route";

const app: Application = express();

//cors and middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["https://zen-easy.vercel.app", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders:['Content-Type' , 'Authorization', 'X-Requested-With'],
  })
);

//routes
app.use("/api/v1/rent", rentRoutes);
app.use("/api/v1/image", imageRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/profession", profHandleRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Zen Easy BD server is running...");
});

export default app;
