import { useAppContext } from 'context/context';
import styles from './Search.module.scss';

const Search: React.FC = () => {
    const { searchResults } = useAppContext();

    return (
        <div className={styles.root}>
            <input
                className={styles.search}
                type="text"
                placeholder="Search for colleague"
                onChange={(e) => {
                    searchResults(e.currentTarget.value);
                }}
            />
        </div>
    );
};

export default Search;
