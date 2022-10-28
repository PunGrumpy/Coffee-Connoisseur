import Link from 'next/link';
import { useRouter } from 'next/router';

const CoffeeCafe = () => {
    const router = useRouter();
    console.log('Router', router);

    return (
        <div>
            Coffee Cafe Page {router.query.id}
            <Link href="/">Back to home</Link>
        </div>
    );
};

export default CoffeeCafe;
