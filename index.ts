import express, { Request, Response } from "express";
import book, { time } from "./Bookroutes";
import loggerMiddleware from "./src/middleware/loggerMiddleware";
import bodyParser from "body-parser";

import Employee from "./src/entity/employee.entity";
import departmentRouter from "./src/routes/department.routes";

import dataSource from "./src/db/data-source.db";
import employeeRouter from "./src/routes/employee.routes";
import HttpException from "./src/exception/http.exception";
import errorMiddleware from "./src/middleware/error.middleware";

const app = express();
const PORT = 3000;
console.log(time)
// Middleware to parse JSON requests
//app.use(express.json());
app.use(bodyParser.json())
app.use('/books', book)
app.use(loggerMiddleware)
app.use('/employee', employeeRouter);
app.use('/department',departmentRouter)
import "reflect-metadata"


// app.use((err:any, req : any, res : any, next:any) => {
//   console.error(err.stack);
//   res.status(500).send({ error: err.message });
// });
// app.use((err: Error, req: any, res : any, next:any) => {
//   console.error(err.stack);
//   if (err instanceof HttpException) {
//       res.status(err.status).send({ error: err.message, code: err.status });
//       return;
// }
// res.status(500).send({ error: err.message });
// });
app.use(errorMiddleware);




(async () => {
    try {
      await dataSource.initialize();
    } catch (e) {
      console.log("Failed to connect to db", e);
      process.exit(1);
    }
  
    app.listen(3000, () => {
      console.log("server listening to 3000");
    });
  })();