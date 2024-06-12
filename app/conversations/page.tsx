import ConversationContent from "@/components/conversation/conversationContent"
import ConversationItem from "@/components/conversation/conversationItem"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { prisma } from "@/lib/prisma"

export default async function MesConversations() {

    const conversations = await prisma.conversation.findMany({
        where: {
            OR: [
                {
                    membreCreateurId: 'd075b56e-d3b6-4f80-b8ab-95c808093f11'
                },
                {
                    membreSuiveurId: 'd075b56e-d3b6-4f80-b8ab-95c808093f11'
                }
            ]
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
    });

    return (
        <>
            <ResizablePanelGroup direction="horizontal" className="w-full">
                <ResizablePanel defaultSize={15} minSize={11} maxSize={20} className="flex flex-col items-center border-t">
                    <h2 className="font-bold mb-6">Mes Conversations</h2>
                    <div>
                        {conversations.map((conversation) => (
                            <ConversationItem key={conversation.id} conversation={conversation} />
                        ))}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <ConversationContent conversation={conversations[0]} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    )
}