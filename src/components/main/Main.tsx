import classNames from 'classnames';
import React from 'react';
import { useAppContext } from 'context/context';
import Pagination from 'components/pagination';
import Search from 'components/search';
import Card from 'components/card';
import styles from './Main.module.scss';
import gatis from './static/gatis.jpg';

const Main: React.FC = () => {
    const { data, darkMode } = useAppContext();

    console.log(data);

    return (
        <div className={classNames(styles.root, { [styles.darkMode]: darkMode })}>
            <div className={styles.searchContainer}>
                <Search />
            </div>
            <div className={styles.cardsContainer}>
                {!data && <div>Loading...</div>}
                {data &&
                    data.map((item) => {
                        return <Card key={item.id} item={item} />;
                    })}
            </div>
            {data && data.length === 0 && (
                <div className={styles.noResults}>
                    <img src={gatis} alt="gatis" />
                    <p>No results</p>
                </div>
            )}
            <div className={styles.paginationContainer}>
                <Pagination />
            </div>
        </div>
    );
};

export default Main;
