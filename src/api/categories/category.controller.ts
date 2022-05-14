import { Controller } from "@/common/interfaces/controller.interface";
import { Router } from "express";

export default class CategoryController implements Controller {
  path = '/categories';
  router = Router();
  
  createCategory() {

  }

  findAll() {

  }

  findOneById() {

  }

  updateCategory() {

  }
  
  deleteCategory() {

  }
}