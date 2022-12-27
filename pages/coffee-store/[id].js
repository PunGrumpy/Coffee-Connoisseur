import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import cls from 'classnames';

import coffeeStoresData from '../../data/coffee-stores.json';
import { fetchCoffeeStores } from '../../lib/coffee-stores';

import styles from '../../styles/coffee-stores.module.css';

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    const coffeeStores = await fetchCoffeeStores();

    return {
        props: {
            coffeeStore: coffeeStores.find((coffeeStore) => {
                return coffeeStore.fsq_id.toString() === params.id;
            }),
        },
    };
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();

    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.fsq_id.toString(),
            },
        };
    });
    return {
        paths,
        fallback: true,
    };
}

const CoffeeCafe = (props) => {
    const router = useRouter();

    if (router.isFallback === true) return <div>Loading...</div>;

    const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

    const handlerUpVoteButton = () => {
        console.log('handler upvote');
    };

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">Back to home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        src={
                            imgUrl ||
                            'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
                        }
                        alt={name}
                        width="600"
                        height="360"
                        className={styles.storeImg}
                    />
                </div>
                <div className={cls('glass', styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" width="24" height="24" alt="places" />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" width="24" height="24" alt="nearMe" />
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="24" height="24" alt="star" />
                        <p className={styles.text}>1</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handlerUpVoteButton}>
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCafe;
