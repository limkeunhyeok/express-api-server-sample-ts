import { Controller } from "@/common/interfaces/controller.interface";
import { Router } from "express";

export default class UserController implements Controller {
  path = "/users";
  router = Router();

  createUser() {}

  findAll() {}

  findOneById() {}

  updateUser() {}

  deleteUser() {}
}
