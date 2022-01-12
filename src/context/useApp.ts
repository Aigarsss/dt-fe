import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const BASE_LINK = 'http://localhost:5555/characters';

export type UseApp = {
    data: Array<{
        name: string;
        id: number;
        url: string;
    }>;
    selectedName: string;
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
    darkMode: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export const useApp = (): UseApp => {
    const [data, setData] = useState([]); // Data from API
    const [selectedName, setSelectedName] = useState('Click a card'); // Sets/Gets the name on top of the page
    const [pageSize, setPageSize] = useState<number>(12); // Sets/Gets page size, how many items to display
    const [currentPage, setCurrentPage] = useState<number>(1); // Sets/Gets current page
    const [totalItems, setTotalItems] = useState<number>(0); // Sets/Gets total available characters TODO
    const [pageCount, setPageCount] = useState<Array<number>>([0]); // Set/Get available pages for pagination
    const [darkMode, setDarkMode] = useState(false);

    // Get total pages array for pagination
    useEffect(() => {
        const pages = [];
        if (totalItems) {
            for (let index = 1; index < totalItems / pageSize; index++) {
                pages.push(index);
            }
            setPageCount(pages);
        }
    }, [totalItems, pageSize]);

    // Get API data
    async function fetchData(query?: string) {
        if (!query) {
            const { data } = await axios.get(BASE_LINK);
            setData(data);
        } else {
            const { data } = await axios.get(`${BASE_LINK}${query}`);
            setData(data);
        }
    }

    // Re-fetch API data on page size/current page changes
    useEffect(() => {
        fetchData(`?_page=${currentPage}&_limit=${pageSize}`);
    }, [pageSize, currentPage]);

    // Get total available items from API
    async function getTotal() {
        const { data } = await axios.get(BASE_LINK);
        setTotalItems(data.length);
    }

    useEffect(() => {
        getTotal();
    }, []);

    // Get search results from API
    const searchResults = (term?: string) => {
        if (term !== '') {
            fetchData(`?name_like=${term}`);
        } else {
            fetchData(`?_page=${currentPage}&_limit=${pageSize}`);
        }
    };

    // Dark mode stuff
    useEffect(() => {
        const darkModeSet = 'darkMode' in localStorage;
        const storageData = localStorage.getItem('darkMode');
        const storageValue = storageData && JSON.parse(storageData);

        // Dark/Light depending on storage
        if (darkModeSet) {
            setDarkMode(storageValue);
            // Light mode
        } else {
            setDarkMode(false);
        }
    }, [darkMode]);

    return {
        data,
        selectedName,
        setSelectedName,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        searchResults,
        totalItems,
        setTotalItems,
        pageCount,
        setPageCount,
        darkMode,
        setDarkMode
    };
};
