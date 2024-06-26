import sqlite3 from "sqlite3";
import { AppDataSource } from "../data-source";

export class Database {
  db: sqlite3.Database;

  constructor() {
    AppDataSource.initialize().then(async () => {

      console.log("Init the database with sucess...")
    })

    /*this.db = new sqlite3.Database(
      process.env.SLQLITE_DB || "myspace.db",
      (err) => {
        if (err) {
          console.error("Error opening database", err);
        } else {
          console.error(" base de donnee ouverte");
          this.createTable();
        }
      }
    );
  }
  private createTable() {
    this.db.run(
      `create table if not exists users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstname TEXT,
            lastname TEXT,
            login TEXT,
            password TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
      (err) => {
        if (err) {
          console.error("Error creating table ", err);
        } else {
          console.error("table created successfully or already exist ");
        }
      }
    );
  }
  public query(sql:string, params: any[] = []):Promise<any>{
    return new Promise((resolve, reject) => {
        this.db.all(sql, params, (err, rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })

    })*/
  }
}

