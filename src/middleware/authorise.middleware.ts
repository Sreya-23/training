import { NextFunction } from "express-serve-static-core";
import  jsonWebToken  from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constatnts";
import { jwtPayload } from "../utils/jwtPayload";
import { RequestWithUser } from "../utils/requestWithUser";
import { Response } from "express";




const authorize=async(
    req:RequestWithUser,
    res:Response,
    next:NextFunction
) => {
    try{
        console.log("here", req);
        const token=getTokenFromRequestHeader(req);
        console.log(token);
    
        const payload=jsonWebToken.verify(token,JWT_SECRET);;
        console.log(payload);
        req.name= (payload as jwtPayload).name;
        req.email= (payload as jwtPayload).email;
        req.role= (payload as jwtPayload).role;
        return next();
        
    }catch(error){
        console.log('ERror')
        return next(error);
    }
}
const getTokenFromRequestHeader =(req:RequestWithUser) => {
    const bearerToken = req.header("Authorization");
    console.log(bearerToken);
    const token = bearerToken ? bearerToken.replace("Bearer " ,""): "" ;
    return token
}
export default authorize