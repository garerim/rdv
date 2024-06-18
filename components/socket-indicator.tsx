"use client";

import { useSocket } from "@/components/provider/socket-provider";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge variant='outline' className="bg-yellow-600 text-white border-none ml-auto">
                Fallback: Polling every 1s
            </Badge>
        )
    }

    return (
        <Badge variant='outline' className="bg-emerald-600 text-white border-none ml-auto">
            Live: Real-time updates
        </Badge>
    )
} 