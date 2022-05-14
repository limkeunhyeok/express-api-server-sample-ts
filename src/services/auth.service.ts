import UserModel from "../models/user.model";
import { User } from "../interfaces";
import { hash, compare } from "bcrypt";
import { CreateUserDto } from "../dtos";
import { BadRequestException } from "../common/exceptions";
import { create, JwtPayload } from "../lib/jwt";

export default class AuthService {
  public User = UserModel;

  public async signUp(userData: CreateUserDto): Promise<User> {
    const hasUser: User = await this.User.findOne({ email: userData.email });
    if (hasUser) throw new BadRequestException("Email is already exists.");

    const encryptedPassword = await hash(userData.password, 10);
    const now = new Date().toISOString();
    const createdUserData: User = await this.User.create({
      ...userData,
      password: encryptedPassword,
      createdAt: now,
      updatedAt: now,
    });
    return createdUserData;
  }

  public async signIn(userData: CreateUserDto): Promise<object> {
    const user: User = await this.User.findOne({ email: userData.email });
    if (!user) throw new BadRequestException("Email or password is incorrect.");

    const isValidPassword = await compare(userData.password, user.password);
    if (!isValidPassword) throw new BadRequestException("Email or password is incorrect.");

    const payload: JwtPayload = { id: user._id.toString(), nick: user.nick };
    const token = create(payload);
    return { token };
  }
}