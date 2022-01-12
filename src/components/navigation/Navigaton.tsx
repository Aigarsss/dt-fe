import styles from './Navigation.module.scss';
import classNames from 'classnames';
import { useAppContext } from '../../context/context';
import { ReactComponent as Moon } from './static/moon.svg';
import { ReactComponent as Sun } from './static/sun.svg';
import { ReactComponent as LogoLight } from './static/logoLight.svg';
import { ReactComponent as LogoDark } from './static/logoDark.svg';
import Dropdown from './dropdown';

const Navigation: React.FC = () => {
    const { selectedName, darkMode, setDarkMode } = useAppContext();

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
                <Dropdown />
            </div>
        </nav>
    );
};

export default Navigation;
