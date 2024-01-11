import {PrismaClient} from '@prisma/client'
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

type Users = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
}[]
const prisma = new PrismaClient()
export const User = ({users}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <div>{users.map(user => user.email)}</div>
}

export const getServerSideProps = (async (context) => {
    const users = await prisma.user.findMany()
    return {
        props: {
            users
        }
    }
}) satisfies GetServerSideProps<{
    users: Users
}>

