"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message, UserProfile } from '@prisma/client';
import { MessageCircleMore, PenBoxIcon, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { DeleteConversationModal } from '../modals/delete-conversation-modal';
import { EditConversationModal } from '../modals/edit-conversation-modal';
import { useGlobale } from '../provider/globale-provider';
import { useSocket } from '../provider/socket-provider';
import { SocketIndicator } from '../socket-indicator';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import MessageForm from './messageForm';
import MessageItem from './messageItem';

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

type MessageWithUser = {
    id: string;
    userProfileId: string;
    conversationId: string;
    text: string;
    isLiked: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: UserProfile;
}


export default function ConversationContent({ conversation }: ConversationContentProps) {

    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false)
    const [messages, setMessages] = useState<MessageWithUser[]>([]) // conversation.messages
    const queryKey = `chat:${conversation.id}`;
    const addKey = `chat:${conversation.id}:messages`;
    const { socket } = useSocket()

    const updateMessages = useCallback((message: MessageWithUser) => {
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
    }, []);

    useEffect(() => {
        if (conversation.messages) {
            setMessages(conversation.messages);
        }
    }, [conversation.messages]);

    useEffect(() => {
        if (!socket) return;

        socket.on(addKey, updateMessages);
        

        return () => {
            socket.off(addKey, updateMessages);
        };
    }, [socket, addKey, messages, queryKey, updateMessages]);

    const handleClose = () => {
        setIsModalOpenEdit(false)
        setIsModalOpenDelete(false)
    }

    const { user } = useGlobale();
    const { name, membreCreateur, membreSuiveur } = conversation;
    const AmImembreCreateur = membreCreateur.id === user?.id //"d075b56e-d3b6-4f80-b8ab-95c808093f11"
    const membreShow = AmImembreCreateur ? membreSuiveur : membreCreateur

    return (
        <>
            <EditConversationModal isModalOpen={isModalOpenEdit} handleClose={handleClose} data={{ name: name, conversationId: conversation.id }} />
            <DeleteConversationModal isModalOpen={isModalOpenDelete} handleClose={handleClose} data={{ conversationId: conversation.id }} />
            <div className='flex flex-col h-full border-t'>
                <div>
                    <div className='p-3 flex items-center gap-2'>
                        <Avatar>
                            <AvatarImage src={membreShow.avatar as string | undefined} alt="@shadcn" />
                            <AvatarFallback>{membreShow.firstName.charAt(0).toUpperCase()}{membreShow.lastName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <h2 className='font-bold text-xl'>{name}</h2>
                        <Button variant={"secondary"} className='p-0 w-9 h-9' onClick={() => setIsModalOpenEdit(true)}>
                            <PenBoxIcon />
                        </Button>
                        <Button variant={"destructive"} className='p-0 w-9 h-9' onClick={() => setIsModalOpenDelete(true)}>
                            <Trash2 />
                        </Button>

                        <SocketIndicator />
                    </div>
                    <Separator />

                </div>
                <div className='flex-1 px-4 flex flex-col-reverse overflow-y-scroll'>
                    <div className='flex flex-col-reverse gap-2 items-start'>
                        {/* Message */}
                        {messages.map((message, index) => (
                            <MessageItem key={index} message={message} />
                        ))}
                        {/* {conversation.messages.map((message) => (
                            <MessageItem key={message.id} message={message} />
                        ))} */}
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
        </>
    )
}
