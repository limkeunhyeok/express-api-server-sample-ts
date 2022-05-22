import { IsString } from "class-validator";

export class ReadCategoryByCategoryIdDto {
  @IsString()
  public categoryId: string;
}
