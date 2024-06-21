import { useSocket } from "@/components/provider/socket-provider";
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from "react";
import { Message } from "@prisma/client";

type ChatSocketProps = {
    addKey: string;
    queryKey: string;
}

export const useChatSocket = ({
    addKey,
    queryKey
}: ChatSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on(addKey, (message: Message) => {
            
            return message;
            
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [{
                            items: [message]
                        }]
                    }
                }
                

                const newData = [...oldData.pages]

                newData[0] = {
                    ...newData[0],
                    items: [
                        message,
                        ...newData[0].items
                    ]
                }

                return {
                    ...oldData,
                    pages: newData
                };
            });
        });

        return () => {
            socket.off(addKey)
        }
    }, [queryClient, addKey, queryKey, socket])

}