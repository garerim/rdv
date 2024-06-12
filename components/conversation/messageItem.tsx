import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import Link from 'next/link'

type MessageItemProps = {
  message: {
    id: string;
    userProfileId: string;
    conversationId: string;
    text: string;
    isLiked: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}
function convertDate(date: Date) {
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

export default async function MessageItem({ message }: MessageItemProps) {

  const user = await prisma.userProfile.findUnique({
    where: {
      id: message.userProfileId
    }
  })

  return (
    <div className={cn("relative group flex items-center p-4 transition max-w-[60%] min-w-[30%] border rounded-lg bg-secondary", user?.id === message.userProfileId && "self-end")}>
      <div className={cn("group flex gap-x-2 items-start w-full", user?.id === message.userProfileId && "flex-row-reverse")}>
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <Avatar>
            <AvatarImage src={user?.avatar as string | undefined} alt="@shadcn" />
            <AvatarFallback>{user?.firstName.charAt(0).toUpperCase()}{user?.lastName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className={cn("flex flex-col w-full")}>
          <div className={cn("flex items-center gap-x-2", user?.id === message.userProfileId && "self-end flex-row-reverse")}>
            <div className="flex items-center">
              <Link className="font-semibold text-sm hover:underline cursor-pointer" href='/'>{user?.firstName} {user?.lastName}</Link>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{convertDate(message.createdAt)}</span>
          </div>
          <div className={cn(user?.id === message.userProfileId && "self-end")}>
            {message.text}
          </div>
        </div>
      </div>
    </div>
  )
}
