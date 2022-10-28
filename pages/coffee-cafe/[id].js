import Link from 'next/link';
import { useRouter } from 'next/router';

const CoffeeCafe = () => {
    const router = useRouter();
    console.log('Router', router);

    return (
        <div>
            Coffee Cafe Page {router.query.id}
            <Link href="/">
                <a>Back to home</a>
            </Link>
        </div>
    );
};

export default CoffeeCafe;
