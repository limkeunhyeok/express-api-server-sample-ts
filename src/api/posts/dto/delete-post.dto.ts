import { IsString } from "class-validator";

export class DeletePostByPostIdDto {
  @IsString()
  public postId: string;
}

export class DeletePostByUserIdDto {
  @IsString()
  public userId: string;
}

export class DeletePostByCategoryIdDto {
  @IsString()
  public categoryId: string;
}
