export interface UserDetails {
    username: string;
    age: number;
    hobbies: object;

}

export interface User extends UserDetails {
    id: string;
}