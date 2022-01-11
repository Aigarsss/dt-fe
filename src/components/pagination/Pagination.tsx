import classNames from 'classnames';
import { useAppContext } from '../../context/context';
import styles from './Pagination.module.scss';
import { ReactComponent as Left } from './static/left.svg';
import { ReactComponent as Right } from './static/right.svg';

const Pagination: React.FC = () => {
    const { setCurrentPage, pageCount, currentPage } = useAppContext();

    return (
        <div className={styles.root}>
            <span className={classNames(styles.chevron,{[styles.chevronDisabled]: currentPage === 1})} onClick={() => {
                if (currentPage > 1) {
                    setCurrentPage(prevPage => prevPage - 1)
                }
            } }>
                <Left />
            </span>
            <span className={styles.number}>
                ...
            </span>
            {pageCount &&
                pageCount
                    .filter((page) => page === 1 || page === pageCount[pageCount.length - 1] || (page <= currentPage + 2 && page >= currentPage - 2))
                    .map((page) => {
                        return (
                            <span 
                                key={page} 
                                onClick={() => setCurrentPage(page)} 
                                className={classNames(styles.number, {[styles.selected]: page === currentPage})}
                            >
                                {page}
                            </span>
                        );
            })}
            <span className={styles.number}>
                ...
            </span>
            <span className={classNames(styles.chevron,{[styles.chevronDisabled]: currentPage === pageCount[pageCount.length - 1]})} onClick={() => {
                if (currentPage < pageCount[pageCount.length - 1]) {
                    setCurrentPage(prevPage => prevPage + 1)
                }
            } }>
                <Right />
            </span>
        </div>
    );
};

export default Pagination;
