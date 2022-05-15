import { IsString } from "class-validator";

export class MeDto {
  @IsString()
  public id: string;
}
