import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
    // await prisma.user.create({
    //     data: {
    //         name: 'Alice',
    //         email: 'alice@prisma.io',
    //         posts: {
    //             create: {title: 'Hello World'},
    //         },
    //     },
    // })
    //
    // const allUsers = await prisma.user.findMany({
    //     include: {
    //         posts: true,
    //     },
    // })
    // console.dir(allUsers, {depth: null})
}

