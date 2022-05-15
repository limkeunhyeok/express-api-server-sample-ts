import { IsEmail, IsString, Length } from "class-validator";

export class SignUpDto {
  @IsEmail()
  public email: string;

  @Length(8, 16)
  @IsString()
  public password: string;

  @IsString()
  public nick: string;
}

export class SignInDto {
  @IsEmail()
  public email: string;

  @Length(8, 16)
  @IsString()
  public password: string;
}
