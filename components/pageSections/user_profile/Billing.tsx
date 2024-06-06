import { UserProfile } from "@prisma/client";


export default function Billing({ user }: { user: UserProfile | undefined }) {

    return (
        <div>
            <p>Billing</p>
        </div>
    )
}