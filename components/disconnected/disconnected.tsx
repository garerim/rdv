import { CircleX } from 'lucide-react';

export const Disconnected = () => {
    return (
        <div className="absolute z--50 w-full h-full mt-[-100px] flex flex-col items-center justify-center gap-10">
            <CircleX/>
            <h1 className="relative text-text text-xl text-foreground">{"Vous n'êtes pas connecté"}</h1>
        </div>
    );
}