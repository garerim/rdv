import ConversationContent from '@/components/conversation/conversationContent'
import { prisma } from '@/lib/prisma'
import { redirect, useParams } from 'next/navigation'
import React from 'react'

interface ConversationIdPageProps {
    params: {
        conversationId: string
    }
}


export default async function ConversationIdPage({ params }: ConversationIdPageProps) {

    const conversation = await prisma.conversation.findUnique({
        where: {
            id: params.conversationId
        },
        select: {
            id: true,
            name: true,
            membreSuiveurId: true,
            membreCreateurId: true,
            membreSuiveur: true,
            membreCreateur: true,
            createdAt: true,
            updatedAt: true,
            messages: true
        }
    })

    if (!conversation) {
        return redirect('/conversations')
    }

    return (
        <>
            <ConversationContent conversation={conversation} />
        </>
    )
}