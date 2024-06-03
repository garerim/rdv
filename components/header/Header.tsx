'use client'

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Disconnect, isTokenExpired } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Loader } from "../loader/Loader";

export default function Header() {
    const [ isMounted, setIsMounted ] = useState(false)
    const [ jwtToken, setJwtToken ] = useState<string | null>();
    const [ jwtExp, setJwtExp ] = useState<string | null>();

    const DisconnectManager = () => {
        const foo = Disconnect(jwtToken, jwtExp)
        setJwtToken(foo.jwtStorage)
        setJwtExp(foo.jwtExp)
    }

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
            {!isMounted ? <Loader /> : (
                <header className="fixed top-0 left-0 w-full flex items-center mb-2 py-2 px-2 z-50 m-2">
                    <h2 className="text-2xl font-bold mr-auto">Rendez-vous</h2>

                    <div className="ml-auto flex items-center gap-2">
                        {(!jwtToken ? (
                            <>
                                <Button onClick={(e: any) => window.location.href = '/register'}>S`inscrire</Button>
                                <Button onClick={(e: any) => window.location.href = '/login'}>Se connecter</Button>
                            </>
                        ) : (
                            <Button onClick={ (e: any) => DisconnectManager() }>Se déconnecter</Button>
                        ))}
                        <ThemeToggle />
                    </div>
                </header>
            )}
        </>
    );
}