import {Error} from "./_error";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

type git = {
    errorCode: number | boolean
    json: {
        stargazers_count: number
    }
}

export const getServerSideProps = (async () => {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const errorCode = res.ok ? false : res.status
    const json = await res.json()

    return {
        props: {errorCode, stars: json.stargazers_count}
    }
}) satisfies GetServerSideProps<{
    errorCode: number | boolean,
    stars: git
}>

const Page = ({errorCode, stars}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (errorCode) {
        return <Error statusCode={errorCode}/>
    }
    return <div>{stars}</div>
}

export default Page