import AuthController from "../controllers/auth.controller";
import { Routes } from "../interfaces";
export default class AuthRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    authController: AuthController;
    constructor();
    private initializeRoutes;
}
