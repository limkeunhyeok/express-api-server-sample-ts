import { IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  public userId: string;
  
  @IsString()
  public postId: string;

  @IsString()
  public content: string;
}
