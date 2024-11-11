import { IsNotEmpty, IsString } from "class-validator";
import "reflect-metadata"
export class DepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

}