'use client'

import NotConnected from "@/components/notConnected/NotConnected";
import { useCallback, useEffect, useState } from "react";
import { isTokenExpired } from "@/lib/utils";

export default function Dashboard() {
    const [ jwtToken, setJwtToken ] = useState<String>();
    const [ jwtExp, setJwtExp ] = useState<String>();

    const disconnect = useCallback(async () => {
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("jwtExp")
        setJwtToken(undefined)
        setJwtExp(undefined)

        const response = await fetch('/api/auth', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: jwtToken
            }),
        });
        console.log(response.ok)
    }, [jwtToken])

    useEffect(() => {
        const verifyJWT = async () => {
            const storedJwt = localStorage.getItem("jwtToken");  
            const storedJwtExp = localStorage.getItem("jwtExp");
            if (storedJwt !== null && storedJwtExp !== null) {
                const isExpired = isTokenExpired(storedJwtExp)
                console.log(isExpired)
                if (isExpired) {
                    console.log("okExpired")
                    disconnect()
                }
                setJwtToken(storedJwt);
                setJwtExp(storedJwtExp);
            }
        }

        verifyJWT()
    }, [jwtToken, jwtExp, disconnect]);

    return (
        <>
            <div className='relative w-full h-full flex justify-center items-center'>
                {!jwtToken ? <NotConnected /> :
                (
                    <div>
                        <h1>Dashboard</h1>
                        <button onClick={() => { disconnect }}>Disconnect</button>
                    </div>
                )}
            </div>
        </>
    );
}
