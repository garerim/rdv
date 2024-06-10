import { UserProfile } from "@prisma/client";


export default function PersonalInfo({ user }: { user: UserProfile | undefined }) {

    return (
        <div>
            <h1>Informations personnelles</h1>
        </div>
    )
}