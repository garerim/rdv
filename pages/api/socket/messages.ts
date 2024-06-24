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
        const {content, conversationId, userProfileId} = req.body;

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
                userProfileId: userProfileId
            }
        });

        const conversationKey = `chat:${conversationId}:messages`;

        const user = await prisma.userProfile.findUnique({
            where: {
                id: userProfileId
            }
        });

        const messageWithUser = {
            ...message,
            user: user
        }

        res?.socket?.server?.io?.emit(conversationKey, messageWithUser);

        return res.status(200).json(message);


    } catch (error) {
        console.log("[MESSAGES_POST]", error);
        return res.status(500).json({ message: "Internal Error" });
    }
    
}