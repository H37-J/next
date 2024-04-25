import { useSession, signIn, signOut } from "next-auth/react"
import React from "react";

const SignIn = () => {
    return (
        <form
            action={async () => {
                await signIn("github");
            }}
        >
            <p>You are not logged in</p>
            <button type="submit">Sign in with GitHub</button>
        </form>
    );
}

const SignOut = ({children}: {children: React.ReactNode}) => {
    return (
        <form
            action={async () => {
                await signOut();
            }}
        >
            <p>{children}</p>
            <button type="submit">Sign out</button>
        </form>
    );
}

const Page = async () => {
    const {data: session} = useSession()
    const user = session?.user?.email

    return (
        <section>
            <h1>Home</h1>
            <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn/>}</div>
        </section>
    )
}

export default Page