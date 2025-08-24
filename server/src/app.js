import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import storeRouter from "./routes/store.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app = express();
app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is up and running!" });
});

app.use("/api/auth", authRouter); 
app.use("/api/users", userRouter);
app.use("/api/stores", storeRouter);
app.use("/api/admin", adminRouter);

export default app;
