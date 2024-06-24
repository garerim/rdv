"use client";

import ConversationItem from "@/components/conversation/conversationItem";
import { AddConversationModal } from "@/components/modals/add-conversation-modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Message, UserProfile } from "@prisma/client";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export type ConversationProps = {
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

export default function MesConversations({ children }: { children: React.ReactNode }) {

    const [conversations, setConversations] = useState<ConversationProps[]>()
    const [jwtToken, setJwtToken] = useState<string | null>();
    const [user, setUser] = useState<any>({} as UserProfile);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleClose = () => setIsOpenModal(false);

    useEffect(() => {
        const user = fetch("/api/userByJWT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tokenBody: localStorage.getItem("jwtToken") }),
        });

        user.then((res) => res.json()).then((data) => {
            setUser(data)
            
            if (data.error){
                window.location.href = "/"
            }
            const conversations = fetch(`/api/conversationsByUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: data.id }),
            });

            conversations.then((res) => res.json()).then((data) => {
                setConversations(data)
            });

        });
    }, [jwtToken]);

    if (!conversations) {
        return (
            <div className="flex flex-col">
                <Label className="font-bold mb-6 select-none">Mes Conversations</Label>
                <Label>{"Vous n'avez pas encore de conversation"}</Label>
            </div>
        )
    }

    return (
        <>
            <AddConversationModal isModalOpen={isOpenModal} handleClose={handleClose} />
            <ResizablePanelGroup direction="horizontal" className="w-full">
                <ResizablePanel defaultSize={15} minSize={11} maxSize={20} className="flex flex-col items-center border-t gap-2">
                    <Label className="font-bold mb-2 mt-4">Mes Conversations</Label>
                    <Button
                        onClick={() => setIsOpenModal(true)}
                    >
                        <Plus />
                        Nouvelle conversation
                    </Button>
                    <div>
                        {conversations ? conversations.map((conversation) => (
                            <ConversationItem key={conversation.id} conversation={conversation} />
                        )) : <Label>{"Vous n'avez pas de conversation"}</Label>}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    {children}
                    {/* <ConversationContent conversation={conversations[0]} /> */}
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    )
}