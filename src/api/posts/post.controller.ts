import { Controller } from "@/common/interfaces/controller.interface";
import { Router } from "express";

export default class PostController implements Controller {
  path = '/posts';
  router = Router();
  
  createPost() {

  }

  findAll() {

  }

  findOneById() {

  }

  updatePost() {

  }
  
  deletePost() {

  }
}