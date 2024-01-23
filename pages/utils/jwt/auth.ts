import {NextRequest, NextResponse} from "next/server";
import {jwtVerify, SignJWT} from "jose";
import {nanoid} from "nanoid/non-secure";
import {getJwtSecretKey, USER_TOKEN} from "./constants";

interface UserJwtPayload {
    jti: string
    iat: number
}
export class AuthError extends Error {}

export const verifyAuth = async(req: NextRequest) => {
    const token = req.cookies.get(USER_TOKEN)?.value
    if (!token) throw new AuthError('Missing user token')

    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(getJwtSecretKey())
        )
        return verified.payload as UserJwtPayload
    } catch (err) {
        throw new AuthError('Your token has expired.')
    }
}
export const setUserCookie = async (res: NextResponse) => {
    const token = await new SignJWT({})
        .setProtectedHeader({alg: 'HS256'})
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(getJwtSecretKey()))

    res.cookies.set(USER_TOKEN, token, {
        httpOnly: true,
        maxAge: 60 * 60 * 2,
    })

    return res
}

export const expireUserCookie = (res: NextResponse) => {
    res.cookies.set(USER_TOKEN, '', { httpOnly: true, maxAge: 0 })
    return res
}