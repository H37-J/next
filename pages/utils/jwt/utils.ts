import {NextResponse} from "next/server";

export const sonResponse = (status: number, data: any, init?: ResponseInit) => {
    return new NextResponse(JSON.stringify(data), {
        ...init,
        status,
        headers: {
            ...init?.headers,
            'Content-Type': 'application/json',
        }
    })
}
