import { Controller } from "../../common/interfaces/controller.interface";
import { wrap } from "../../lib/wrap";
import { IUserDocument, UserModel } from "../../models/user.model";
import { Handler, Router } from "express";
import { UserService } from "./user.service";
import { validationMiddleware } from "../../middlewares";
import { CreateUserDto } from "./dto/create-user.dto";
import { ReadUserDto } from "./dto/read-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";

export default class UserController implements Controller {
  path = "/users";
  router = Router();

  userService = new UserService(UserModel);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = Router();

    router
      .post("/", validationMiddleware(CreateUserDto), wrap(this.createUser))
      .get("/", wrap(this.findAll))
      .get(
        "/:userId",
        validationMiddleware(ReadUserDto),
        wrap(this.findOneById)
      )
      .put(
        "/:userId",
        validationMiddleware(UpdateUserDto),
        wrap(this.updateUser)
      )
      .delete(
        "/:userId",
        validationMiddleware(DeleteUserDto),
        wrap(this.deleteUser)
      );
    this.router.use(this.path, router);
  }

  createUser: Handler = async (req): Promise<boolean> => {
    const params: CreateUserDto = { ...req.body };

    await this.userService.createUser(params);

    return true;
  };

  findAll: Handler = async (req): Promise<IUserDocument[]> => {
    const users: IUserDocument[] = await this.userService.findAll();

    return users;
  };

  findOneById: Handler = async (req): Promise<IUserDocument> => {
    const params: ReadUserDto = { ...req.params } as any;

    const user: IUserDocument = await this.userService.findOneByUserId(params);

    return user;
  };

  updateUser: Handler = async (req): Promise<boolean> => {
    const params: UpdateUserDto = {
      ...req.body,
      ...req.query,
    };

    await this.userService.updateUser(params);

    return true;
  };

  deleteUser: Handler = async (req): Promise<IUserDocument> => {
    const params: DeleteUserDto = { ...req.params } as any;

    const deletedUser: IUserDocument = await this.userService.deleteUser(
      params
    );

    return deletedUser;
  };
}
