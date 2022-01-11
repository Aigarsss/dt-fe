import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const BASE_LINK = 'http://localhost:5555/characters';

// Command list
//characters - Iegūs pilno sarakstu ar datiem
//characters/1 - Iegūs no saraksta ierakstu ar ID: 1
//characters?_page=7 - Iegūs ierakstus no 7. lapas (Default ierakstu skaits - 10)
//characters?_page=7&_limit=20 - Iegūs 20 ierakstus no 7. lapas
//characters?q=homer - Iegūs visus ierakstus kur name vai url saturēs vārdu 'homer'
//characters?name_like=homer - Iegūs visus ierakstus kur name satur vārdu 'homer'

export type UseApp = {
    data: Array<{
        name: string;
        id: number;
        url: string;
    }>;
    name: string;
    setSelectedName: Dispatch<SetStateAction<string>>;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    searchResults: (query: string) => void;
    totalItems: number;
    setTotalItems: Dispatch<SetStateAction<number>>;
    pageCount: number[];
    setPageCount: Dispatch<SetStateAction<number[]>>;
};

export const useApp = (): UseApp => {
    const [data, setData] = useState([]); // Data from API
    const [selectedName, setSelectedName] = useState('Click a name'); // Sets/Gets the name on top of the page
    const [pageSize, setPageSize] = useState<number>(12); // Sets/Gets page size, how many items to display
    const [currentPage, setCurrentPage] = useState<number>(1); // Sets/Gets current page
    const [totalItems, setTotalItems] = useState<number>(0); // Sets/Gets total available characters TODO
    const [pageCount, setPageCount] = useState<Array<number>>([0]); // Set/Get available pages for pagination

    useEffect(() => {
        const pages = [];
        if (totalItems) {
            for (let index = 1; index < totalItems / pageSize; index++) {
                pages.push(index);
            }
            setPageCount(pages);
        }
    }, [totalItems, pageSize]);

    async function fetchData(query?: string) {
        if (!query) {
            const { data } = await axios.get(BASE_LINK);
            setData(data);
        } else {
            const { data } = await axios.get(`${BASE_LINK}${query}`);
            setData(data);
        }
    }

    // Re-fetch on page size/current page changes
    useEffect(() => {
        fetchData(`?_page=${currentPage}&_limit=${pageSize}`);
        setData(data);
    }, [pageSize, currentPage]);

    // Get total available items from API
    async function getTotal() {
        const { data } = await axios.get(BASE_LINK);
        setTotalItems(data.length);
    }

    useEffect(() => {
        getTotal();
    }, []);

    const searchResults = (term?: string) => {
        if (term !== '') {
            fetchData(`?name_like=${term}`);
        } else {
            fetchData(`?_page=${currentPage}&_limit=${pageSize}`);
        }
    };

    return {
        data: data,
        name: selectedName,
        setSelectedName,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        searchResults,
        totalItems,
        setTotalItems,
        pageCount,
        setPageCount
    };
};
