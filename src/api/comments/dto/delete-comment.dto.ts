import { IsString } from "class-validator";

export class DeleteCommentDto {
  @IsString()
  public commentId: string;
}
