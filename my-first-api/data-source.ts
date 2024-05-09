import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employee } from "./src/app/model/employee"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "edacydb",
    synchronize: true,
    logging: false,
    entities: [Employee], //["src/model/*.ts"],
    migrations: [],
    subscribers: [],
})
