import express, { Express } from "express";
import dotenv from "dotenv";
import { databaseConnection } from "./database";

dotenv.config();
const PORT = process.env.PORT ?? 5000;

const app: Express = express();

// connection to database
databaseConnection();

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
