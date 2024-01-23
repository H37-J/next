import type {AppProps} from "next/app";
import {SessionProvider} from 'next-auth/react';
import "../public/assets/css/globals.css";
import {UserProvider} from "@auth0/nextjs-auth0/client";

const App = ({Component, pageProps}: AppProps) => {
    return (
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
    );
}

export default App