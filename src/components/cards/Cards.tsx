import React, { useEffect, useState } from 'react';
import styles from './Cards.module.scss';

type Data = Array<{
    id: string;
    name: string;
    url: string;
}>;

const Cards = () => {
    const [data, setData] = useState<Data>([]);
    const [selectedCard, setSelectedCard] = useState<string>('');
    const [pageSize, setPageSize] = useState<number>(12);
    const [totalPages, setTotalPages] = useState<number>();
    const [pageCount, setPageCount] = useState<Array<number>>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Command list
    //characters - Iegūs pilno sarakstu ar datiem
    //characters/1 - Iegūs no saraksta ierakstu ar ID: 1
    //characters?_page=7 - Iegūs ierakstus no 7. lapas (Default ierakstu skaits - 10)
    //characters?_page=7&_limit=20 - Iegūs 20 ierakstus no 7. lapas
    //characters?q=homer - Iegūs visus ierakstus kur name vai url saturēs vārdu 'homer'
    //characters?name_like=homer - Iegūs visus ierakstus kur name satur vārdu 'homer'

    useEffect(() => {
        // Fetch data
        fetch(`http://localhost:5555/characters?_page=${currentPage}&_limit=${pageSize}`)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
            });

        fetch(`http://localhost:5555/characters`)
            .then((res) => res.json())
            .then((json) => {
                setTotalPages(json.length);
            });
    }, [pageSize, currentPage]);

    const searchResults = (term: any) => {
        if (term !== '') {
            fetch(`http://localhost:5555/characters?name_like=${term}`)
                .then((res) => res.json())
                .then((json) => {
                    setData(json);
                });
        } else {
            fetch(`http://localhost:5555/characters?_page=${currentPage}&_limit=${pageSize}`)
                .then((res) => res.json())
                .then((json) => {
                    setData(json);
                });
        }
    };

    useEffect(() => {
        const pages = [];
        if (totalPages) {
            for (let index = 1; index < totalPages / pageSize; index++) {
                pages.push(index);
            }
            setPageCount(pages);
        }
    }, [totalPages, pageSize]);

    return (
        <div className={styles.root}>
            <div>{selectedCard}</div>
            <div>
                <input
                    type="text"
                    placeholder="Search for colleague"
                    onChange={(e) => {
                        searchResults(e.currentTarget.value);
                    }}
                />
            </div>
            <select name="pageSizes" defaultValue="12" id="pageSizes" onChange={(e) => setPageSize(Number(e.currentTarget.value))}>
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="18">18</option>
                <option value="24">24</option>
                <option value="30">30</option>
                <option value="36">36</option>
                <option value="42">42</option>
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
                {pageCount
                    ? pageCount.map((page) => {
                          return (
                              <button key={page} onClick={() => setCurrentPage(page)}>
                                  {' '}
                                  {page}{' '}
                              </button>
                          );
                      })
                    : 'Loading...'}
            </div>
        </div>
    );
};

export default Cards;
