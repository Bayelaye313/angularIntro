import { promises } from "dns";
import { User } from "../model/user";
import { Database } from "./database";
import { AppDataSource } from "../data-source";

export class userServices {
  private db: Database;
  constructor() {
    this.db = new Database();
  }
  //fetch users
  async getUsers(): Promise<User[]> {
    const Users: User[] = await AppDataSource.manager.find(User);
    return Users;
  }

  //find user id
  async getById(id: number): Promise<User | null> {
    const user: User = await AppDataSource.manager.findOneBy(User, {id:id})
    //const user2:User= await  this.db.query(`SELECT * FROM users where id=${id}`);
    //const user3:User= await  this.db.query("SELECT * FROM users where id="+id);
    return user;
  }

  //not exist methode
  async notExist(login: string): Promise<boolean> {
    const user = await AppDataSource.manager.findOneBy(User, {login:login});

    if (user !== undefined) {
      return false
    } else {
      return true
    }  ;
  }

  //create user
  async createUser(newUser: User): Promise<User> {
    const reslt = await AppDataSource.manager.save(newUser)
    return reslt;
  }
  //delete User
  async deleteUser(id: string): Promise<any> {
  }

  //update user
  async updateUser(user: User) {
  }
}
