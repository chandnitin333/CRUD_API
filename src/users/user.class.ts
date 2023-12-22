import * as UserService from './users.service'
import { User, UserDetails } from './user.interface';
import { Util } from '../Utils/util';


export class userClass {

    static getAllUser = async (req, res) => {
        try {
            const items: User[] = await UserService.findAll();
            if (Object(items).length <= 0) {
                return res.status(404).send({ items });
            }
            return res.status(200).json(items);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    static getUserById = async (req, res) => {
        const id: string = req?.params?.id || 0;

        if (Util.isValidUUID(id)) {
            return res.status(400).send("userId is invalid");
        }
        try {
            const item: User = await UserService.find(id);
            if (item) {
                return res.status(200).send(item);
            }
            return res.status(404).send("userId doesn't exist");
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
                return res.status(400).send("userId is invalid");
            }
            const itemUpdate: User = req.body;
            const existingItem: User = await UserService.find(id);

            if (existingItem) {
                const updatedItem = await UserService.update(id, itemUpdate);
                return res.status(200).json(updatedItem);
            } else {
                return res.status(400).send("userId doesn't exist");
            }

        } catch (err) {
            return res.status(500).send(err.message);
        }

    }

    static deleteUser = async (req, res) => {
        try {
            console.log("Proccess Id", process.pid)
            const id: string = req?.params?.id || 0
            if (!Util.isValidUUID(id)) {
                return res.status(400).send("userId is invalid");
            }
            let status = await UserService.remove(id);
            if (status == null) {
                return res.status(400).send("userId doesn't exist");
            }
            return res.sendStatus(204);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}

