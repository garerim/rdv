"use client";

import React, { useEffect, useState } from 'react';
import { UserProfile } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
  

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatHour = (dateString: any) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function Page() {
  const [jwtToken, setJwtToken] = useState<string | null>();
  const [user, setUser] = useState<any>({} as UserProfile);
  const [rdvs, setRdvs] = useState<any[]>();
  const [medecins, setMedecins] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwtToken");
      setJwtToken(token);

      const userResponse = await fetch("/api/userByJWT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenBody: token }),
      });

      const userData = await userResponse.json();
      setUser(userData);

      const rdvResponse = await fetch(`/api/rdvByUser?id=${userData.id}`, {
        method: "GET",
      });

      const rdvData = await rdvResponse.json();
      setRdvs(rdvData);

      const medecinPromises = rdvData.map(async (rdv: any) => {
        const medecinName = await getDocNameById(rdv.professionelId);
        return { id: rdv.professionelId, name: medecinName };
      });

      const medecinsArray = await Promise.all(medecinPromises);
      const medecinsObject: { [key: string]: string } = {};
      medecinsArray.forEach(medecin => {
        medecinsObject[medecin.id] = medecin.name;
      });
      setMedecins(medecinsObject);
    };

    fetchData();
  }, []);

  const getDocNameById = async (id: string) => {
    try {
      const response = await fetch(`/api/findDocById?id=${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du document");
      }

      const data = await response.json();
      return data.firstName + " " + data.lastName;
    } catch (error) {
      console.error("Erreur:", error);
      return "Erreur";
    }
  };

  const LigneTableau = ({ rdv }: any) => {
    const medecinName = medecins[rdv.professionelId] || "Chargement...";

    return (
      <TableRow>
        <TableCell className="font-medium flex justify-center"><TooltipProvider><Tooltip delayDuration={100}>
            <TooltipTrigger><div className={`rounded-full w-4 h-4 ${rdv.etat === 'A_VENIR'? 'bg-orange-400': rdv.etat === 'PASSE' ? 'bg-green-600' : 'bg-red-600'}`}/></TooltipTrigger>
            <TooltipContent>{rdv.etat === 'A_VENIR'? 'A venir': rdv.etat === 'PASSE' ? 'Passé' : 'Annulé'}</TooltipContent>
            </Tooltip></TooltipProvider>
</TableCell>
        <TableCell>{formatDate(rdv.startDate)}</TableCell>
        <TableCell>{formatHour(rdv.startDate)}</TableCell>
        <TableCell>{rdv.duration} min</TableCell>
        <TableCell>Dr. {medecinName}</TableCell>
        <TableCell>{rdv.typeRendezVous}</TableCell>
        <TableCell>{rdv.prix} €</TableCell>
      </TableRow>
    );
  };

  return (
    <div className='pl-8 pr-8'>
        <div className='flex justify-end'>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Prendre Rendez-vous</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </div>
      <Table className='w-full'>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Statut</TableHead>
            <TableHead className='w-1/12'>Date</TableHead>
            <TableHead>Heure</TableHead>
            <TableHead>Durée</TableHead>
            <TableHead>Médecin</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Prix</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rdvs?.map((rdv) => (
            <LigneTableau key={rdv.id} rdv={rdv} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
