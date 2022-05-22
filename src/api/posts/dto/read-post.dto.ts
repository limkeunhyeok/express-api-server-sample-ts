import { IsString } from "class-validator";

export class ReadPostByPostIdDto {
  @IsString()
  public postId: string;
}

export class ReadPostByUserIdDto {
  @IsString()
  public userId: string;
}

export class ReadPostByCategoryIdDto {
  @IsString()
  public categoryId: string;
}
