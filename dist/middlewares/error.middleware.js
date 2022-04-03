"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../lib/logger");
const response_1 = require("../lib/response");
const errorMiddleware = (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || "Something went wrong";
        logger_1.logger.error(`${req.method} ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        const response = new response_1.Response(false).error(message).toJson();
        res.status(status).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map