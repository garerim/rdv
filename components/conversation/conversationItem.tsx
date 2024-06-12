"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Message, UserProfile } from '@prisma/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type ConversationItemProps = {
    conversation: {
        id: string;
        name: string;
        membreSuiveurId: string;
        membreCreateurId: string;
        createdAt: Date;
        updatedAt: Date;
        membreCreateur: UserProfile;
        membreSuiveur: UserProfile;
        messages: Message[];
    }
}

export default function ConversationItem({ conversation }: ConversationItemProps) {
    
    const params = useParams();
    const { name, membreCreateur, membreSuiveur } = conversation;
    const AmImembreCreateur = membreCreateur.id === "d075b56e-d3b6-4f80-b8ab-95c808093f11"
    const membreShow = AmImembreCreateur ? membreSuiveur : membreCreateur

    return (
        <Link href={`/conversations/${conversation.id}`}>
            <div className={cn(' mx-2 flex items-center gap-2 rounded-full hover:bg-secondary p-2 cursor-pointer transition-all', params?.conversationId === conversation.id && 'bg-secondary')}>
                <Avatar>
                    <AvatarImage src={membreShow.avatar as string | undefined} alt="@shadcn" />
                    <AvatarFallback>{membreShow.firstName.charAt(0).toUpperCase()}{membreShow.lastName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p>{name}</p>
            </div>
        </Link>
    )
}
