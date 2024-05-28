import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";


export default function Header() {


    return (
        <header className="fixed top-0 left-0 w-full flex items-center mb-2 py-2 px-2 z-50 m-2">
            <h2 className="text-2xl font-bold mr-auto">RendezVous</h2>

            <div className="ml-auto flex items-center gap-2">
                <Button>S'inscrire</Button>
                <Button>Se connecter</Button>
                <ThemeToggle />
            </div>
        </header>
    );
}