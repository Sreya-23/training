//const express =require("express");
import express,{Request, Response} from "express";
const server = express();
server.get("/",(req: Request,res:Response)=> {
    console.log(req.url);
    res.status(200).send("hello world");
    
});
server.get("/profile",(req:Request,res:Response)=> {
    
    
    const profile={
          age :5, 
          name:"sreya"
        }
    console.log(profile);
    res.status(200).send(profile);
});

server.listen(3000,() => {
    console.log("server listening");
});

