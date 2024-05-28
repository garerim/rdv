// 'use client'

import { initialProfile } from "@/lib/initial-profile";

export default async function Home() {
  const user = await initialProfile()

  return (
    <div className="absolute top-[5vh] w-full">
        {user && JSON.stringify(user)}
    </div>
  );
}
