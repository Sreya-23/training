import { DataSource,FindOneOptions,Repository} from "typeorm";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";
// import Department from "../entity/department.entity";
class EmployeeRepository {
   
    constructor(private repository :Repository<Employee>){
       
    }
    async find(): Promise<Employee[]>{
    
        return this.repository.find({ relations: ["address" , "department"] });  
    }
    async findOneBy(filter:Partial<Employee>):Promise<Employee | null>{
        
        return this.repository.findOne({
            where:filter,
            relations:["address","department"],
        })
    }
    save = async (employee: Employee): Promise<Employee> => {
        return this.repository.save(employee);
      };

    softRemove = async (employee: Employee): Promise<void> => {
        await this.repository.softRemove(employee);
      };

      Updatesave = async (employee: Employee): Promise<Employee> => {
        return this.repository.save(employee);
      };

    //   async find(): Promise<Department[]>{
    
    //     return this.repository.find({});  
    // }

    
      
     
      

}

export default EmployeeRepository;