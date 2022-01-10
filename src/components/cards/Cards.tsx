import React, { useEffect, useState } from 'react';
import styles from './Cards.module.scss';

type Data = Array<{
    id: string;
    name: string;
    url: string;
}>;

const Cards = () => {
    const [data, setData] = useState<Data>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCard, setSelectedCard] = useState<string>('');
    const [pageSize, setPageSize] = useState<number>(12);

    // Command list
    //characters - Iegūs pilno sarakstu ar datiem
    //characters/1 - Iegūs no saraksta ierakstu ar ID: 1
    //characters?_page=7 - Iegūs ierakstus no 7. lapas (Default ierakstu skaits - 10)
    //characters?_page=7&_limit=20 - Iegūs 20 ierakstus no 7. lapas
    //characters?q=homer - Iegūs visus ierakstus kur name vai url saturēs vārdu 'homer'
    //characters?name_like=homer - Iegūs visus ierakstus kur name satur vārdu 'homer'

    useEffect(() => {
        // Fetch data
        fetch(`http://localhost:5555/characters?_page=1&_limit=${pageSize}`)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
            });
    }, [pageSize]);

    const searchResults = () => {
        if (searchTerm !== '') {
            fetch(`http://localhost:5555/characters?name_like=${searchTerm}`)
                .then((res) => res.json())
                .then((json) => {
                    setData(json);
                });
        } else {
            fetch('http://localhost:5555/characters')
                .then((res) => res.json())
                .then((json) => {
                    setData(json);
                });
        }
    };

    return (
        <div className={styles.root}>
            <div>{selectedCard}</div>
            <div>
                <input
                    type="text"
                    placeholder="Search for colleague"
                    onChange={(e) => {
                        setSearchTerm(e.currentTarget.value);
                        console.log(searchTerm);
                        searchResults();
                    }}
                    value={searchTerm}
                />
            </div>
            <select name="pageSizes" id="pageSizes" onChange={(e) => setPageSize(Number(e.currentTarget.value))}>
                <option value="6">6</option>
                <option value="12" selected={true}>
                    12
                </option>
                <option value="18">18</option>
                <option value="24">24</option>
                <option value="30">30</option>
                <option value="36">30</option>
                <option value="42">30</option>
                <option value="48">48</option>
            </select>
            <div>
                {!data && <div>...Loading</div>}

                {data &&
                    data.map((item) => {
                        return (
                            <button key={item.id} onClick={() => setSelectedCard(item.name)}>
                                {item.name}
                            </button>
                        );
                    })}
            </div>
            <div>
                <p>1 2 3 4 5</p>
            </div>
        </div>
    );
};

export default Cards;
