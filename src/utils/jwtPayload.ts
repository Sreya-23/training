import { Role } from "./employee.enum";

export type jwtPayload = {
    name:string,
    email:string,
    role:Role,
    
}
export default jwtPayload;