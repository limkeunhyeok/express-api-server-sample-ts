import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @Length(8, 16)
  @IsString()
  public password: string;

  @IsString()
  public nick: string;
}

export class UpdateUserDto {
  @Length(8, 16)
  @IsString()
  public password: string;

  @IsString()
  public nick: string;
}