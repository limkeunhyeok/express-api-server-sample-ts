"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const auth_route_1 = tslib_1.__importDefault(require("./routes/auth.route"));
const user_route_1 = tslib_1.__importDefault(require("./routes/user.route"));
const category_route_1 = tslib_1.__importDefault(require("./routes/category.route"));
const post_route_1 = tslib_1.__importDefault(require("./routes/post.route"));
const comment_route_1 = tslib_1.__importDefault(require("./routes/comment.route"));
const app = new app_1.default([
    new auth_route_1.default(),
    new user_route_1.default(),
    new category_route_1.default(),
    new post_route_1.default(),
    new comment_route_1.default(),
]);
app.listen();
//# sourceMappingURL=server.js.map