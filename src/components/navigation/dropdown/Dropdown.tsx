import { useAppContext } from 'context/context';
import styles from './Dropdown.module.scss';
import { ReactComponent as ArrowDown } from './static/downArrow.svg';

const Dropdown: React.FC = () => {
    const { setPageSize } = useAppContext();
    return (
        <div className={styles.root}>
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
            <span className={styles.customArrow}>
                <ArrowDown />
            </span>
        </div>
    );
};

export default Dropdown;
