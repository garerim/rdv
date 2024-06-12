import { prisma } from "@/lib/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        // const profile = await currentProfilePages(req);
        const {content, conversationId} = req.body;

        // if (!profile) {
        //     return res.status(401).json({ message: "Unauthorized" });
        // }
        if (!conversationId) {
            return res.status(401).json({ message: "Server ID Missing" });
        }
        if (!content) {
            return res.status(401).json({ message: "Content Missing" });
        }

        const message = await prisma.message.create({
            data: {
                text: content,
                conversationId: conversationId,
                userProfileId: "d075b56e-d3b6-4f80-b8ab-95c808093f11"
                
            }
        });

        const conversationKey = `chat:${conversationId
        }:messages`;

        res?.socket?.server?.io?.emit(conversationKey, message);

        return res.status(200).json(message);


    } catch (error) {
        console.log("[MESSAGES_POST]", error);
        return res.status(500).json({ message: "Internal Error" });
    }
    
}