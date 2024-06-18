"use client";

import { isTokenExpired } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

type GlobaleContextType = {
    isMounted: boolean;
    jwtToken: string | null | undefined;
    jwtExp: string | null | undefined;
    user: any;
};

const GlobaleContext = createContext<GlobaleContextType>({
    isMounted: false,
    jwtToken:  null,
    jwtExp: null,
    user: null,
});

export const useGlobale = () => {
    return useContext(GlobaleContext);
};

export const GlobaleProvider = ({ children }: { children: React.ReactNode }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [jwtToken, setJwtToken] = useState<string | null>();
    const [jwtExp, setJwtExp] = useState<string | null>();
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const setLocalStorage = () => {
            try {
                const storedJwt = localStorage.getItem("jwtToken");
                const storedJwtExp = localStorage.getItem("jwtExp");
                setJwtToken(storedJwt);
                setJwtExp(storedJwtExp);
                setIsMounted(true);
            } catch (error) {
                console.error("Error setting local storage:", error);
            }
        };

        const verifyJWT = async () => {
            // console.log(jwtToken, jwtExp);
            if (
                jwtToken !== null &&
                jwtToken !== undefined &&
                jwtExp !== null &&
                jwtExp !== undefined
            ) {
                const expNumber = parseInt(jwtExp);
                const isExpired = isTokenExpired(expNumber);
                // console.log(isExpired);
                if (isExpired) {
                    // console.log(123456);
                    setJwtToken(null);
                    setJwtExp(null);
                    localStorage.removeItem("jwtToken");
                    localStorage.removeItem("jwtExp");
                }
            }
        };

        setLocalStorage();
        verifyJWT();
    }, [jwtExp, jwtToken]);

    useEffect(() => {
        const user = fetch("/api/userByJWT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tokenBody: localStorage.getItem("jwtToken") }),
        });

        user.then((res) => res.json()).then((data) => setUser(data));
    }, [jwtToken]);

    return (
        <GlobaleContext.Provider value={{ isMounted, jwtToken, jwtExp, user }}>
            {children}
        </GlobaleContext.Provider>
    )
}