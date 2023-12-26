
import { Router } from "express";
import { userClass } from "./user.class"

export const userRouter = Router();


userRouter.get("/", userClass.getAllUser);
userRouter.get("/:id", userClass.getUserById);
userRouter.post("/", userClass.newUser);
userRouter.put("/:id", userClass.edit);
userRouter.delete("/:id", userClass.deleteUser);
