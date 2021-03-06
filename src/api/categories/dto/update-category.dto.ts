import { IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  public categoryId: string;

  @IsString()
  public title: string;
}
