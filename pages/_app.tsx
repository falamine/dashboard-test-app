import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import Home from "./dashboard";


function MyApp({ Component, pageProps}: AppProps) {

    const ComponentToRender = Home;
    return (
        <ComponentToRender {...pageProps} />
    )
}


export default MyApp