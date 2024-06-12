import { UserProfile } from "@prisma/client";


export default async function Billing({ user }: { user: UserProfile | undefined }) {

    return (
        <div>
            <p>Billing</p>
        </div>
    )
}