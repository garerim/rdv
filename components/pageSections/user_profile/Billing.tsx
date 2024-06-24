"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { UserProfile, carteFactu } from "@prisma/client";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverClose } from "@radix-ui/react-popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export default function Billing({ user }: { user: UserProfile | undefined }) {
  const [cards, setCards] = useState<carteFactu[]>([]);
  const [cardTemp, setCardTemp] = useState<carteFactu>({
    nomCarte: "",
  } as carteFactu);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch(`/api/users/billing?userId=${user?.id}`);
      const data = await response.json();
      setCards(data);
    };
    fetchCards();
  }, [user?.id]);

  const createCard = async () => {
    const response = await fetch(`/api/users/billing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userProfileId: user?.id,
        nomCarte: cardTemp.nomCarte,
        numeroCarteQuatreDerniersChiffres: cardTemp.numeroCarte.slice(-4),
        numeroCarte: cardTemp.numeroCarte,
        dateExpiration: cardTemp.dateExpiration,
        cvv: cardTemp.cvv,
      }),
    });
    const data = await response.json();
    if (!data.error) {
      setCards([...cards, data]);
      setCardTemp({} as carteFactu);
    }
    console.log(data);
  };

  const deleteCard = async (cardId: string) => {
    const response = await fetch(`/api/users/billing?id=${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!data.error) {
      setCards(cards.filter((card) => card.id !== cardId));
    }
    console.log(data);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="fixed bottom-5 right-10">Ajouter une carte</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mx-5 mb-2">
          <div className="flex flex-col gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Nom</Label>
              <Input
                type="text"
                placeholder="Nom de la carte"
                className="input"
                onChange={(e) =>
                  setCardTemp({ ...cardTemp, nomCarte: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Numéro</Label>
              <Input
                type="text"
                placeholder="1234-1234-1234-1234"
                className="input"
                onChange={(e) => {
                  setCardTemp({ ...cardTemp, numeroCarte: e.target.value });
                }}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>{"Date d'expiration"}</Label>
              <Input
                type="text"
                placeholder="xx/24"
                className="input"
                onChange={(e) =>
                  setCardTemp({ ...cardTemp, dateExpiration: e.target.value })
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>CVV</Label>
              <Input
                type="text"
                placeholder="123"
                className="input"
                onChange={(e) =>
                  setCardTemp({ ...cardTemp, cvv: e.target.value })
                }
              />
            </div>
            <PopoverClose asChild>
              <Button onClick={createCard}>Ajouter la carte</Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex flex-col w-full gap-10 items-center">
        <Label className="w-full text-3xl">Cartes disponibles</Label>
        <Separator className="w-[90%]" />
        <div className="flex gap-10 flex-wrap justify-center">
          {cards.length !== 0 ? (
            cards.map((card) => (
              <>
                <Card key={card.id} className="px-10 pb-5">
                  <CardHeader>
                    <p>
                      {card.nomCarte === ""
                        ? "Carte numéro " +
                          (cards.findIndex((value) => card === value) + 1)
                        : card.nomCarte}
                    </p>
                  </CardHeader>
                  <Separator className="mb-4" />
                  <div className="flex gap-5 justify-center items-center">
                    <CreditCard size={80} />
                    <div className="flex flex-col justify-center items-center gap-3">
                      <p>
                        xxxx-xxxx-xxxx-{card.numeroCarteQuatreDerniersChiffres}
                      </p>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant={"destructive"}
                          >
                            Supprimer la carte
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Etes-vous sûr de vouloir supprimer cette carte ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {
                                'Cette action est irréversible.' + 
                                'Cliquez sur "Continuer" pour confirmer.'
                              }
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteCard(card.id)}>Continuer</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              </>
            ))
          ) : (
            <Label className="w-full">
              {"Vous n'avez pas encore enregistré de moyen de paiement."}
            </Label>
          )}
        </div>
      </div>
    </div>
  );
}
