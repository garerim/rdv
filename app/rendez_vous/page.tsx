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


const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

const formatHour = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function page() {

    const [jwtToken, setJwtToken] = useState<string | null>();
    const [user, setUser] = useState<any>({} as UserProfile);
    const [rdvs, setRdvs] = useState<any[]>();

    useEffect(() => {
        const user = fetch("/api/userByJWT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenBody: localStorage.getItem("jwtToken") }),
    });

    user.then((res) => res.json()).then((data) => {
        setUser(data)
        const rdvs = fetch(`/api/rdvByUser?id=${data.id}`, {
            method: "GET",
          });
      
          rdvs.then((res) => res.json()).then((data) => {
            setRdvs(data),
        console.log(data)});
    });
  }, [jwtToken]);

  const getDocNameById = async (id: string) => {
    try {
        const response = await fetch(`/api/findDocById?id=${id}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération du document");
        }

        const data = await response.json();
        console.log(data.firstName)
        return data.firstName + " " + data.lastName;
    } catch (error) {
        console.error("Erreur:", error);
        return "Erreur";
    }
};

const LigneTableau = ({rdv}:any) => {
    console.log("call")
    return <TableRow>
        <TableCell className="font-medium">{rdv.etat}</TableCell>
        <TableCell>{formatDate(rdv.startDate)}</TableCell>
        <TableCell>{formatHour(rdv.startDate)}</TableCell>
        <TableCell>{rdv.duration}</TableCell>
        <TableCell>{getDocNameById(rdv.professionelId)}</TableCell>
        <TableCell>{rdv.typeRendezVous}</TableCell>
        <TableCell>{rdv.prix}</TableCell>
    </TableRow>;
};

  return (
    <div>
        <Table className='ml-4 mr-4 w-'>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Heure</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Médecin</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Prix</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rdvs?.map((rdv) => (
                <>
                    <LigneTableau rdv={rdv}/>
                </>
            ))}
            </TableBody>
        </Table>

    </div>
  )
}
