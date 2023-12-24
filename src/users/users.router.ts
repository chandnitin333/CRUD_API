
import { Request, Response } from "express";
import { Router } from "express";
import * as UserService from "./users.service";
import { UserDetails, User } from "./user.interface";
import { userClass } from "./user.class"

export const userRouter = Router();


userRouter.get("/", userClass.getAllUser);
userRouter.get("/:id", userClass.getUserById);
userRouter.post("/", userClass.newUser);
userRouter.put("/:id", userClass.edit);
userRouter.delete("/:id", userClass.deleteUser);
