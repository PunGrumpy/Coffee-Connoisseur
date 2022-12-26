import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import cls from 'classnames';

import coffeeStoresData from '../../data/coffee-stores.json';

import styles from '../../styles/coffee-stores.module.css';

export function getStaticProps(staticProps) {
    const params = staticProps.params;

    return {
        props: {
            coffeeStore: coffeeStoresData.find((coffeeStore) => {
                return coffeeStore.id.toString() === params.id;
            }),
        },
    };
}

export function getStaticPaths() {
    return {
        paths: coffeeStoresData.map((coffeeStore) => {
            return {
                params: {
                    id: coffeeStore.id.toString(),
                },
            };
        }),
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
                        src={imgUrl}
                        alt={name}
                        width="600"
                        height="360"
                        className={styles.storeImg}
                    />
                </div>
                <div className={cls('glass', styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/icons/places.svg"
                            width="24"
                            height="24"
                            alt="places"
                        />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/icons/nearMe.svg"
                            width="24"
                            height="24"
                            alt="nearMe"
                        />
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/icons/star.svg"
                            width="24"
                            height="24"
                            alt="star"
                        />
                        <p className={styles.text}>1</p>
                    </div>
                    <button
                        className={styles.upvoteButton}
                        onClick={handlerUpVoteButton}
                    >
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCafe;
