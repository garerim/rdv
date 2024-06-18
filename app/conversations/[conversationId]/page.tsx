import ConversationContent from '@/components/conversation/conversationContent'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

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
        // select: {
        //     id: true,
        //     name: true,
        //     membreSuiveurId: true,
        //     membreCreateurId: true,
        //     membreSuiveur: true,
        //     membreCreateur: true,
        //     createdAt: true,
        //     updatedAt: true,
        //     messages: true
        // }
        include: {
            messages: {
                include: {
                    user: true
                }
            },
            membreCreateur: true,
            membreSuiveur: true
        }
    })

    if (!conversation) {
        return redirect('/conversations')
    }

    console.log(conversation);

    return (
        <>
            {/* {JSON.stringify(conversation)} */}
            <ConversationContent conversation={conversation} />
        </>
    )
}