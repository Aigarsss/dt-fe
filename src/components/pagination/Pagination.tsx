import classNames from 'classnames';
import { useAppContext } from '../../context/context';
import styles from './Pagination.module.scss';
import { ReactComponent as Left } from './static/left.svg';
import { ReactComponent as Right } from './static/right.svg';

const Pagination: React.FC = () => {
    const { setCurrentPage, pageCount, currentPage } = useAppContext();

    return (
        <div className={styles.root}>
            {/* Left arrow */}
            <span
                className={classNames(styles.chevron, { [styles.chevronDisabled]: currentPage === 1 })}
                onClick={() => {
                    if (currentPage > 1) {
                        setCurrentPage((prevPage) => prevPage - 1);
                    }
                }}
            >
                <Left />
            </span>
            {/* First page */}
            <span className={styles.number} onClick={() => setCurrentPage(1)}>
                1
            </span>
            {/* Conditional ... */}
            {![1, 2, 3].includes(currentPage) && <span className={styles.number}>...</span>}
            {/* Actual pages, Current +/- 2 */}
            {pageCount &&
                pageCount
                    .filter((page) => page !== 1 && page !== pageCount[pageCount.length - 1] && page <= currentPage + 2 && page >= currentPage - 2)
                    .map((page) => {
                        return (
                            <span
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={classNames(styles.number, { [styles.selected]: page === currentPage })}
                            >
                                {page}
                            </span>
                        );
                    })}
            {/* Conditional ... */}
            {![pageCount[pageCount.length - 3], pageCount[pageCount.length - 2], pageCount[pageCount.length - 1]].includes(currentPage) && (
                <span className={styles.number}>...</span>
            )}
            {/* Last page ... */}
            <span className={styles.number} onClick={() => setCurrentPage(pageCount[pageCount.length - 1])}>
                {pageCount[pageCount.length - 1]}
            </span>
            {/* Right arrow ... */}
            <span
                className={classNames(styles.chevron, { [styles.chevronDisabled]: currentPage === pageCount[pageCount.length - 1] })}
                onClick={() => {
                    if (currentPage < pageCount[pageCount.length - 1]) {
                        setCurrentPage((prevPage) => prevPage + 1);
                    }
                }}
            >
                <Right />
            </span>
        </div>
    );
};

export default Pagination;
