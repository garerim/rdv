"use client";

import React, { useEffect, useState } from 'react';
import { prisma } from "@/lib/prisma";
import { UserProfile } from "@prisma/client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from '@/components/ui/label';
import { CarnetPatient } from '@/components/patient/carnetPatients';
import { Disconnected } from '@/components/disconnected/disconnected';

const VerticalBarMain = () => {
    return <div className="w-1 min-h-full bg-cyan-800 mr-4 text-cyan-800">.</div>;
};

const VerticalBarSecond = () => {
    return <div className="w-1 min-h-full bg-cyan-600 mr-4 ml-8 text-cyan-600">.</div>;
};


const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

export default function Page() {

    const [jwtToken, setJwtToken] = useState<string | null>();
    const [user, setUser] = useState<any>({} as UserProfile);
    const [suivis, setSuivis] = useState<any[]>();

    const AccordionCard = ({ itemNumber = "item-default", suivi }: any) => {
        return <AccordionItem value={itemNumber} className="hover:bg-accent">
            <AccordionTrigger className="hover:no-underline">
                <div className="flex">
                    <VerticalBarMain />
                    <div>
                        <div className=" ml-1 pl-3 text-left">{suivi.diagnostique}</div>
                        <div className="font-light text-xs ml-1 pl-3 text-left">{formatDate(suivi.createdAt)}</div>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex ">
                    <VerticalBarSecond />
                    <div>
                        <div className="text-lg font-bold text-left">Traitement :</div>
                        <div className="text-sm text-left">{suivi.traitement}</div>
                        <br />
                        <div className="font-light text-sm text-left">Dr. {getDocNameById(suivi.medecinProfileId)}</div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>;
    };

    useEffect(() => {
        const user = fetch("/api/userByJWT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tokenBody: localStorage.getItem("jwtToken") }),
        });

        user.then((res) => res.json()).then((data) => {
            setUser(data),
                console.log(data)
            const suivis = fetch(`/api/suivisByUser?id=${data.id}`, {
                method: "GET",
            });

            suivis.then((res) => res.json()).then((data) => setSuivis(data));
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
            return data.firstName + " " + data.lastName;
        } catch (error) {
            console.error("Erreur:", error);
            return "Erreur";
        }
    };

    const NoDataComponent = () => {
        return <div className='flex justify-center p-10'><Label>{"Aucun diagnostique n'a encore été enregistré"}</Label></div>
    }

    if (user.role === 'DOCTOR') {
        return (
            <>
                <div className='mx-2'>
                    <h1>Liste des patients</h1>
                    <CarnetPatient />
                </div>
            </>
        );
    }
    else if (user.role === 'USER') {
        return (
            <div className="mr-20 ml-20">
                <p className="text-3xl text-center font-extrabold">Diagnostiques et traitements</p>
                {suivis ? suivis.length > 0 ?
                    <Accordion type="single" collapsible>
                        {suivis.map((suivi) => (
                            <>
                                <AccordionCard key={suivi.id} itemNumber={suivi.id} suivi={suivi} />
                            </>
                        ))}
                    </Accordion>
                    : <NoDataComponent /> : <NoDataComponent />}
            </div>
        )
    }
    else {
        return (
            <Disconnected />
        )
    }
}
