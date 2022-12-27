import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/Banner';
import Card from '../components/Card';
import styles from '../styles/Home.module.css';
import coffeeStoresData from '../data/coffee-stores.json';

export async function getStaticProps(context) {
    return {
        props: {
            coffeeStores: coffeeStoresData,
        },
    };
}

export default function Home(props) {
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
                {props.coffeeStores.length > 0 && (
                    <>
                        <h2 className={styles.heading2}>Coffee Stores</h2>
                        <div className={styles.cardLayout}>
                            {props.coffeeStores.map((coffeeStore) => (
                                <Card
                                    key={coffeeStore.id}
                                    name={coffeeStore.name}
                                    imgUrl={coffeeStore.imgUrl}
                                    href={`/coffee-cafe/${coffeeStore.id}`}
                                    className={styles.card}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
