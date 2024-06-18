import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { conversationId: string } }
) {
    try {
        if (!params.conversationId) {
            return new NextResponse("Conversation Id Missing", { status: 400 });
        }

        const deleteConversation = await prisma.conversation.delete({
            where: {
                id: params.conversationId,
            },
        })

        return NextResponse.json(deleteConversation);

    } catch (error) {
        console.log("[CONVERSATION_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function PATCH(
    req: Request,
    { params }: { params: { conversationId: string } }
) {
    try {
        const { name } = await req.json();

        // if (!params.conversationId) {
        //     return new NextResponse("Conversation Id Missing", { status: 400 });
        // }

        // if (!name) {
        //     return new NextResponse("Name cannot be null", { status: 400 });
        // }

        const conversation = await prisma.conversation.update({
            where: {
                id: params.conversationId,
            },
            data: {
                name
            }
        });

        return NextResponse.json(conversation);
        // return NextResponse.json("conversation");

    } catch (error) {
        console.log("[CONVERSATION_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

