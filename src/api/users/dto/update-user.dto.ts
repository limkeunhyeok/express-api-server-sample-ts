import { IsEmail, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @IsString()
  public userId: string;

  @IsEmail()
  public email: string;

  @Length(8, 16)
  @IsString()
  public password: string;

  @IsString()
  public nick: string;
}
