import { User } from "../model/user";
import { userServices } from "../services/user.service";
import { Request, Response } from "express";

export class userController {
  private userService: userServices;
  constructor() {
    this.userService = new userServices();
  }

  async getUsers(req: Request, res: Response) {
    try {
      const list_users = await this.userService.getUsers();
      res.json(list_users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await this.userService.getById(Number(req.params.id));
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async createUser(req: Request, res: Response) {
    const { firstname, lastname, login, password } = req.body;
    if (
      firstname === undefined ||
      lastname === undefined ||
      login === undefined ||
      password === undefined
    ) {
      res.status(400).json({ Message: "contract not match" });
    }
    {
      try {
        const userNotExist = await this.userService.notExist(login);
        if (!userNotExist) {
          const user: User = new User () ;
          user.firstname = firstname;
           user.lastname = lastname;
           user.login = login;
           user.password = password;
          const data = await this.userService.createUser(user);
          res.status(200).json(data);
        } else {
          res
            .status(400)
            .json({ message: "user already exist with same login" });
        }
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const user: User = req.body;
      user.id = Number (req.params.id);
      const data = await this.userService.updateUser(user);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const result = await this.userService.deleteUser(id);
        res.sendStatus(204);
      } catch (error:any) {
        res.status(500).json({ message: error.message });
      }
    }}
