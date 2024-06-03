'use client'

import NotConnected from "@/components/notConnected/NotConnected";
import { Loader } from "@/components/loader/Loader";
import { useEffect, useState } from "react";
import { isTokenExpired } from "@/lib/utils";

export default function Dashboard() {
    const [ isMounted, setIsMounted ] = useState(false)
    const [ jwtToken, setJwtToken ] = useState<string | null>();
    const [ jwtExp, setJwtExp ] = useState<string | null>();

    useEffect(() => {
        const setLocalStorage = () => {
            try {
                const storedJwt = localStorage.getItem('jwtToken')
                const storedJwtExp = localStorage.getItem('jwtExp')
                setJwtToken(storedJwt)
                setJwtExp(storedJwtExp)
                setIsMounted(true)
            } catch (error) {
                console.error('Error setting local storage:', error)
            }
        }

        const verifyJWT = async () => {
            console.log(jwtToken, jwtExp)
            if (jwtToken !== null && jwtToken !== undefined && jwtExp !== null && jwtExp !== undefined) {
                const expNumber = parseInt(jwtExp)
                const isExpired = isTokenExpired(expNumber)
                console.log(isExpired)
                if (isExpired) {
                    console.log(123456)
                    setJwtToken(null)
                    setJwtExp(null)
                    localStorage.removeItem('jwtToken')
                    localStorage.removeItem('jwtExp')
                }
            }
        }

        setLocalStorage()
        verifyJWT()
    }, [jwtExp, jwtToken]);

    return (
        <>
            {!isMounted ? <Loader /> :
            (
                <div className='relative w-full h-full flex justify-center items-center'>
                    {!jwtToken ? <NotConnected /> :
                    (
                        <div>
                            <h1>Dashboard</h1>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
