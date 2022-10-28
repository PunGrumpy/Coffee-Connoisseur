import Head from 'next/head';
import { useRouter } from 'next/router';

const DynamicPages = () => {
    const route = useRouter();

    return (
        <div>
            <Head>
                <title>{route.query.dynamics}</title>
            </Head>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <h1
                    style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                    }}
                >
                    Page {route.query.dynamics}
                </h1>
            </div>
        </div>
    );
};

export default DynamicPages;
