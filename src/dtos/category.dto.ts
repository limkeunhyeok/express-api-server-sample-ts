import { IsEmail, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  public title: string;
}

export class UpdateCategoryDto {
  @IsString()
  public title: string;
}
