import { LoaderCircle } from 'lucide-react';

export const Loader = () => {
    return (
        <div className="absolute z-50 w-full h-full flex flex-col items-center justify-center gap-10 bg-background">
            <LoaderCircle className='relatuve animate-spin' />
            <h1 className="relative text-text text-xl text-foreground">Chargement de la page...</h1>
        </div>
    );
}