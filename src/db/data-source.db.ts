import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";
import * as dotenv from "dotenv"
dotenv.config();


const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5435,
  database: "training",
  username: "postgres",
  password: "postgres",
  extra: { max: 5, min: 2 }, // connection pool
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ["dist/src/entity/*.js"],
  migrations: ["dist/src/db/migrations/*.js"]
});

export default dataSource;