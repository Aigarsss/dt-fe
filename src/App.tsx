import React from 'react';
import './App.scss';
import Cards from './components/cards';
import Navigation from './components/navigation';
import AppContextProvider from './context/context';

function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <Navigation />
                <Cards />
            </AppContextProvider>
        </div>
    );
}

export default App;
