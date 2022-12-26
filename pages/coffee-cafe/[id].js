import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import coffeeStoresData from '../../data/coffee-stores.json';
import Head from 'next/head';

export function getStaticProps(staticProps) {
    const params = staticProps.params;
    console.log('params', params);

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
    console.log('Router', router);

    const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

    if (router.isFallback === true) return <div>Loading...</div>;

    console.log('Props', props);

    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>
            <Link href="/">Back to home</Link>
            <p>{address}</p>
            <p>{name}</p>
            <p>{neighbourhood}</p>
            <Image src={imgUrl} alt={name} width="500" height="500" />
        </div>
    );
};

export default CoffeeCafe;
