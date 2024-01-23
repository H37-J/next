import {NextApiRequest, NextApiResponse} from "next";

type ResponseData = {
    id: number
    message: string
}[]

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    res.status(200).json([{
        id: 1,
        message: 'hello'
    }, {
        id: 2,
        message: 'test'
    }])
}

export default handler