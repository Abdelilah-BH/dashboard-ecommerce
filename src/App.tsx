import React, { useState, createContext, useMemo } from "react";
import Router from "./router";
import { UserContextType } from "./types";

// const defaultValue = {
//     isAuth: false,
// };

export const UserContext = createContext<UserContextType>({
    isAuth: false,
    setIsAuth: (value) => {
        return value;
    },
});
const App: React.FC = () => {
    const [isAuth, setIsAuth] = useState(false);
    const providerValue = useMemo(() => ({ isAuth, setIsAuth }), [isAuth, setIsAuth]);
    return (
        <UserContext.Provider value={providerValue}>
            <Router />
        </UserContext.Provider>
    );
};

export default App;
