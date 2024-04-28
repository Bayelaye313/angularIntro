import express, { Router } from "express";
import { userController } from "../controllers/user.controller";

export class userRoutes {
  public router: Router;
  private userController: userController;

  constructor() {
    this.router = express.Router();
    this.userController = new userController();
    this.routeConfig();
  }

  private routeConfig() {
    this.router.get("/", this.userController.getUsers.bind(this.userController));
    this.router.post("/", this.userController.createUser.bind(this.userController));
    this.router.get("/:id", this.userController.getById.bind(this.userController));
    this.router.put("/:id", this.userController.updateUser.bind(this.userController));
    this.router.delete("/:id", this.userController.deleteUser.bind(this.userController));
  }
}
