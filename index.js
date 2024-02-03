import express from "express";
import userRouter from "./routes/user.route.js";
import env from "dotenv";
import { ErrorMiddleware } from "./middlewares/error.js";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerDocument } from "./docs/index.js";

env.config();

const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use(ErrorMiddleware);
