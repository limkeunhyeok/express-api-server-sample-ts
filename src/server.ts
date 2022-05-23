import App from "./app";
import AuthController from "./api/auth/auth.controller";
import UserController from "./api/users/user.controller";
import PostController from "./api/posts/post.controller";
import CommentController from "./api/comments/comment.controller";
import CategoryController from "./api/categories/category.controller";

const app = new App([
  new AuthController(),
  new UserController(),
  new PostController(),
  new CommentController(),
  new CategoryController(),
]);

app.listen();
