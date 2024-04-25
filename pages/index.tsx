import {useEffect, useState} from "react";

const Page = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = String(count)
    });
    return (
        <>
            <button onClick={() => setCount(count + 1)}>button</button>
            <h1>Next js!!</h1>
        </>
    )
}

export default Page