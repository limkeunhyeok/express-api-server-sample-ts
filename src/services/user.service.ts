import UserModel from "@/models/user.model";
import { hash } from "bcrypt";

export default class UserService {
  public User = UserModel;

  public async findAllUser() {
    const users = await this.User.find({});
    return users;
  }

  public async findUserById(userId: string) {
    const user = await this.User.findOne({ _id: userId });
    return user;
  }
}