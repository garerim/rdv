import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { useGlobale } from '../provider/globale-provider';
import { UserProfile } from '@prisma/client';

export type MessageItemProps = {
  message: {
    id: string;
    userProfileId: string;
    conversationId: string;
    text: string;
    isLiked: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: UserProfile;
  }
}

function convertDate(date: Date) {
  date = new Date(date);
  const today = new Date();

  const isToday = date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isYesterday = date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (isToday) {
    return `aujourd'hui à ${hours}:${minutes}`;
  } else if (isYesterday) {
    return `hier à ${hours}:${minutes}`;
  } else {
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}

export default function MessageItem({ message }: MessageItemProps ) {

  const userProfile = message.user;
  const { user } = useGlobale();

  if (!user) {
    return;
  }

  return (
    <div className={cn("relative group flex items-center p-4 transition max-w-[60%] min-w-[30%] border rounded-lg bg-secondary", user.id === userProfile.id ? "self-end" : "self-start")}>
      <div className={cn("group flex gap-x-2 items-start w-full", user.id === userProfile.id && "flex-row-reverse")}>
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <Avatar>
            <AvatarImage src={userProfile.avatar as string | undefined} alt="@shadcn" />
            <AvatarFallback>{userProfile.firstName.charAt(0).toUpperCase()}{userProfile.lastName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className={cn("flex flex-col w-full")}>
          <div className={cn("flex items-center gap-x-2", user.id === userProfile.id && "self-end flex-row-reverse")}>
            <div className="flex items-center">
              <Link className="font-semibold text-sm hover:underline cursor-pointer" href='/'>{userProfile.firstName} {userProfile.lastName}</Link>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{convertDate(message.createdAt)}</span>
          </div>
          <div className={cn(user.id === userProfile.id && "self-end")}>
            {message.text}
          </div>
        </div>
      </div>
    </div>
  )
}
