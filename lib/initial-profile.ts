import { currentUser } from '@clerk/nextjs/server';

import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: {
      id: user.id
    }
  });

  if (userProfile) {
    return userProfile;
  }

//   const newProfile = await prisma.userProfile.create({
//     data: {
//       id: user.id,
//       firstName: `${user.firstName}`,
//       lastName: `${user.lastName}`,
//       avatar: user.imageUrl,
//       email: user.emailAddresses[0].emailAddress

//     }
//   });

//   return newProfile;
};