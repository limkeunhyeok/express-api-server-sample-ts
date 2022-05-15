import { BadRequestException } from "../../common/exceptions";
import { SignInDto } from "./dto/sign-in.dto";
import { Token, JwtPayload, createToken, verifyToken } from "../../lib/jwt";
import { IUserDocument, IUserModel } from "../../models/user.model";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { MeDto } from "./dto/me.dto";

export class AuthService {
  constructor(private readonly UserModel: IUserModel) {}

  async signIn({ email, password }: SignInDto): Promise<Token> {
    const hasUser: IUserDocument = await this.UserModel.findOneByEmail(email);
    if (!hasUser) {
      throw new BadRequestException("Email or password is incorrect.");
    }

    const isMatch: boolean = await hasUser.comparePassword(password);

    if (!isMatch) {
      throw new BadRequestException("Email or password is incorrect.");
    }

    const payload: JwtPayload = { id: hasUser.id, nick: hasUser.nick };
    const token = createToken(payload);
    return { token };
  }

  async refreshToken({ refreshToken }: RefreshTokenDto): Promise<Token> {
    const decoded = await verifyToken(refreshToken);
    const payload = {
      id: decoded.id,
      nick: decoded.nick,
    };
    const token = createToken(payload);
    return { token };
  }

  async me({ id }: MeDto): Promise<IUserDocument> {
    const user: IUserDocument = await this.UserModel.findOneByUserId(id);
    return user;
  }
}
