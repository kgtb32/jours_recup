import { User } from "../database/entities/user";

export interface Conflict {
    user: User,
    newUser: User
}