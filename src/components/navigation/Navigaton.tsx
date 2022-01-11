import styles from './Navigation.module.scss';
import classNames from 'classnames';
import { useAppContext } from '../../context/context';
import { ReactComponent as Moon } from './static/moon.svg';
import { ReactComponent as Sun } from './static/sun.svg';
import { ReactComponent as LogoLight } from './static/logoLight.svg';
import { ReactComponent as LogoDark } from './static/logoDark.svg';

const Navigation: React.FC = () => {
    const { selectedName, setPageSize, darkMode, setDarkMode } = useAppContext();

    return (
        <nav className={classNames(styles.root, { [styles.darkMode]: darkMode })}>
            <a href="/">{darkMode ? <LogoDark /> : <LogoLight />}</a>
            <div className={styles.name}>{selectedName}</div>
            <div className={styles.switchers}>
                <span className={classNames(styles.switcherItem, { [styles.switcherItemSelected]: !darkMode })} onClick={() => setDarkMode(false)}>
                    <Sun />
                </span>
                <span className={classNames(styles.switcherItem, { [styles.switcherItemSelected]: darkMode })} onClick={() => setDarkMode(true)}>
                    <Moon />
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
