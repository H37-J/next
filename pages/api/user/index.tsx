import {PrismaClient} from '@prisma/client'
import {GetServerSideProps, InferGetServerSidePropsType, NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient()

type ResponseData = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
}[]

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
}

export default handler