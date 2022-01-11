import styles from './Navigation.module.scss';
import classNames from 'classnames';
import { useAppContext } from '../../context/context';

const Navigation: React.FC = () => {
    const { name, setPageSize } = useAppContext();

    return (
        <nav className={styles.root}>
            <a href="/">
                <img src="/images/logo.svg" alt="logo" />
            </a>
            <div className={styles.name}>{name}</div>
            <div className={styles.switchers}>
                <span className={classNames(styles.switcherItem, styles.switcherItemSelected)}>
                    <img src="/images/sun.svg" alt="light-mode" />
                </span>
                <span className={styles.switcherItem}>
                    <img src="/images/moon.svg" alt="dark-mode" />
                </span>
                <select
                    name="pageSizes"
                    defaultValue="12"
                    id="pageSizes"
                    className={styles.picker}
                    onChange={(e) => setPageSize(Number(e.currentTarget.value))}
                >
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="18">18</option>
                    <option value="24">24</option>
                    <option value="30">30</option>
                    <option value="36">36</option>
                    <option value="42">42</option>
                    <option value="48">48</option>
                </select>
            </div>
        </nav>
    );
};

export default Navigation;
