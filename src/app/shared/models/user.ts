export class User {
    _id: string;
    email: string;
    password: string;
    name: string;
    admin: boolean;
    token?: string;
}
