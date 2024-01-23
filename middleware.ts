import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import {geolocation} from "@vercel/edge";


const middleware = (request: NextRequest, event: NextFetchEvent) => {
    const cookies = request.cookies
    const requestHeaders = new Headers(request.headers)

    const response = NextResponse.next({
        request: {
            headers: requestHeaders
        }
    })
    setHeader(response, 'str', 'str')

    const {ip} = request
    console.log(request)
    return response
}

const setHeader = (response: NextResponse, key: string, value: any) => {
    response.headers.set(key, value)
}

// export const config = {
//     matcher: '/api/:function*'
// }

export default middleware