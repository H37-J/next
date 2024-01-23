export const USER_TOKEN =  'user-token'

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!


export const getJwtSecretKey = (): string => {
    if(!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
        throw new Error('JWT_SECRET_KEY is not set')
    }
    return JWT_SECRET_KEY
}

