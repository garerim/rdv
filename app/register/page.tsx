'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { isTokenExpired } from '@/lib/utils';
import { Loader } from '@/components/loader/Loader';

export default function Register() {
    const [ isMounted, setIsMounted ] = useState(false)
    const [ jwtToken, setJwtToken ] = useState<string | null>();
    const [ jwtExp, setJwtExp ] = useState<string | null>();

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
                        <form action="#" onSubmit={createUser} className='bg-[#555555] w-1/2 h-1/2 flex flex-col'>
                            <input type="text" placeholder='Prénom' onChange={(e) => setFirstName(e.target.value)} autoComplete='off' />
                            <input type="text" placeholder='Nom' onChange={(e) => setLastName(e.target.value)} autoComplete='off' />
                            <input type="email" placeholder='email@gmail.com' onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
                            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
                            <input type="date" onChange={(e) => setBirthDate(e.target.value)} autoComplete='off' />
                            <select onChange={(e) => { setSexe(e.target.value), console.log(e.target.value) }} autoComplete='off' >
                                <option value='H'>Homme</option>
                                <option value='F'>Femme</option>
                            </select>
                            <input type='submit' className='cursor-pointer' onClick={createUser} disabled={loading} value={loading ? 'Loading...' : 'Click'} />
                            {error && <p>{error}</p>}
                        </form>
                    </div>
                )
            }
        </>
    );
}
