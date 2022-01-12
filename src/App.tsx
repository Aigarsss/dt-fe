import './App.scss';
import Cards from 'components/main';
import Navigation from 'components/navigation';
import AppContextProvider from 'context/context';

const App: React.FC = () => {
    return (
        <div className="App">
            <AppContextProvider>
                <Navigation />
                <Cards />
            </AppContextProvider>
        </div>
    );
};

export default App;
