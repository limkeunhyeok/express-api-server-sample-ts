"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const database_1 = require("./lib/database");
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const logger_1 = require("./lib/logger");
const error_middleware_1 = tslib_1.__importDefault(require("./middlewares/error.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("./middlewares/auth.middleware"));
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = config_1.NODE_ENV || "development";
        this.port = config_1.PORT || 3000;
        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`ENV: ${this.env}`);
            logger_1.logger.info(`Example app listening on the port ${this.port}`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({ origin: config_1.ORIGIN, credentials: config_1.CREDENTIALS }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, morgan_1.default)(config_1.LOG_FORMAT, { stream: logger_1.stream }));
        this.app.use(auth_middleware_1.default);
    }
    initializeRoutes(routes) {
        this.app.get("/", (req, res) => res.send("ok"));
        routes.forEach(route => {
            this.app.use("/api", route.router);
        });
    }
    initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: "REST API",
                    version: "1.0.0",
                    description: "Example docs",
                },
            },
            apis: ["swagger.yaml"],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeDatabase() {
        if (this.env !== "production") {
            (0, mongoose_1.set)("debug", true);
        }
        (0, database_1.connectToDatabase)();
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map