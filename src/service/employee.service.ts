import { EntityNotFoundError } from "typeorm";
import { AddressDto } from "../dto/createAddress.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/employee.enum";
import bcrypt from "bcrypt";
import { jwtPayload } from "../utils/jwtPayload";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constatnts";
import { ErrorCodes } from "../utils/error.code";
import IncorrectPasswordException from "../exception/incorrectPassword.exception";
import EntityNotFoundException from "../exception/entityNotFoundException";
import jsonwebtoken from "jsonwebtoken"
import Department from "../entity/department.entity";
import { DepartmentDto } from "../dto/createdepartment.dto";

class EmployeeService{
    
    constructor(private employeeRepository : EmployeeRepository) {
       

    }
     getAllEmployees= async (): Promise<Employee[]>=>{
        return await this.employeeRepository.find();
      }
     getEmployeeById=async(id:number): Promise<Employee |null> =>{
        return this.employeeRepository.findOneBy({
            id,
        });
    }
    createEmployee = async (email: string, name: string, address: AddressDto,password:string,role:Role,department:DepartmentDto): Promise<Employee> => {
        const newEmployee = new Employee();
        newEmployee.email = email;
        newEmployee.name = name;
    
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
    
        newEmployee.address = newAddress;
        newEmployee.password = password ? await bcrypt.hash(password,10) : "";
        newEmployee.role=role;
        const newDepartment= new Department();
        newDepartment.name= department.name;
        newEmployee.department= newDepartment;

    
        return this.employeeRepository.save(newEmployee);
      };

      deleteEmployee = async (id: number): Promise<void> => {
        const employee = await this.getEmployeeById(id);
        await this.employeeRepository.softRemove(employee);
      };
      
public updateEmployee = async (
  id: number,
  email: string,
  name: string,
  address: AddressDto,
  department:DepartmentDto,
  
): Promise<Employee> => {
  
  const employee = await this.getEmployeeById(id);
 
  employee.email = email;
  employee.name = name;
  employee.address.line1 = address.line1;
  employee.address.pincode = address.pincode;
  employee.department.name=department.name;

 
  return this.employeeRepository.Updatesave(employee);
};
loginEmployee =async(email:string,password:string) =>
{
  const employee=await this.employeeRepository.findOneBy({email});
  if(!employee){
    throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);

  }
  const result=await bcrypt.compare(password,employee.password)
  if(!result){
    throw new IncorrectPasswordException(ErrorCodes.INCORRECT_PASSWORD)
  }
  const payload: jwtPayload ={
    name:employee.name,
    email:employee.email,
    role:employee.role,

  };
  const token =jsonwebtoken.sign(payload,JWT_SECRET,{expiresIn:JWT_VALIDITY});
  return{token};
}
// getAllDepartments= async (): Promise<Department[]>=>{
//   return await this.departmentRepository.find();
// }


      
      

};

 export default  EmployeeService