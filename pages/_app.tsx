import type {AppProps} from "next/app";
import "../assets/css/globals.css";

const App = ({Component, pageProps}:  AppProps) => {
    return <Component {...pageProps} />
}

export default App