import mongoose, { Connection } from "mongoose";
export declare const getConnection: () => Promise<mongoose.Connection>;
export declare const connectToDatabase: () => Promise<void>;
export declare const closeDatabase: (connection: Connection) => Promise<void>;
