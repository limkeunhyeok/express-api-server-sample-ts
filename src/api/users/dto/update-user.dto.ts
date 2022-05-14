import { IsString, Length } from "class-validator"

export class UpdateUserDto {
  @Length(8, 16)
  @IsString()
  public password: string;

  @IsString()
  public nick: string;
}
