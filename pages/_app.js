import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Component {...pageProps} />
            <footer>&#169; PunGrumpy</footer>
        </div>
    );
}

export default MyApp;
