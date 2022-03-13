import UserModel from "@models/user.model";
import { User } from "@interfaces/user.interface";
import { hash, compare } from "bcrypt";
import { CreateUserDto, UpdateUserDto } from "@dtos/user.dto";
import { BadRequestException } from "@exceptions/bad-request.exception";
import { create, verfiy, JwtPayload } from "@/lib/jwt";

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

  public async signIn(userData: CreateUserDto): Promise<string> {
    const user: User = await this.User.findOne({ email: userData.email });
    if (!user) throw new BadRequestException("Email or password is incorrect.");

    const isValidPassword = await compare(userData.password, user.password);
    if (!isValidPassword) throw new BadRequestException("Email or password is incorrect.");

    const token = create({ userId: user._id, nick: user.nick });
    return token;
  }
}