export class User {
    _id: number;
    email: string;
    password: string;
    name: string;
    admin: boolean;
    token?: string;
}
