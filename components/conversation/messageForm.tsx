"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { Send } from 'lucide-react'
import { useParams } from 'next/navigation';
import { FormEvent, useState } from 'react'

export default function MessageForm() {

    const params = useParams();
    const [message, setMessage] = useState("");

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/socket/messages', {
                content: message,
                conversationId: params?.conversationID,
            // userProfileId: user?.id
            });
            console.log('Message sent successfully:', response);
            // Optionally clear the input field
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    return (
        <form className='w-full p-3 flex items-center gap-2' onSubmit={() => onSubmit}>
            <Input placeholder='Message...' value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button type='submit'>
                <Send />
            </Button>
        </form>
    )
}
