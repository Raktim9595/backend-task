import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import routeMiddlewares from "./middlewares/routeMiddlewares";
import errorMiddlewareAfterRoute from "./middlewares/errorMiddlewares";

const app: Express = express();

// load environment variables
dotenv.config();

// port definition
const PORT = process.env.port ?? 5000;

// express middlewares
app.use(
  cors({
    origin: "http://localhost:5000",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// route middlewares
routeMiddlewares(app);

// error handling middlewares
app.use(errorMiddlewareAfterRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
