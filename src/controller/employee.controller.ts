import express from "express"

import HttpException from "../exception/http.exception";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/createemployee.dto";
import { validate } from "class-validator";
import IncorrectPasswordException from "../exception/incorrectPassword.exception";
import { ErrorCodes } from "../utils/error.code";
import { Role } from "../utils/employee.enum";
import authorize from "../middleware/authorise.middleware";
import { RequestWithUser } from "../utils/requestWithUser";
import EmployeeService from "../service/employee.service";

class EmployeeController {
    public router: express.Router;
   
    constructor( private employeeService: EmployeeService) {

      this.router = express.Router();
      
      this.router.get("/",this.getAllEmployees);
      this.router.get("/:id",this.getEmployeeById);
      this.router.post("/",authorize,this.createEmployee);
      this.router.delete("/:id",this.deleteEmployee);
      this.router.put("/:id",this.updateEmployee);
      this.router.post("/login",this.loginEmployee);
      // this.router.get("/:de",this.getAllDepartments);
  }
  public getAllEmployees = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employees = await this.employeeService.getAllEmployees();
    res.status(200).send(employees);
  };

  public getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
 try {
   const employeeId = Number(req.params.id);
   const employee = await this.employeeService.getEmployeeById(employeeId);
   if (!employee) {
     const error = new HttpException(404,`No employee found with id: ${req.params.id}`);
     throw error;
   }
   res.status(200).send(employee);
 } catch (error) {
     next(error) }
  };
 
  
  public createEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role=req.role;
      if (role!==Role.HR){
        throw new IncorrectPasswordException(ErrorCodes.UNAUTHORISED);
      }

      const employee = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employee);

      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const savedEmployee = await this.employeeService.createEmployee(
        employee.email,
        employee.name,
        employee.address,
        employee.password,
        employee.role,
        employee.department,

      );
      res.status(200).send(savedEmployee);
    } catch (error) {
      next(error);
    }
};
  
    

  public deleteEmployee = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employeeId = Number(req.params.id);
    await this.employeeService.deleteEmployee(employeeId);
    res.status(200).send();
  };

  public updateEmployee =async(
    req :express.Request,
    res:express.Response,
    next:express.NextFunction
  ) => {
    const employeeId= Number(req.params.id);
    const { email, name, address ,department} = req.body;
    await this.employeeService.updateEmployee(employeeId, email, name, address,department);
    res.status(200).send();
    
  };
  

  // public updateEmployee = async (
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) => {
  //   const employeeId = Number(req.params.id);
  //   const { email, name, address } = req.body;
  
  //   try {
     
  //     await this.employeeService.updateEmployee(employeeId, email, name, address);
  //     const employee = plainToInstance(UpdateEmployeeDto, req.body);

  //     const errors = await validate(this.updateEmployee);
  //     if (errors.length > 0) {
  //       console.log(JSON.stringify(errors));
  //       throw new HttpException(400, JSON.stringify(errors));
  //     }
    
  //     res.status(200).send({ message: 'Employee updated successfully' });
  //   } catch (error) {
  //     // Catch any errors that occur during the process
  //     console.error(error); // Log the error (for debugging purposes)
  
  //     // Send a 500 status code if there's a server error or a 400/404 if it's a bad request
  //     if (error instanceof SomeSpecificError) {
  //       // Handle specific error type if needed
  //       return res.status(400).send({ message: error.message });
  //     }
  
  //     // For general errors, send a 500 status with a message
  //     res.status(500).send({ message: 'An error occurred while updating the employee' });
  //   }
  // };
  
 public loginEmployee=async(
  req: express.Request,
    res: express.Response,
    next: express.NextFunction

 ) => {
  const{email,password} = req.body;
  try{
    const token= await this.employeeService.loginEmployee(email,password);
    res.status(200).send({data:token});

  }catch(error){
  next(error);
 }
  
 };

//  public getAllDepartments = async (
//       req: express.Request,
//       res: express.Response
//     ) => {
//       const department = await this.employeeService.getAllDepartments();
//       res.status(200).send(department);
//     };
}

export default EmployeeController