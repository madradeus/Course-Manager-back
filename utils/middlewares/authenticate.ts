import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { UserRecord } from "../../records/user.record";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    if ( req.path === '/auth/login' ) return next();

    const authorisationToken = req.cookies.jwt;
    if ( !authorisationToken ) return res.sendStatus(403);

    try {
        const payload = await jwt.verify(authorisationToken, config.tokenSecret) as { id: string };
        const user = await UserRecord.getOneById(payload.id);
        if ( user.currentToken !== authorisationToken ) {
            throw new Error();
        }
    } catch (e) {
        return res.sendStatus(403);
    }
    next();
}