import { IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  public userId: string;

  @IsString()
  public categoryId: string;

  @IsString()
  public title: string;

  @IsString()
  public content: string;
}

export class UpdatePostDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;
}
