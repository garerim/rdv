"use client";

import React, { useEffect, useState } from 'react';
import { UserProfile } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
} from "@/components/ui/alert-dialog"
import CheckoutButton from "@/components/checkout/index";
import { useRouter } from 'next/navigation';
import { Amarante } from 'next/font/google';

const rdvTypes = [
  {
    value: "CONSULTATION",
    label: "Consultation",
  },
  {
    value: "EXAMEN",
    label: "Examen",
  },
  {
    value: "AUTRE",
    label: "Autre",
  },
]

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

enum prices{
  CONSULTATION = 25,
  EXAMEN = 50,
  AUTRE = 25
}

export default function Page() {
  // Variables globales de la page
  const [jwtToken, setJwtToken] = useState<string | null>();
  const [user, setUser] = useState<any>({} as UserProfile);
  const [rdvs, setRdvs] = useState<any[]>();
  const [medecins, setMedecins] = useState<{ [key: string]: string }>({});
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [rdvStep, setRdvStep] = useState<number>(0); // Initialisez rdvStep à 0
  const [allMedecins, setAllMedecins] = useState<any[]>();
  const [allFreeRdvs, setAllFreeRdvs] = useState<string[]>();

  // Utilisé par les DropDown
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  // Utilisé par le Dialog
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  
  // Infos pour la résa d'un rdv
  const [selectedRdv, setSelectedRdv] = useState<any>();
  const [selectedDoc, setSelectedDoc] = useState<any>();
  const [selectedType, setSelectedType] = useState<any>();
  const [selectedDescription, setSelectedDescription] = useState<string>("");


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

      getAllDocs()
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

  const getAllRdvByUser = async () => {
    try{
      const rdvResponse = await fetch(`/api/rdvByUser?id=${user.id}`, {
        method: "GET",
      });

      const rdvData = await rdvResponse.json();
      setRdvs(rdvData);
    } catch (error) {
    console.error("Erreur:", error);
    return "Erreur";
  }
  }

  const getAllDocs = async () => {
    try {
      const response = await fetch(`/api/getAllDoc`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des médecins");
      }

      const data = await response.json();
      setAllMedecins(data);
    } catch (error) {
      console.error("Erreur:", error);
      return "Erreur";
    }
  };

  const getAllDispoByDayAndDoctor = async (medecin: any, day: Date) => {
    try {
      const response = await fetch(`/api/getAllDispoByDayAndDoctor?id=${medecin.id}&day=${day.toISOString()}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des disponibilités");
      }

      const data = await response.json();
      setAllFreeRdvs(data);
    } catch (error) {
      console.error("Erreur:", error);
      return "Erreur";
    }
  };

  const LigneTableauListRDV = ({ rdv }: any) => {
    const medecinName = fullNameOf(allMedecins?.find((medecin) => medecin.id === rdv.professionelId)) || "Chargement...";

    return (
      <TableRow>
        <TableCell className="font-medium flex justify-center">
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <div className={`rounded-full w-4 h-4 ${rdv.etat === 'A_VENIR' ? 'bg-orange-400' : rdv.etat === 'PASSE' ? 'bg-green-600' : 'bg-red-600'}`} />
              </TooltipTrigger>
              <TooltipContent>{rdv.etat === 'A_VENIR' ? 'A venir' : rdv.etat === 'PASSE' ? 'Passé' : 'Annulé'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell>{formatDate(rdv.startDate)}</TableCell>
        <TableCell>{formatHour(rdv.startDate)}</TableCell>
        <TableCell>{rdv.duration} min</TableCell>
        <TableCell>{medecinName}</TableCell>
        <TableCell>{rdv.typeRendezVous}</TableCell>
        <TableCell>{rdv.prix} €</TableCell>
      </TableRow>
    );
  };

  const LigneTableauCrenauxHoraires = ({ date }: any) => {
    return (
      <TableRow onClick={(e:any) => {bookAppointment(date)}} className='cursor-pointer'>
        <TableCell>{formatDate(new Date(date))}</TableCell>
        <TableCell>{formatHour(new Date(date))}</TableCell>
        <TableCell>30 min</TableCell>
      </TableRow>
    );
  };

  const incrementRdvStep = () => {
    setRdvStep(rdvStep + 1);
    rdvStep+1 === 4 && setDialogOpen(false)
  };

  const decrementRdvStep = () => {
    setRdvStep(rdvStep - 1)
    rdvStep-1 === 0 && setDialogOpen(false)
  }

  useEffect(() => {
    if (rdvStep === 1) {
      getAllDocs();
    }
  }, [rdvStep]);

  useEffect(() => {
    if (rdvStep === 2 && value && date) {
      const selectedMedecin = allMedecins!.find((medecin) => medecin.id === value);
      getAllDispoByDayAndDoctor(selectedMedecin, date);
    }
  }, [rdvStep, value, date]);

  const fullNameById = (id: any) => {
    return fullNameOf(allMedecins?.find((medecin) => medecin.id === id))
  }

  const fullNameOf = (medecin: any) => {
    return medecin !== undefined ? `Dr. ${medecin.firstName} ${medecin.lastName}`: "null" ;
  };

  const bookAppointment = (date: any) => {
    {rdvStep === 2 &&
    setSelectedDoc(value)
    setValue("")
    setSelectedRdv(date)
    incrementRdvStep()}
  }

  const resetBooking = () => {
    setRdvStep(1)
    setSelectedDescription("")
    setSelectedDoc("")
    setSelectedRdv("")
    setSelectedType("")
  }

  const createRdv = async () => {
    const response = await fetch('/api/createNewRdv', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        professionelId: selectedDoc,
        patientId: user.id,
        startDate: selectedRdv,
        duration: 30,
        typeRendezVous: value,
        description: selectedDescription,
        prix: 25,
      }),
    });
  
    if (response.ok) {
      console.log('Rendez-vous créé avec succès');
      incrementRdvStep()
      resetBooking()
      getAllRdvByUser()
    } else {
      const errorData = await response.json();
      console.log(errorData.error || 'Erreur lors de la création du rendez-vous');
  }
  }

  return (
    <div className='pl-8 pr-8'>
      <div className='flex justify-end p-4'>
        <div className='w-1/6'></div>
        <h2 className="text-3xl text-center font-extrabold w-full">Rendez-vous</h2>
        <div className='w-1/6 flex justify-end'>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={resetBooking}>Prendre Rendez-vous</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[600px]">
              <DialogHeader>
                <DialogTitle>Prendre rendez-vous</DialogTitle>
                <DialogDescription>
                  {rdvStep === 1 ? "Sélectionnez une date afin de prendre un rendez-vous.":
                  rdvStep === 2 ? "Sélectionnez un médecin et un créneau libre.":
                  "Sélectionnez le type de rendez-vous souhaité, et expliquer la raison de ce rendez-vous."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 justify-center">
                {rdvStep === 1 ? (
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                  
                ) : rdvStep === 2 ? 
                  <>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-60 justify-between"
                        >
                          {value
                            ? fullNameOf(allMedecins!.find((medecin) => medecin.id === value))
                            : "Sélectionner un médecin"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60 p-0">
                        <Command>
                          <CommandList>
                            <CommandEmpty>Aucun médecin trouvé.</CommandEmpty>
                            <CommandGroup>
                              {allMedecins!.map((medecin) => (
                                <CommandItem
                                  key={medecin.id}
                                  value={medecin.id}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                  }}
                                >
                                  {fullNameOf(medecin)}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Separator className='my-4'></Separator>
                    <div className="overflow-y-scroll max-h-60 w-full">
                      <Table className="w-full mt-2">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Heure</TableHead>
                            <TableHead>Durée</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {allFreeRdvs?.map((rdv) => (
                            <LigneTableauCrenauxHoraires key={rdv} date={rdv} />
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                 : rdvStep === 3 &&
                  <>
                  <div className='flex gap-4 justify-center'><p>{formatDate(selectedRdv)}</p><Separator orientation='vertical'/><p>{formatHour(selectedRdv)}</p><Separator orientation='vertical'/><p>30 min</p></div>
                  <Separator className='my-4'></Separator>
                  <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[350px] justify-between"
                        >
                          {value
                            ? rdvTypes.find((type) => type.value === value)?.label
                            : "Sélectionner un type de rendez-vous..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {rdvTypes.map((type) => (
                                <CommandItem
                                  key={type.value}
                                  value={type.value}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                  }}
                                >
                                  {type.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Separator className='my-4'></Separator>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Description</Label>
                      <Textarea placeholder="Pourquoi souhaitez-vous un rendez-vous ?" value={selectedDescription} onChange={(e:any) => {setSelectedDescription(e.target.value)}}/>
                    </div>
                  </>
                }
              </div>
              <DialogFooter>
                <div className='flex w-full'>
                  <div className='w-1/2 flex justify-start'><Button onClick={decrementRdvStep} variant="outline">{rdvStep === 1 ? "Annuler":"Retour"}</Button></div>
                  <div className='w-1/2 flex justify-end'>
                  {rdvStep === 3 ? 
                    <AlertDialog >
                      <AlertDialogTrigger asChild><Button variant="outline">Valider</Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmer la réservation ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            <div>Une fois validée, cette réservation vous sera facturée, voici un récapitulatif :</div>
                            <div className='flex gap-4 justify-center'>
                              <p>{formatDate(selectedRdv)}</p>
                              <Separator orientation='vertical'/>
                              <p>{formatHour(selectedRdv)}</p>
                              <Separator orientation='vertical'/>
                              <p>30 min</p>
                            </div>
                            <Separator/>
                            <div className='flex justify-between p-4'><div>{fullNameById(selectedDoc)}</div><Separator orientation='vertical'/><div>{value}</div></div>
                            <Separator/>
                            <div className='m-4'>{selectedDescription}</div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          {/*<AlertDialogAction onClick={createRdv}>Continue</AlertDialogAction>*/}
                          <CheckoutButton
                            amount={prices[value]}
                            description={selectedDescription}
                            doc={selectedDoc}
                            selectedTime={selectedRdv}
                            type={selectedType}
                          />
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    : rdvStep === 2 ? <Button disabled>Suivant</Button>:<Button onClick={incrementRdvStep} variant="outline">{rdvStep === 1 ? "Suivant" : "Valider"}</Button>}
                    </div>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Statut</TableHead>
            <TableHead className="w-1/12">Date</TableHead>
            <TableHead>Heure</TableHead>
            <TableHead>Durée</TableHead>
            <TableHead>Médecin</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Prix</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/*{rdvs?.map((rdv) => (
            <LigneTableauListRDV key={rdv.id} rdv={rdv} />
          ))}*/}
        </TableBody>
      </Table>
    </div>
  );
}

