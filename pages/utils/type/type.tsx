import React, {Suspense, useContext, useEffect, useReducer, useState} from "react";
import {Prisma, PrismaClient} from '@prisma/client'
import sql = Prisma.sql;
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import Link from 'next/link';

const prisma = new PrismaClient()

interface Type {
    initialCount: number
}

type Users = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
}[]

const initialState = {count: 0}

const init = (initialCount: number) => {
    return {count: initialCount}
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1}
        case 'decrement':
            return {count: state.count - 1}
        case 'reset':
            return init(action.payload)
        default:
            throw new Error()
    }
}

const TestContext = React.createContext('test')

const Counter = ({initialCount}: Type) => {
    const [count, setCount] = useState(initialCount)
    const [state, dispatch] = useReducer(reducer, initialState)
    const context = useContext(TestContext)

    return (
        <>
            <div>{count}</div>
            <div>{context}</div>
            <span onClick={() => setCount(val => val - 1)}>-</span>
            <span onClick={() => setCount(val => val + 1)}>+</span>
            <div>{state.count}</div>
            <span onClick={() => dispatch({type: 'decrement'})}>-</span>
            <span onClick={() => dispatch({type: 'increment'})}>+</span>
        </>
    )
}

const CounterTwo = ({initialCount}: Type) => {
    const [count, setCount] = useState(initialCount)
    const [state, dispatch] = useReducer(reducer, initialCount, init)
    const context = useContext(TestContext)
    return (
        <>
            <div>{count}</div>
            <div>{context}</div>
            <span onClick={() => setCount(val => val - 1)}>-</span>
            <span onClick={() => setCount(val => val + 1)}>+</span>
            <div>{state.count}</div>
            <span onClick={() => dispatch({type: 'reset', payload: initialCount})}>Reset</span>
            <span onClick={() => dispatch({type: 'decrement'})}>-</span>
            <span onClick={() => dispatch({type: 'increment'})}>+</span>
        </>
    )
}

const Page = ({users}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    const pathname = usePathname();
    const params = new URLSearchParams(useSearchParams());
    return (
        <TestContext.Provider value={'Counter'}>
            <Suspense fallback={<p>Loading...</p>}>
                <div>{users.map(user=>user.email)}</div>
                <div><Counter initialCount={3}/></div>
                <div><CounterTwo initialCount={3}/></div>
                <button onClick={() => router.push('/about')} >button</button>
            </Suspense>
        </TestContext.Provider>
    )
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

export default Page