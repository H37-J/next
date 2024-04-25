import type {AppProps} from "next/app";
import {SessionProvider} from 'next-auth/react';
import "../public/assets/css/globals.css";
import {ThemeProvider} from "next-themes";

const App = ({Component, pageProps}: AppProps) => {
    return (
        <SessionProvider session={pageProps.session}>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    );
}

export default App