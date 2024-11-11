import { IsEmail, IsEnum, IsNotEmpty, isString, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./createAddress.dto";
import { Type } from "class-transformer";
import "reflect-metadata"
import { RoleSpecification } from "typeorm";
import { Role } from "../utils/employee.enum";
import { DepartmentDto } from "./createdepartment.dto";
export class CreateEmployeeDto {
  static password(email: string, name: string, address: AddressDto, password: any, role: any) {
    throw new Error("Method not implemented.");
  }
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ValidateNested({each:true})
  @Type(()=>AddressDto)
  address: AddressDto;

  @IsNotEmpty()
  @IsString()
  password:string;

  @IsNotEmpty()
  @IsEnum(Role)
  role:Role;

  @IsNotEmpty()
  @ValidateNested({each:true})
  @Type(()=>DepartmentDto)
  department: DepartmentDto;

  

}