import { createContext } from "react";

export const FooterContext = createContext();

export const FooterProvider = (props) => {
    return (
        <FooterContext.Provider value={{name:"Havva"}}>
            {props.children}
        </FooterContext.Provider>
    )
}