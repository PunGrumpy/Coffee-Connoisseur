import { createContext, useEffect, useReducer, useState } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import StoreProvider from '../store/store-context';

const Loading = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handlerStart = (url) => url !== router.asPath && setIsLoading(true);
        const handlerComplete = (url) =>
            url === router.asPath && setTimeout(() => setIsLoading(false));

        router.events.on('routeChangeStart', handlerStart);
        router.events.on('routeChangeComplete', handlerComplete);
        router.events.on('routeChangeError', handlerComplete);

        return () => {
            router.events.off('routeChangeStart', handlerStart);
            router.events.off('routeChangeComplete', handlerComplete);
            router.events.off('routeChangeError', handlerComplete);
        };
    });

    return (
        isLoading && (
            <div className="spinner-wrapper">
                <div className="spinner" />
            </div>
        )
    );
};

function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider>
            <Loading />
            <Component {...pageProps} />
        </StoreProvider>
    );
}

export default MyApp;
