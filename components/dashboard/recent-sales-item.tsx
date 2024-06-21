"use client";

import { UserProfile } from '@prisma/client'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import React from 'react'
import { useGlobale } from '../provider/globale-provider';

interface RecentSalesItemProps {
    userPatient: {
        avatar: string | undefined;
        firstName: string;
        lastName: string;
        email: string;
    };
    createdAt: Date;
}

const convertDate = (date: Date) => {
    const currentDate = new Date(date)
    const today = new Date();

    const isToday = currentDate.getDate() === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isYesterday = currentDate.getDate() === yesterday.getDate() &&
        currentDate.getMonth() === yesterday.getMonth() &&
        currentDate.getFullYear() === yesterday.getFullYear();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    if (isToday) {
        return `aujourd'hui à ${hours}:${minutes}`;
    } else if (isYesterday) {
        return `hier à ${hours}:${minutes}`;
    } else {
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
};

export default function RecentSalesItem({ userPatient, createdAt }: RecentSalesItemProps) {

    const { user } = useGlobale();

    return (
        <div className="flex items-center">
            <Avatar className="h-9 w-9">
                <AvatarImage className='rounded-full' src={userPatient.avatar as string | undefined} alt="Avatar" />
                <AvatarFallback>{userPatient.firstName.charAt(0).toUpperCase()} {userPatient.lastName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                    <span>{userPatient.firstName} {userPatient.lastName}</span>
                    <span className='text-xs text-gray-400'> {convertDate(createdAt)}</span>
                </p>
                <p className="text-sm text-muted-foreground">{userPatient.email}</p>
            </div>
            <div className="ml-auto font-medium">+{user?.prixPcr!}.00 €</div>
        </div>
    )
}
