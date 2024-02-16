// import 'bootstrap/dist/css/bootstrap.css'
import '../src/app/globals.css'
import type { AppProps } from 'next/app'
import Home from "./index";
import 'bootstrap-icons/font/bootstrap-icons.css';


function MyApp({ Component, pageProps}: AppProps) {

    const ComponentToRender = Home;
    return (
        <ComponentToRender {...pageProps} />
    )
}


export default MyApp