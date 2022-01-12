import classNames from 'classnames';
import React from 'react';
import { useAppContext } from 'context/context';
import Pagination from 'components/pagination';
import Search from 'components/search';
import Card from './card';
import styles from './Main.module.scss';

const Main: React.FC = () => {
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

export default Main;
