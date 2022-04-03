import UserController from "../controllers/user.controller";
import { Routes } from "../interfaces";
export default class UserRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    userController: UserController;
    constructor();
    private initializeRoutes;
}
