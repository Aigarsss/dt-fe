import classNames from 'classnames';
import { useAppContext } from '../../context/context';
import Pagination from '../pagination';
import Search from '../search';
import Card from './card';
import styles from './Cards.module.scss';

const Cards = () => {
    const { data, darkMode } = useAppContext();

    return (
        <div className={classNames(styles.root, { [styles.darkMode]: darkMode })}>
            <div className={styles.searchContainer}>
                <Search />
            </div>
            <div className={styles.cardsContainer}>
                {!data && <div>...Loading</div>}
                {data &&
                    data.map((item) => {
                        return <Card key={item.id} item={item} />;
                    })}
            </div>
            <div className={styles.paginationContainer}>
                <Pagination />
            </div>
        </div>
    );
};

export default Cards;
