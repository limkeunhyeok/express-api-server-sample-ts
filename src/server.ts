import App from "./app";
import AuthRoute from "./routes/auth.route";
import UserRoute from "./routes/user.route";
import CategoryRoute from "./routes/category.route";
import PostRoute from "./routes/post.route";
import CommentRoute from "./routes/comment.route";

const app = new App([
  new AuthRoute(),
  new UserRoute(),
  new CategoryRoute(),
  new PostRoute(),
  new CommentRoute(),
]);

app.listen();
