import Error from "./_error";

const getServerSideProps = async() => {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const errorCode = res.ok ? false : res.status
    const json = await res.json()

    return {
        props: { errorCode, stars: json.stargazers_count },
    }
}

const Page= ({ errorCode, stars }: any) =>{
    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    return <div>Next stars: {stars}</div>
}

export default Page