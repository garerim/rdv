"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Stripe from "stripe";
import Devis from "../../components/checkout/devis";
import RendezVous from "../../components/checkout/rendezvous";
import {
  EtatRendezVous,
  TypeRendezVous,
} from "../../components/checkout/rendezvous";
import { Loader } from "@/components/loader/Loader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatHour = (dateString: any) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ParamExample() {
  const searchParams = useSearchParams();
  const session_id = searchParams?.get("session_id");
  const [devis, setDevis] = useState<Devis>();
  const [rendezVous, setRendezVous] = useState<RendezVous>();
  const [isCreated, setCreated] = useState<boolean>(false);

  useEffect(() => {
    if (session_id) {
      const fetchSession = async () => {
        try {
          const session = await stripe.checkout.sessions.retrieve(session_id);
          if (session.metadata) {
            const {
              id,
              professionelId,
              patientId,
              rendezVousId,
              prixAvantTVA,
              TVA,
              prixFinal,
              contenu,
              description,
              startDate,
              duration,
              etat,
              typeRendezVous,
              prix,
              fichierJoint,
            } = session.metadata;

            const fetchedDevis = new Devis({
              id,
              professionelId,
              patientId,
              rendezVousId,
              prixAvantTVA: parseFloat(prixAvantTVA),
              TVA: parseFloat(TVA),
              prixFinal: parseFloat(prixFinal),
              contenu,
              description,
            });

            const fetchedRendezVous = new RendezVous({
              id,
              professionelId,
              patientId,
              startDate: new Date(startDate),
              duration: parseFloat(duration),
              etat: etat as unknown as EtatRendezVous,
              typeRendezVous: typeRendezVous as unknown as TypeRendezVous,
              description,
              prix: parseFloat(prix),
              fichierJoint,
            });

            setRendezVous(fetchedRendezVous);
            setDevis(fetchedDevis);
            setCreated(true);
          } else {
            console.error("Session metadata is missing");
          }
        } catch (error) {
          console.error("Error fetching session:", error);
        }
      };

      fetchSession();
    }
  }, [session_id]);

  useEffect(() => {
    if (isCreated) {
      createRdv();
      setCreated(false);
    }
  }, [rendezVous]);

  const createRdv = async () => {
    const response = await fetch("/api/manageRdv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: rendezVous?.id,
        professionelId: rendezVous?.professionelId,
        patientId: rendezVous?.patientId,
        startDate: rendezVous?.startDate,
        duration: rendezVous?.duration,
        typeRendezVous: rendezVous?.typeRendezVous,
        description: rendezVous?.description,
        prix: rendezVous?.prix,
      }),
    });

    if (response.ok) {
      await fetch("/api/send-email/sendrdvconfirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          professionelId: rendezVous?.professionelId,
          patientId: rendezVous?.patientId,
          startDate: rendezVous?.startDate,
          duration: rendezVous?.duration,
          typeRendezVous: rendezVous?.typeRendezVous,
          description: rendezVous?.description,
          prix: rendezVous?.prix,
        }),
      });
      console.log("Rendez-vous créé avec succès");
    } else if (response.status === 400) {
    } else {
      const errorData = await response.json();
      console.log(
        errorData.error || "Erreur lors de la création du rendez-vous"
      );
    }
  };

  if (!devis || !rendezVous) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-600">
          Rendez-vous créé avec succès
        </h1>
        <p className="text-gray-700 mb-6">
          Votre rendez-vous prévu le {formatDate(rendezVous.startDate)} à{" "}
          {formatHour(rendezVous.startDate)} est confirmé.
        </p>
        <Button
          onClick={() => (window.location.href = "/rendez_vous")}
          variant={"default"}
        >
          {"J'ai compris"}
        </Button>
      </Card>
    </div>
  );
};