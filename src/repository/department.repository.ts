import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
   
    constructor(private repository :Repository<Department>){
       
    }
    async find(): Promise<Department[]>{
    
        return this.repository.find({});  
    }
    async findOneBy(filter:Partial<Department>):Promise<Department | null>{
        
        return this.repository.findOne({
            where:filter,
        })
}
save = async (department: Department): Promise<Department> => {
    return this.repository.save(department);
  };
  Updatesave = async (department: Department): Promise<Department> => {
    return this.repository.save(department);
  };
  softRemove = async (department: Department): Promise<void> => {
    await this.repository.softRemove(department);
  };

}
export default DepartmentRepository;