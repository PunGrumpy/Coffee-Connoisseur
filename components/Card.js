import styles from './Card.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Card = props => {
    return (
        <Link href={props.href}>
            <h2>{props.name}</h2>
            <Image src={props.imgUrl} width={260} height={160} alt={props.name} />
        </Link>
    );
};

export default Card;
