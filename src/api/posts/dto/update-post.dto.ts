import { IsString } from "class-validator";

export class UpdatePostDto {
  @IsString()
  public postId?: string;

  @IsString()
  public userId?: string;

  @IsString()
  public title: string;

  @IsString()
  public content: string;
}
