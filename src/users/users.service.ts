import { UserDetails, User } from "./user.interface";
import { Users } from "./users.interface";
// import { v4 as uuid } from 'uuid';
const { v4: uuid } = require('uuid');
import { users } from '../config/userData.mock'

/**
 * 
 * @returns 
 */
export const findAll = async (): Promise<User[]> => Object.values(users);

export const find = async (id: string): Promise<User> => {

    return users[id]
}



export const create = async (newUser: UserDetails): Promise<User> => {
    const id: string = uuid();

    users[id] = {
        id,
        ...newUser,
    };
    console.log(users)
    return users[id];
};

export const update = async (
    id: string,
    userUpdate: UserDetails
): Promise<User | null> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    users[id] = { id, ...userUpdate };

    return users[id];
};

export const remove = async (id: string): Promise<boolean> => {
    const user = await find(id);
    if (!user) {
        return false;
    }

    delete users[id];

    return true;


};