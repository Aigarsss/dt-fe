import classNames from 'classnames';
import { useAppContext } from '../../../context/context';
import styles from './Card.module.scss';

type CardProps = {
    item: { id: number; name: string; url: string };
};

const Card: React.FC<CardProps> = ({ item }) => {
    const { name, url } = item;
    const { setSelectedName, selectedName } = useAppContext();

    return (
        <div className={classNames(styles.root, { [styles.selected]: name === selectedName })} onClick={() => setSelectedName(name)}>
            <img src={url} alt={name} />
            <span className={styles.name}>{name}</span>
        </div>
    );
};

export default Card;
