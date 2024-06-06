import { UserProfile } from "@prisma/client";


export default function AccountSettings({ user }: { user: UserProfile | undefined }) {

    return (
        <div>
            <p>AccountSettings</p>
        </div>
    )
}