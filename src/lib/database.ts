import { DB_HOST, DB_PORT, DB_DATABASE } from "../config";
import mongoose, { Connection } from "mongoose";

export const getConnection = async () => {
  const connection: Connection = await mongoose.createConnection(`mongodb://${DB_HOST}/${DB_PORT}/${DB_DATABASE}`, {
    dbName: "api-sample-ts-test"
  });
  return connection
}

export const connectToDatabase = async () => {
  mongoose
    .connect(`mongodb://${DB_HOST}/${DB_PORT}/${DB_DATABASE}`, {
      dbName: "api-sample-ts"
    })
  
  mongoose.connection
    .on("error", console.error)
    // .on("disconnected", connectToDatabase)
}

export const closeDatabase = async (connection: Connection) => {
  await connection.close();
}