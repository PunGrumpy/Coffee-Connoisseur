import Link from 'next/link';
import styles from '../styles/404.module.css';
import Head from 'next/head';

const FourOhFour = () => {
    return (
        <>
            <Head>
                <title>404 Page Not Found</title>
                <meta name="description" content="404 Page Not Found" />
            </Head>
            <div className={styles.container}>
                <h1 className={styles.header}>404 Page Not Found</h1>
                <p className={styles.text}>
                    The page you are looking for does not exist. Please check the URL for errors.
                </p>
                <Link href="/" className={styles.button}>
                    Back to home
                </Link>
            </div>
        </>
    );
};

export default FourOhFour;
