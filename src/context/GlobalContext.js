import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    const [deger, setDeger] = useState("Dark")

    useEffect(() => {
        
        return () => {
            console.log("DEĞİŞTİ BABUŞ")
        };
    }, [deger]);
    return (
        <GlobalContext.Provider value={{deger: deger, setDeger }}>
            {props.children}
        </GlobalContext.Provider>
    )
}