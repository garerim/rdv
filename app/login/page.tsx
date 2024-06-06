'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { isTokenExpired } from '@/lib/utils';
import { Loader } from '@/components/loader/Loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isMounted, setIsMounted] = useState(false)
    const [jwtToken, setJwtToken] = useState<string | null>();
    const [jwtExp, setJwtExp] = useState<string | null>();

    const authUser = async () => {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                rawPassword: password,
            }),
        });

        if (response.ok) {
            console.log('User authenticated successfully');
            const data = await response.json();
            localStorage.setItem('jwtToken', data.jwtToken);
            localStorage.setItem('jwtExp', data.jwtExp)
            window.location.href = '/dashboard'
        } else {
            const errorData = await response.json();
            setError(errorData.error || 'Erreur lors de l\'authentification de l\'utilisateur');
        }
        setLoading(false);
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
                (jwtToken ? (window.location.href = '/dashboard') :
                    (
                        <div className="relative w-full h-full flex justify-center items-center">
                            <Card className='w-1/3 max-w-md'>
                                <CardHeader>
                                    <CardTitle>Login</CardTitle>
                                    <CardDescription>Log in with your email and password</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form action="#" onSubmit={authUser} className='w-full h-1/2 flex flex-col items-center gap-4'>
                                        <Input type="email" placeholder='email@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                                        <Input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                        <Button type='submit' className='cursor-pointer' onClick={authUser} disabled={loading}>
                                            {loading ? 'Loading...' : 'Login'}
                                        </Button>
                                        {error && <p>{error}</p>}
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    )
                )}
        </>
    )
}