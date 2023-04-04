import { Router } from "express";
import { Auth } from "../services/Auth";
import { LoginUserDto } from "../types";

export const authRouter = Router()


authRouter
    .post('/login', async (req, res) => {
        const user = req.body as LoginUserDto;
        const accessToken = await Auth.login(user)

        res
            .cookie('jwt', accessToken, {
                secure: false,
                domain: 'localhost',
                httpOnly: true,
                maxAge: 1000 * 60 * 60,
            })
            .json({
                ok: true
            })
    })
    .get('/logout', async (req, res) => {
        const token = req.cookies.jwt
        await Auth.logout(token);
        res
            .clearCookie(
                'jwt',
                {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                })
            .json({ ok: true });
    })
