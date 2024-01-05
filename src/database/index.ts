import { connect } from "mongoose";

export const databaseConnection = async () => {
  try {
    await connect(process.env.MONGODB_URI!);
    console.log("Database connected");
  } catch (err) {
    throw new Error(err as string);
  }
};
