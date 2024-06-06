'use client'

import { Loader } from '@/components/loader/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { isTokenExpired } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Register() {
    const [isMounted, setIsMounted] = useState(false)
    const [jwtToken, setJwtToken] = useState<string | null>();
    const [jwtExp, setJwtExp] = useState<string | null>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [sexe, setSexe] = useState('H');
    const [birthDate, setBirthDate] = useState('');

    const createUser = async () => {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                rawPassword: password,
                firstName: firstName,
                lastName: lastName,
                sexe: sexe,
                birthDate: birthDate,
            }),
        });

        if (response.ok) {
            console.log('User created successfully');
        } else {
            const errorData = await response.json();
            setError(errorData.error || 'Erreur lors de la création de l\'utilisateur');
        }
        
        setLoading(false);
        if (response.ok) {
            window.location.href = "/login"
        }
    };


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
            // console.log(jwtToken, jwtExp)
            if (jwtToken !== null && jwtToken !== undefined && jwtExp !== null && jwtExp !== undefined) {
                const expNumber = parseInt(jwtExp)
                const isExpired = isTokenExpired(expNumber)
                console.log(isExpired)
                if (isExpired) {
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
                jwtToken ? (window.location.href = '/dashboard') : (
                    <div className="relative w-full h-full flex justify-center items-center">
                        <Card className='w-1/3 max-w-md'>
                            <CardHeader>
                                <CardTitle>Register</CardTitle>
                                <CardDescription>Enter your informations to register</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action="#" onSubmit={createUser} className='w-full h-1/2 flex flex-col items-center gap-4'>

                                    <Input type="text" placeholder='Prénom' onChange={(e) => setFirstName(e.target.value)} autoComplete='off' />

                                    <Input type="text" placeholder='Nom' onChange={(e) => setLastName(e.target.value)} autoComplete='off' />

                                    <Input type="email" placeholder='email@gmail.com' onChange={(e) => setEmail(e.target.value)} autoComplete='off' />

                                    <Input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} autoComplete='off' />

                                    <Input type="date" onChange={(e) => setBirthDate(e.target.value)} autoComplete='off' />

                                    <select onChange={(e) => { setSexe(e.target.value), console.log(e.target.value) }} autoComplete='off' className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1' >
                                        <option value='H'>Homme</option>
                                        <option value='F'>Femme</option>
                                    </select>

                                    <Button type='submit' className='cursor-pointer' onClick={createUser} disabled={loading}>
                                        {loading ? 'Loading...' : 'Register'}
                                    </Button>
                                    {error && <p>{error}</p>}
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )
            }
        </>
    );
}
