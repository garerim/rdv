'use client'

import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
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
            console.log(data.jwtExp);
            console.log(localStorage.getItem('jwtExp'))
            // console.log(data.jwtToken);
            // console.log(localStorage.getItem('jwt'));
            // console.log(data.jwtToken === localStorage.getItem('jwt'));
        } else {
            const errorData = await response.json();
            setError(errorData.error || 'Erreur lors de l\'authentification de l\'utilisateur');
        }
        setLoading(false);
    };

    return (
        <>
            <div className="relative w-full h-full flex justify-center items-center">
                <form action="#" onSubmit={authUser} className='bg-[#555555] w-1/2 h-1/2 flex flex-col'>
                    <input type="email" placeholder='email@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    <input type='submit' className='cursor-pointer' onClick={authUser} disabled={loading} value={loading ? 'Loading...' : 'Click'} />
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    )
}