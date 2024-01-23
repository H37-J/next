import useSWR from "swr";
import {Suspense, useState} from "react";

type User = {
    id: number
    email: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Page = () => {
    const {data, error, isLoading} = useSWR('http://localhost:3000/api/user', fetcher)
    const [result, setResult] = useState<String>()
    const [Loading, setLoading] = useState<boolean>(false)
    if (error) return error
    if (isLoading) return 'Loading...'
    const google = async () => {
        setLoading(true)
        try {
            const res = await fetch('https://naver.com/', {
                method: 'GET'
            })
            if (!res.ok) {
                throw new Error('Google Fail')
            }
            const data = await res.json()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {result}
            <button type="button" onClick={() => google()}>google</button>
            {data.map((user: User) => user.email)}
        </>
    )
}


export default Page

