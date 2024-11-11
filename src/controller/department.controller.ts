import express from "express"
import DepartmentService from "../service/department.service";
import HttpException from "../exception/http.exception";
import { RequestWithUser } from "../utils/requestWithUser";
import { plainToInstance } from "class-transformer";
import { DepartmentDto } from "../dto/createdepartment.dto";
import { Role } from "../utils/employee.enum";
import IncorrectPasswordException from "../exception/incorrectPassword.exception";
import { ErrorCodes } from "../utils/error.code";
import authorize from "../middleware/authorise.middleware";
import { validate } from "class-validator";
class DepartmentController {
    public router: express.Router;
   
    constructor( private departmentService: DepartmentService) {

    this.router = express.Router();
      
    this.router.get("/",this.getAllDepartments);
     this.router.get("/:id",this.getDepartmentById);
   this.router.post("/",authorize,this.createDepartment);
    this.router.delete("/:id",this.deleteDepartment);
    this.router.put("/:id",authorize,this.updateDepartment);
      
  }
  public getAllDepartments = async (
    req: express.Request,
    res: express.Response
  ) => {
    const department = await this.departmentService.getAllDepartments();
    res.status(200).send(department);
  };

  public getDepartmentById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
 try {
   const departmentId = Number(req.params.id);
   const department = await this.departmentService.getDepartmentById(departmentId);
   if (!department) {
     const error = new HttpException(404,`No employee found with id: ${req.params.id}`);
     throw error;
   }
   res.status(200).send(department);
 } catch (error) {
     next(error) }
  };

  public createDepartment = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try{
       const role=req.role;
       if(role!=Role.HR){
        throw new IncorrectPasswordException(ErrorCodes.UNAUTHORISED);
        
       


    }
    
      const department = plainToInstance(DepartmentDto, req.body);
      const errors=await validate(department);

      if(errors.length >0){
        console.log(JSON.stringify(errors));
        throw new HttpException(400,JSON.stringify(errors));
      }
      const saveddepartment = await this.departmentService.createDepartment(
       department.name,

      );
      res.status(200).send(saveddepartment);
    } catch(error){
      next(error);
    }
  };

    public updateDepartment =async(
        req :RequestWithUser,
        res:express.Response,
        next:express.NextFunction
      ) => {
        try{
          const role=req.role;
          if(role!=Role.HR){
           throw new IncorrectPasswordException(ErrorCodes.UNAUTHORISED);
           
          
   
   
       }
      
        const departmentId= Number(req.params.id);
        const { name} = req.body;
        await this.departmentService.updateDepartment(departmentId,name);
        res.status(200).send();
    }catch(error){
      next(error);
    }
        
      };

      public deleteDepartment = async (
        req: express.Request,
        res: express.Response
      ) => {
        const departmentId = Number(req.params.id);
        await this.departmentService.deleteDepartment(departmentId);
        res.status(200).send();
      };
};


export default DepartmentController;