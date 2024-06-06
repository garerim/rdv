import { UserProfile } from "@prisma/client";


export default function PersonalInfo({ user }: { user: UserProfile | undefined }) {

    return (
        <div>
            <p>PersonalInfo</p>
        </div>
    )
}