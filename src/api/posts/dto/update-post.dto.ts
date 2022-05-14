import { IsString } from "class-validator"

export class UpdatePostDto {
  @IsString()
  public title: string;
  
  @IsString()
  public content: string;
}