import { IsString } from "class-validator";

export class ReadCommentByUserIdDto {
  @IsString()
  public userId: string;
}

export class ReadCommentByPostIdDto {
  @IsString()
  public postId: string;
}
