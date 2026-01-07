import { createContext } from "react";

const GlobalContext = createContext({});

const GlobalProvider = ({ value, children }) => {
	return (
		<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
	);
};

export { GlobalContext, GlobalProvider };
