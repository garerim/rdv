"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message, UserProfile } from '@prisma/client';
import { MessageCircleMore } from 'lucide-react';
import { SocketIndicator } from '../socket-indicator';
import { Separator } from '../ui/separator';
import MessageForm from './messageForm';
import MessageItem from './messageItem';
import { useGlobale } from '../provider/globale-provider';

type ConversationContentProps = {
    conversation: {
        id: string;
        messages: (Message & { user: UserProfile })[];
        name: string;
        membreSuiveurId: string;
        membreCreateurId: string;
        createdAt: Date;
        updatedAt: Date;
        membreCreateur: UserProfile;
        membreSuiveur: UserProfile;
    }
}

export default function ConversationContent({ conversation }: ConversationContentProps) {

    const {user} = useGlobale();
    const { name, membreCreateur, membreSuiveur } = conversation;
    const AmImembreCreateur = membreCreateur.id === user?.id //"d075b56e-d3b6-4f80-b8ab-95c808093f11"
    const membreShow = AmImembreCreateur ? membreSuiveur : membreCreateur

    return (
        <div className='flex flex-col h-full border-t'>
            <div>
                <div className='p-3 flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={membreShow.avatar as string | undefined} alt="@shadcn" />
                        <AvatarFallback>{membreShow.firstName.charAt(0).toUpperCase()}{membreShow.lastName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h2 className='font-bold text-xl'>{name}</h2>
                    <SocketIndicator />
                </div>
                <Separator />

            </div>
            <div className='flex-1 px-4 flex flex-col-reverse overflow-y-scroll'>
                <div className='flex flex-col-reverse gap-2 items-start'>
                    {/* Message */}
                    {conversation.messages.map((message) => (
                        <MessageItem message={message} />
                    ))}
                </div>
                <div className='mb-6'>
                    <MessageCircleMore className="h-16 w-16 mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Ceci est le début de la conversation {name}.
                    </p>
                </div>
            </div>
            <MessageForm />
        </div>
    )
}
