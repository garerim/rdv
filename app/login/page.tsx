'use client'

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { MailIcon } from "../../public/MailIcon";
import { useEffect, useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../public/EyeIcons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { set } from "react-hook-form";

export default function Login() {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ token, setToken ] = useState<string | null>(null);
    const [ isMounted, setIsMounted ] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        const getTokenFromLocalStorage = () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    setToken(token);
                    setIsMounted(true);
                }
            } catch (error) {
                console.error('Error while getting localStorage`s token:', error);
                setIsMounted(true);
            }
        };

        getTokenFromLocalStorage();
    }, []);

    const connexionSubmit = () => {
        setIsOpen(false);
        try {
            // queryMaker('api/auth', 'POST', JSON.parse(JSON.stringify({email: email, password: password})))
            //     ?.then((res: any) => { window.location.href = '/dashboard', setToken(res.data.token), localStorage.setItem('token', res.data.token)});
            if (true) {
                setIsOpen(true);
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    return (
        <>
            <div className="absolute w-full h-full z-0">
                <div onKeyDown={(e:any) => {
                    // if (e.key === 'Enter') {
                    //     connexionSubmit();
                    // }
                }} className="relative left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] flex flex-col gap-10">
                    <h1 className="underline text-xl font-semibold">Connexion</h1>
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Entrez un mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={isVisible ? "text" : "password"}
                        className="max-w-xs"
                    />
                    <div className="flex flex-row justify-between">
                        <Separator orientation="vertical" className="h-[40px]" />
                        <Button className="relative" onClick={connexionSubmit}>Se connecter</Button>
                        <Separator orientation="vertical" className="h-[40px]" />
                    </div>
                </div>
            </div>
            {/* <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{"Erreur lors de la connexion"}</AlertDialogTitle>
                        <AlertDialogDescription>
                            Erreur lors de l'identification.<br/>Veuillez vérifier vos identifiants.<br/><br/>Si le problème persiste, veuillez contacter le support.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e:any) => setIsOpen(false)}>Fermer</AlertDialogCancel>
                        <AlertDialogAction onClick={connexionSubmit}>Réessayer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </>
    );
}