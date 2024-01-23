import {NextApiRequest, NextApiResponse} from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const {msg} = req.query
    res.end(msg)
}

export const config = {
    matcher: '/about/:path*'
}

export default handler