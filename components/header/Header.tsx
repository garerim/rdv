'use client'

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Disconnect, isTokenExpired } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Loader } from "../loader/Loader";
import { Separator } from "../ui/separator";
import "./header.css"
import Link from "next/link";
import { useGlobale } from "../provider/globale-provider";

export default function Header() {
    const [isMounted, setIsMounted] = useState(false)
    const [jwtToken, setJwtToken] = useState<string | null>();
    const [jwtExp, setJwtExp] = useState<string | null>();

    const { user } = useGlobale();

    const DisconnectManager = () => {
        const foo = Disconnect(jwtToken, jwtExp)
        setJwtToken(foo.jwtStorage)
        setJwtExp(foo.jwtExp)
        window.location.reload()
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
            <header className="fixed left-0 w-full h-[70px] m-0 flex items-center py-2 px-2 z-50 select-none header-glassmorphism ">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold cursor-pointer m-0 p-0" onClick={() => window.location.href = '/'}>Rendez-vous</h2>
                    <Separator orientation="vertical" className="relative mx-5 h-[40px] bg-foreground" />
                    {user && user.role === 'DOCTOR' && (
                        <Link href="dashboard" className="text-secondary-foreground underline-offset-4 hover:underline">Dashboard</Link>
                    )}
                    <Link href="profile" className="text-secondary-foreground underline-offset-4 hover:underline">Profil</Link>
                    <Link href="rendez_vous" className="text-secondary-foreground underline-offset-4 hover:underline">Rendez-Vous</Link>
                    <Link href="suivi_medical" className="text-secondary-foreground underline-offset-4 hover:underline">Suivi</Link>
                    <Link href="conversations" className="text-secondary-foreground underline-offset-4 hover:underline">Conversations</Link>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    {(!jwtToken ? (
                        <>
                            <Button onClick={() => window.location.href = '/login'} variant={"outline"}>Se connecter</Button>
                            <Button onClick={() => window.location.href = '/register'}>S`inscrire</Button>
                        </>
                    ) : (
                        <Button onClick={() => DisconnectManager()}>Se déconnecter</Button>
                    )
                    )}
                    <ThemeToggle />
                </div>
            </header>
        </>
    );
}