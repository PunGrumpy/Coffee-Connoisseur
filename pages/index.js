import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/Banner';
import styles from '../styles/Home.module.css';

export default function Home() {
    const handleOnBannerBtnClick = () => {
        console.log('Banner button clicked');
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Connoisseur</title>
                <meta name="description" content="Discover coffee stores in your area" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Banner buttonText="View Cafe Nearby" handleOnClick={handleOnBannerBtnClick} />
                <div className={styles.heroImage}>
                    <Image src="/static/hero-image.png" alt="HeroImg" width={700} height={400} />
                </div>
            </main>
        </div>
    );
}
