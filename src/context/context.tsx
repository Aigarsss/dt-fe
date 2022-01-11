import React, { createContext, useContext } from 'react';
import { UseApp, useApp } from './useApp';
const AppContext = createContext<UseApp>({} as UseApp);
const { Provider } = AppContext;

const AppContextProvider: React.FC = ({ children }) => {
    const appProps = useApp();

    return <Provider value={{ ...appProps }}>{children}</Provider>;
};

export default AppContextProvider;

export const useAppContext = (): UseApp => useContext(AppContext);
