import { DB_HOST, DB_PORT, DB_DATABASE } from "@/config";
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  mongoose
    .connect(`mongodb://${DB_HOST}/${DB_PORT}/${DB_DATABASE}`, {
      dbName: "api-sample-ts"
    })
  
  mongoose.connection
    .on("error", console.error)
    .on("disconnected", connectToDatabase)
}