import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message, UserProfile } from '@prisma/client';

type ConversationItemProps = {
    conversation: {
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
}

export default function ConversationItem({ conversation }: ConversationItemProps) {

    const { name, membreCreateur, membreSuiveur } = conversation;
    const AmImembreCreateur = membreCreateur.id === "d075b56e-d3b6-4f80-b8ab-95c808093f11"
    const membreShow = AmImembreCreateur ? membreSuiveur : membreCreateur

    return (
        <div className=' mx-2 flex items-center gap-2 rounded-full hover:bg-secondary p-2 cursor-pointer transition-all'>
            <Avatar>
                <AvatarImage src={membreShow.avatar as string | undefined} alt="@shadcn" />
                <AvatarFallback>{membreShow.firstName.charAt(0).toUpperCase()}{membreShow.lastName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p>{name}</p>
            {/* {JSON.stringify(conversation)} */}
        </div>
    )
}
