import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { connectToDatabase } from "./lib/database";
import { set } from "mongoose";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "./config";
import { Routes } from "./interfaces/routes.interface";
import { logger, stream } from "./lib/logger";
import errorMiddleware from "./middlewares/error.middleware";
import authMiddleware from "./middlewares/auth.middleware";

export default class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`ENV: ${this.env}`);
      logger.info(`Example app listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(helmet());
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(authMiddleware);
  }

  private initializeRoutes(routes: Routes[]) {
    this.app.get("/", (req, res) => res.send("ok"));
    
    routes.forEach(route => {
      this.app.use("/api", route.router);
    })
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: "REST API",
          version: "1.0.0",
          description: "Example docs",
        },
      },
      apis: [
        "./src/swagger/schema/*",
        "./src/swagger/api/*"
      ],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeDatabase() {
    if (this.env !== "production") {
      set("debug", true);
    }

    connectToDatabase();
  }
}