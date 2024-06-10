'use client';

import { Button } from "@/components/ui/button";
import { UserProfile } from "@prisma/client";
import { useState } from "react";


export default function AccountSettings({ user }: { user: UserProfile | undefined }) {
    const [ oldPassword, setOldPassword ] = useState<string>(user?.password || '');
    const [ newPassword, setNewPassword ] = useState<string>('');
    const [ confirmPassword, setConfirmPassword ] = useState<string>('');
    const [ error, setError ] = useState<string>('');

    const updatePassword = async () => {
        const res = await fetch('/api/users/accountSettings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tokenBody: localStorage.getItem('jwtToken'),
                user: user,
                oldPassword: oldPassword,
                newPassword: newPassword,
            })
        });

        const data = await res.json();

        if (data.error) {
            setError(data.error);
        } else {
            window.location.reload();
        }
    }

    return (
        <div>
            <h1>Paramètres du compte</h1>
            <div>
                <h1>Modifier le mot de passe</h1>
                <input type="password" placeholder="Ancien mot de passe" onChange={(e:any) => setOldPassword(e.target.value)} />
                <div>
                    <input type="password" placeholder="Nouveau mot de passe" onChange={(e:any) => setNewPassword(e.target.value)} />
                    <input type="password" placeholder="Confirmer le mot de passe" onChange={(e:any) => setConfirmPassword(e.target.value)} />
                </div>
                <Button onClick={() => {
                    if (newPassword === confirmPassword) {
                        updatePassword();
                    } else {
                        setError('Les mots de passe ne correspondent pas');
                    }
                }}>Enregistrer</Button>
                <p>{error}</p>
            </div>
        </div>
    )
}