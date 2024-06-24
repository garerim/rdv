"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DeleteConversationModalProps {
    isModalOpen: boolean;
    handleClose: () => void;
    data: {
        conversationId: string;
    }
}

export const DeleteConversationModal = ({isModalOpen, handleClose, data} : DeleteConversationModalProps) => {

    const router = useRouter();

    const { conversationId } = data;

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true)

            await axios.delete(`/api/conversations/${conversationId}`);

            handleClose();
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Supprimer Conversation
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Êtes-vous sûr de faire cela ? <br />
                        La conversation sera définitivement supprimée.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-grey-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button 
                            disabled={isLoading}
                            onClick={handleClose}
                            variant={'ghost'}
                        >Annuler</Button>


                        <Button
                            disabled={isLoading}
                            variant={'destructive'}
                            onClick={onClick}
                        >Valider</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}