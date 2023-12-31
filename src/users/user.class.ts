import * as UserService from './users.service'
import { User, UserDetails } from './user.interface';
import { Util } from '../Utils/util';


export class userClass {

    static getAllUser = async (req, res) => {
        try {
            const users: User[] = await UserService.findAll();
            if (Object(users).length <= 0) {
                return res.status(404).send({ users });
            }
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    static getUserById = async (req, res) => {
        const id: string = req?.params?.id || 0;

        if (!Util.isValidUUID(id)) {
            return res.status(400).send({ message: "userId is invalid" });
        }
        try {
            const user: User = await UserService.find(id);
            if (user) {
                return res.status(200).send(user);
            }
            return res.status(404).send({ message: "userId doesn't exist" });
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    static newUser = async (req, res) => {
        try {
            const item: UserDetails = req.body;
            const newItem = await UserService.create(item);
            return res.status(201).json(newItem);
        } catch (err) {
            return res.status(500).send(err.message);
        }

    }

    static edit = async (req, res) => {
        const id: string = req.params.id

        try {
            if (!Util.isValidUUID(id)) {
                return res.status(400).send({ message: "userId is invalid" });
            }
            const itemUpdate: User = req.body;
            const existingItem: User = await UserService.find(id);

            if (existingItem) {
                const updatedItem = await UserService.update(id, itemUpdate);
                return res.status(200).json(updatedItem);
            } else {
                return res.status(400).send({ message: "userId doesn't exist" });
            }

        } catch (err) {
            return res.status(500).send(err.message);
        }

    }

    static deleteUser = async (req, res) => {
        try {
            const id: string = req?.params?.id || 0
            if (!Util.isValidUUID(id)) {
                return res.status(400).send({ message: "userId is invalid" });
            }
            let userStatus = await UserService.remove(id);
            if (userStatus) {
                return res.status(204).send({ message: "user deleted successfully" });
            } else {
                return res.status(404).send({ message: "user does not exist" });
            }


        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}

