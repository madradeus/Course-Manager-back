import { UserEntity } from "../types";
import { ValidationError } from "../utils/errors";
import { isEmail } from "../utils/isEmail";
import { pool } from "../db/db";
import { FieldPacket } from "mysql2";

export class UserRecord implements UserEntity {
    id?: string;
    email: string;
    password: string;
    currentToken?: string | null;

    constructor(user: UserEntity) {

        if ( user.id ) {
            if ( typeof user.id !== 'string' || user.id.length !== 36 ) {
                throw new ValidationError('Wrong format of id')
            }
        }

        if ( !user.email || !isEmail(user.email) ) {
            throw new ValidationError('Invalid email Address')
        }

        if ( !user.password ) {
            throw new ValidationError('Password is obligatory ')
        }

        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.currentToken = user.currentToken
    }

    static async getOneByCredentials(email: string, password: string): Promise<UserRecord | null> {

        const [[user]] = await pool.execute("SELECT * FROM `users` WHERE email = :email AND password = :password", {
            email: email,
            password: password
        }) as [UserEntity[], FieldPacket[]];

        return user ? new UserRecord(user) : null;
    }

    static async getOneById(id: string): Promise<UserRecord | null> {

        const [[user]] = await pool.execute("SELECT * FROM `users` WHERE id = :id", {
            id: id
        }) as [UserEntity[], FieldPacket[]];

        return user ? new UserRecord(user) : null;
    }

    async updateToken(token: string | null = null): Promise<void> {

        await pool.execute("UPDATE `users` SET `currentToken` = :token WHERE id = :id", {
            id: this.id,
            token: token
        })
    }

}