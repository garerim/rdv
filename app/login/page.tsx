'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { isTokenExpired } from '@/lib/utils';
import { Loader } from '@/components/loader/Loader';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ isMounted, setIsMounted ] = useState(false)
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
            localStorage.getItem('jstToken')
            console.log(localStorage.getItem('jwtExp'))
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
                (jwtToken ? (window.location.href = '/dashboard') :
                (
                    <div className="relative w-full h-full flex justify-center items-center">
                        <form action="#" onSubmit={authUser} className='bg-[#555555] w-1/2 h-1/2 flex flex-col'>
                            <input type="email" placeholder='email@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            <input type='submit' className='cursor-pointer' onClick={authUser} disabled={loading} value={loading ? 'Loading...' : 'Click'} />
                            {error && <p>{error}</p>}
                        </form>
                    </div>
                )
            )}
        </>
    )
}