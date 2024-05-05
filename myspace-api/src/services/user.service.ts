import { promises } from "dns";
import { User } from "../model/user";
import { Database } from "./database";

export class userServices {
  private db: Database;
  constructor() {
    this.db = new Database();
  }
  //fetch users
  async getUsers(): Promise<User[]> {
    const Users: User[] = await this.db.query("SELECT * FROM users");
    return Users;
  }

  //find user id
  async getById(id: string): Promise<User | null> {
    const users: User[] = await this.db.query(
      "SELECT * FROM users where id=?",
      [id]
    );
    //const user2:User= await  this.db.query(`SELECT * FROM users where id=${id}`);
    //const user3:User= await  this.db.query("SELECT * FROM users where id="+id);
    if (users.length > 0) {
      return users[0];
    }
    return null;
  }

  //not exist methode
  async notExist(login: string): Promise<boolean> {
    const users: User[] = await this.db.query(
      "SELECT * FROM users where login=?",
      [login]
    );

    return users.length !== 0;
  }

  //create user
  async createUser(newUser: User): Promise<User> {
    await this.db.query(`
    INSERT INTO users (firstname,lastname,login,password)
    VALUES (?,?,?,?)`,
    [newUser.firstname, newUser.lastname, newUser.login, newUser.password]);
    return newUser;
  }
  //delete User
  async deleteUser(id: string): Promise<any> {
    const result = await this.db.query("DELETE FROM users WHERE id=?", [id]);
    return result;
  }

  //update user
  async updateUser(user: User) {
    const UserUpdated = await this.db.query(
      "UPDATE users SET firstname=? , lastname=? WHERE id=?",
      [user.firstname, user.lastname, user.id]
    );
    return UserUpdated;
  }
}
