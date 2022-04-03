"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.connectToDatabase = exports.getConnection = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const getConnection = async () => {
    const connection = await mongoose_1.default.createConnection(`mongodb://${config_1.DB_HOST}/${config_1.DB_PORT}/${config_1.DB_DATABASE}`, {
        dbName: "api-sample-ts-test"
    });
    await connection.dropDatabase();
    return connection;
};
exports.getConnection = getConnection;
const connectToDatabase = async () => {
    mongoose_1.default
        .connect(`mongodb://${config_1.DB_HOST}/${config_1.DB_PORT}/${config_1.DB_DATABASE}`, {
        dbName: "api-sample-ts"
    });
    mongoose_1.default.connection
        .on("error", console.error)
        .on("disconnected", exports.connectToDatabase);
};
exports.connectToDatabase = connectToDatabase;
const closeDatabase = async (connection) => {
    await connection.close();
};
exports.closeDatabase = closeDatabase;
//# sourceMappingURL=database.js.map