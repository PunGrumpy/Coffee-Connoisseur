import { createContext, useEffect, useReducer, useState } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router';

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

export const StoreContext = createContext();

export const ACTION_TYPES = {
    SET_LAT_LONG: 'SET_LAT_LONG',
    SET_COFFEE_STORES: 'SET_COFFEE_STORES',
};

const storeReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LAT_LONG: {
            return { ...state, latLong: action.payload.latLong };
        }
        case ACTION_TYPES.SET_COFFEE_STORES: {
            return { ...state, coffeeStores: action.payload.coffeeStores };
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const StoreProvider = ({ children }) => {
    const initialState = {
        latLong: '',
        coffeeStores: [],
    };

    const [state, dispatch] = useReducer(storeReducer, initialState);

    return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
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
