import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/Banner';
import Card from '../components/Card';

import styles from '../styles/Home.module.css';

import coffeeStoresData from '../data/coffee-stores.json';
import { fetchCoffeeStores } from '../lib/coffee-stores';

import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState } from 'react';

export async function getStaticProps(context) {
    const coffeeStores = await fetchCoffeeStores();

    return {
        props: {
            coffeeStores,
        },
    };
}

export default function Home(props) {
    const { handlerTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
        useTrackLocation();

    const [coffeeStores, setCoffeeStores] = useState('');
    const [coffeeStoresError, setCoffeeStoresError] = useState(null);

    useEffect(() => {
        async function setCoffeeStoresByLocation() {
            if (latLong) {
                try {
                    const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 6);
                    console.log({ fetchedCoffeeStores });
                    // set coffee stores
                    setCoffeeStores(fetchedCoffeeStores);
                } catch (error) {
                    // set error
                    console.log({ error });
                    setCoffeeStoresError(error.message);
                }
            }
        }
        setCoffeeStoresByLocation();
    }, [latLong]);

    const handleOnBannerBtnClick = () => {
        console.log('Banner button clicked');
        handlerTrackLocation();
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Connoisseur</title>
                <meta name="description" content="Discover coffee stores in your area" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Banner
                    buttonText={isFindingLocation ? 'Locating...' : 'View Cafe Nearby'}
                    handleOnClick={handleOnBannerBtnClick}
                />
                {locationErrorMsg && (
                    <p>
                        Something went wrong:{' '}
                        <span style={{ fontWeight: '600' }}>{locationErrorMsg}</span>
                    </p>
                )}
                {coffeeStoresError && (
                    <p>
                        Something went wrong:{' '}
                        <span style={{ fontWeight: '600' }}>{coffeeStoresError}</span>
                    </p>
                )}
                <div className={styles.heroImage}>
                    <Image src="/static/hero-image.png" alt="HeroImg" width={700} height={400} />
                </div>
                {coffeeStores.length > 0 && (
                    <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Coffee stores near me</h2>
                        <div className={styles.cardLayout}>
                            {coffeeStores.map((coffeeStore) => (
                                <Card
                                    key={coffeeStore.id}
                                    name={coffeeStore.name}
                                    imgUrl={
                                        coffeeStore.imgUrl ||
                                        'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
                                    }
                                    href={`/coffee-store/${coffeeStore.id}`}
                                    className={styles.card}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {props.coffeeStores.length > 0 && (
                    <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Coffee stores</h2>
                        <div className={styles.cardLayout}>
                            {props.coffeeStores.map((coffeeStore) => (
                                <Card
                                    key={coffeeStore.id}
                                    name={coffeeStore.name}
                                    imgUrl={
                                        coffeeStore.imgUrl ||
                                        'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
                                    }
                                    href={`/coffee-store/${coffeeStore.id}`}
                                    className={styles.card}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
