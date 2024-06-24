'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {

  return (
    <div className="flex items-center justify-center h-screen mt-[-100px]">
      <Card className="p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Bienvenue sur notre plateforme de gestion médicale</h1>
        <p className="text-gray-700 mb-6">Prenez vos rendez-vous en ligne et gérez facilement vos consultations médicales.</p>
        <Button onClick={() => window.location.href = '/login'} variant={"default"}>Connectez-vous</Button>
      </Card>
    </div>
  );
}
