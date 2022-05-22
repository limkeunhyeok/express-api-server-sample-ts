import { IsString } from "class-validator";

export class DeleteCategoryDto {
  @IsString()
  public categoryId: string;
}
