import { IsString } from "class-validator";

export class ReadUserDto {
  @IsString()
  public userId: string;
}
