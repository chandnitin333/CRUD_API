
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
// userRouter.get("/", async (req: Request, res: Response) => {
//     try {
//         const items: User[] = await UserService.findAll();

//         res.status(200).send(items);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// GET items/:id

// userRouter.get("/:id", async (req: Request, res: Response) => {
//     const id: string = req.params.id;

//     try {
//         const item: User = await UserService.find(id);

//         if (item) {
//             return res.status(200).send(item);
//         }

//         res.status(404).send("item not found");
//     } catch (e) {
//         res.status(500).send(e);
//     }
// });

// // POST items

// userRouter.post("/", async (req: Request, res: Response) => {
//     try {
//         const item: UserDetails = req.body;

//         const newItem = await UserService.create(item);

//         res.status(201).json(newItem);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// });

// // PUT items/:id

// userRouter.put("/:id", async (req: Request, res: Response) => {
//     const id: string = req.params.id

//     try {
//         const itemUpdate: User = req.body;

//         const existingItem: User = await UserService.find(id);

//         if (existingItem) {
//             const updatedItem = await UserService.update(id, itemUpdate);
//             return res.status(200).json(updatedItem);
//         }

//         const newItem = await UserService.create(itemUpdate);

//         res.status(201).json(newItem);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// });

// // DELETE items/:id

// userRouter.delete("/:id", async (req: Request, res: Response) => {
//     try {
//         const id: string = req.params.id
//         await UserService.remove(id);

//         res.sendStatus(204);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// });





