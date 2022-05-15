import { AuthService } from "./auth.service";
import { Handler, Router } from "express";
import { Controller } from "../../common/interfaces/controller.interface";
import { IUserDocument, UserModel } from "../../models/user.model";
import { wrap } from "../../lib/wrap";
import { SignInDto } from "./dto/sign-in.dto";
import { Token } from "../../lib/jwt";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { MeDto } from "./dto/me.dto";
import { validationMiddleware } from "@/middlewares";

export default class AuthController implements Controller {
  path = "/auth";
  router = Router();

  authService = new AuthService(UserModel);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = Router();

    router
      .post("/sign-in", validationMiddleware(SignInDto), wrap(this.signIn))
      .post(
        "/refresh",
        validationMiddleware(RefreshTokenDto),
        wrap(this.refreshToken)
      )
      .get("/me", wrap(this.me));

    this.router.use(this.path, router);
  }

  signIn: Handler = async (req): Promise<Token> => {
    const params: SignInDto = { ...req.body };
    const token: Token = await this.authService.signIn(params);
    return token;
  };

  refreshToken: Handler = async (req): Promise<Token> => {
    const params: RefreshTokenDto = { ...req.body };
    const token: Token = await this.authService.refreshToken(params);
    return token;
  };

  me: Handler = async (req, res): Promise<IUserDocument> => {
    const params: MeDto = res.locals.user;
    const user: IUserDocument = await this.authService.me(params);
    return user;
  };
}
