import jwt from 'jsonwebtoken'
import { config } from "../config/config";
import { ValidationError } from "../utils/errors";
import { hashPwd } from "../utils/hash-pwd";
import { UserRecord } from "../records/user.record";
import { LoginUserDto } from '../types';

export class Auth {

    static async login(user: LoginUserDto): Promise<string> {

        const foundUser = await UserRecord.getOneByCredentials(user.email, hashPwd(user.password));

        if ( !foundUser ) throw new ValidationError('Wrong login and password');

        const accessToken = jwt.sign({ id: foundUser.id }, config.tokenSecret, {
            expiresIn: '1h'
        });
        await foundUser.updateToken(accessToken);
        return accessToken;
    }

    static async logout(token: string): Promise<void> {

        const payload = await jwt.verify(token, config.tokenSecret) as { id: string };
        const foundUser = await UserRecord.getOneById(payload.id);
        await foundUser.updateToken();
    }
}