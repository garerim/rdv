"use client";

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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/loader/Loader";
import { Disconnected } from "@/components/disconnected/disconnected";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserProfile } from "@prisma/client";
import { fr } from "date-fns/locale";
import CheckoutButton from "@/components/checkout/index";
import { useRouter } from 'next/navigation';
import { Amarante } from 'next/font/google';
import { ChevronsUpDown, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

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
];

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

enum prices{
  CONSULTATION = 25,
  EXAMEN = 50,
  AUTRE = 25
}

export default function Page() {
  ///////////////////////////////////////////////////////////////////
  // Variables globales de la page

  // Informations utilisateur connecté
  const [jwtToken, setJwtToken] = useState<string | null>();
  const [user, setUser] = useState<any>({} as UserProfile);
  const [rdvs, setRdvs] = useState<any[]>();

  // Utilisé pour le chargement de la page
  const [loading, setLoading] = useState<boolean>(true);

  // Utilisé par les DropDown
  const [open, setOpen] = useState<boolean>(false);

  // Utilisé par le Dialog
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Infos globales pour médecin
  const [allUsers, setAllUsers] = useState<any[]>();
  const [selectedTabs, setSelectedTabs] = useState<number>(1);
  const [filteredRdvs, setFilteredRdvs] = useState<any[]>();

  // Infos globales pour utilisateur
  const [deletedRdvs, setDeletedRdvs] = useState<any[]>();

  // Infos globales pour réservation d'un nouveau rdv par un utilisateur
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [rdvStep, setRdvStep] = useState<number>(0); // Initialisez rdvStep à 0
  const [allMedecins, setAllMedecins] = useState<any[]>();
  const [allFreeRdvs, setAllFreeRdvs] = useState<string[]>();

  // Infos pour la résa d'un rdv
  const [selectedRdv, setSelectedRdv] = useState<any>();
  const [selectedDoc, setSelectedDoc] = useState<any>();
  const [selectedType, setSelectedType] = useState<any>();
  const [selectedDescription, setSelectedDescription] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  ///////////////////////////////////////////////////////////////////


  // Executuion dès le lancement de la page
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

      fetchRdvs(userData.id, userData.role);

      if (userData.role === "USER") {
        getAllDocs();
      } else if (userData.role === "DOCTOR") {
        fetchUsersByDoctor(userData.id);
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRdvs(user.id, user.role), console.log(selectedTabs);
  }, [selectedTabs]);

  const fetchRdvs = async (userId: string, userRole: string) => {
    try {
      const rdvResponse = await fetch(`/api/rdvByUser?id=${userId}`, {
        method: "GET",
      });

      var rdvData = await rdvResponse.json();
      setRdvs(rdvData);
      if (selectedTabs === 2) {
        setFilteredRdvs(
          rdvData.filter(
            (rdv: { startDate: any }) =>
              formatDate(rdv.startDate) === formatDate(Date.now())
          )
        );
      } else if (selectedTabs === 3) {
        setFilteredRdvs(
          rdvData.filter((rdv: { etat: any }) => rdv.etat === "A_VENIR")
        );
      } else if (selectedTabs === 4) {
        setFilteredRdvs(
          rdvData.filter((rdv: { etat: any }) => rdv.etat === "PASSE")
        );
      } else if (selectedTabs === 5) {
        setFilteredRdvs(
          rdvData.filter((rdv: { etat: any }) => rdv.etat === "ANNULE")
        );
      } else if (userRole === "USER") {
        setFilteredRdvs(
          rdvData.filter((rdv: { etat: any }) => rdv.etat !== "ANNULE")
        );
      } else {
        setFilteredRdvs(rdvData);
      }
      setDeletedRdvs(
        rdvData.filter((rdv: { etat: any }) => rdv.etat === "ANNULE")
      );
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const fetchUsersByDoctor = async (doctorId: string) => {
    try {
      const response = await fetch(`/api/getUsersByDoc?id=${doctorId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }

      const users = await response.json();
      setAllUsers(users);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Fonction pour récupérer un utilisateur spécifique par son ID dans une liste donnée
  const getUserById = (userId: string) => {
    return allUsers?.find((user) => user.id === userId);
  };

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
      const response = await fetch(
        `/api/getAllDispoByDayAndDoctor?id=${
          medecin.id
        }&day=${day.toISOString()}`,
        {
          method: "GET",
        }
      );

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

  const LigneTableauListRDVUser = ({ rdv }: any) => {
    const medecinName =
      fullNameOf(
        allMedecins?.find((medecin) => medecin.id === rdv.professionelId)
      ) || "Chargement...";

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <TableRow className="cursor-pointer">
            <TableCell className="font-medium h-[100%]">
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <div
                      className={`rounded-full w-4 h-4 ml-3 ${
                        rdv.etat === "A_VENIR"
                          ? "bg-orange-400"
                          : rdv.etat === "PASSE"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {rdv.etat === "A_VENIR"
                      ? "A venir"
                      : rdv.etat === "PASSE"
                      ? "Passé"
                      : "Annulé"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>{formatDate(rdv.startDate)}</TableCell>
            <TableCell>{formatHour(rdv.startDate)}</TableCell>
            <TableCell>{rdv.duration} min</TableCell>
            <TableCell>{medecinName}</TableCell>
            <TableCell>{rdv.description}</TableCell>
            <TableCell>{rdv.typeRendezVous}</TableCell>
            <TableCell>{rdv.prix} €</TableCell>
          </TableRow>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuItem onClick={(e: any) => cancelAppointment(rdv)}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Annuler</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  };

  const LigneTableauListRDVDocteur = ({ rdv }: any) => {
    const userName = fullNameOf(getUserById(rdv.patientId)) || "Chargement...";

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <TableRow className="cursor-pointer">
            <TableCell className="font-medium flex justify-center items-center h-full">
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <div
                      className={`rounded-full w-4 h-4 ml-3 ${
                        rdv.etat === "A_VENIR"
                          ? "bg-orange-400"
                          : rdv.etat === "PASSE"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {rdv.etat === "A_VENIR"
                      ? "A venir"
                      : rdv.etat === "PASSE"
                      ? "Passé"
                      : "Annulé"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>{userName}</TableCell>
            <TableCell>{formatDate(rdv.startDate)}</TableCell>
            <TableCell>{formatHour(rdv.startDate)}</TableCell>
            <TableCell>{rdv.duration} min</TableCell>
            <TableCell>{rdv.description}</TableCell>
            <TableCell>{rdv.typeRendezVous}</TableCell>
          </TableRow>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={(e: any) => cancelAppointment(rdv)}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Annuler</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  };

  const LigneTableauCrenauxHoraires = ({ date }: any) => {
    return (
      <TableRow
        onClick={(e: any) => {
          bookAppointment(date);
        }}
        className="cursor-pointer"
      >
        <TableCell>{formatDate(new Date(date))}</TableCell>
        <TableCell>{formatHour(new Date(date))}</TableCell>
        <TableCell>30 min</TableCell>
      </TableRow>
    );
  };

  const incrementRdvStep = () => {
    setRdvStep(rdvStep + 1);
    rdvStep + 1 === 4 && setDialogOpen(false);
  };

  const decrementRdvStep = () => {
    setRdvStep(rdvStep - 1);
    rdvStep - 1 === 0 && setDialogOpen(false);
  };

  useEffect(() => {
    if (rdvStep === 1) {
      getAllDocs();
    }
  }, [rdvStep]);

  useEffect(() => {
    if (rdvStep === 2 && selectedDoc && date) {
      const selectedMedecin = allMedecins!.find(
        (medecin) => medecin.id === selectedDoc
      );
      getAllDispoByDayAndDoctor(selectedMedecin, date);
    }
  }, [rdvStep, selectedDoc, date]);

  const fullNameOf = (user: any) => {
    if (user === undefined) {
      return undefined;
    }
    if (user.role === "DOCTOR") {
      return `Dr. ${user.firstName} ${user.lastName}`;
    } else {
      return `${user.firstName} ${user.lastName}`;
    }
  };

  const bookAppointment = (date: any) => {
    {
      rdvStep === 2 && selectedDoc
        ? (setSelectedRdv(date), setError(false), incrementRdvStep())
        : setError(true);
    }
  };

  const resetBooking = () => {
    setRdvStep(1);
    setError(false);
    setSelectedDescription("");
    setSelectedDoc(undefined);
    setSelectedRdv(undefined);
    setSelectedType(undefined);
    setAllFreeRdvs(undefined);
  };

  const cancelAppointment = (rdv: any) => {
    if (user.role === "USER") {
      deleteRdv(rdv.id);
    } else if (user.role === "DOCTOR") {
      console.log("annulation");
      cancelRdv(rdv);
    }
  };

  const createRdv = async () => {
    const response = await fetch("/api/manageRdv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        professionelId: selectedDoc,
        patientId: user.id,
        startDate: selectedRdv,
        duration: 30,
        typeRendezVous: selectedType,
        description: "rendez vous",
        prix: 25,
      }),
    });

    await fetch("/api/send-email/sendrdvconfirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        professionelId: selectedDoc,
        patientId: user.id,
        startDate: selectedRdv,
        duration: 30,
        typeRendezVous: selectedType,
        description: "rendez vous",
        prix: 25,
      }),
    });

    if (response.ok) {
      console.log("Rendez-vous créé avec succès");
      incrementRdvStep();
      resetBooking();
      fetchRdvs(user.id, user.role);
    } else {
      const errorData = await response.json();
      console.log(
        errorData.error || "Erreur lors de la création du rendez-vous"
      );
    }
  };

  const deleteRdv = async (rdvId: any) => {
    const response = await fetch(`/api/manageRdv?rdvId=${rdvId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Rendez-vous supprimé avec succès");
      fetchRdvs(user.id, user.role);
    } else {
      const errorData = await response.json();
      console.log(
        errorData.error || "Erreur lors de la suppression du rendez-vous"
      );
    }
  };

  const cancelRdv = async (rdv: any) => {
    console.log(rdv.id);
    const response = await fetch(`/api/manageRdv?rdvId=${rdv.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        professionelId: rdv.professionelId,
        patientId: rdv.patientId,
        startDate: rdv.startDate,
        duration: rdv.duration,
        etat: "ANNULE",
        typeRendezVous: rdv.typeRendezVous,
        description: rdv.description,
        prix: rdv.prix,
        fichierJoint: rdv.fichierJoint,
      }),
    });

    await fetch("/api/send-email/sendrdvannule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        professionelId: selectedDoc,
        patientId: user.id,
        startDate: selectedRdv,
        duration: 30,
        typeRendezVous: selectedType,
        description: selectedDescription,
        prix: 25,
      }),
    });

    if (response.ok) {
      console.log("Rendez-vous supprimé avec succès");
      fetchRdvs(user.id, user.role);
    } else {
      const errorData = await response.json();
      console.log(
        errorData.error || "Erreur lors de la suppression du rendez-vous"
      );
    }
  };

  const deleteCancelledRdvs = () => {
    deletedRdvs?.forEach((rdv) => {
      deleteRdv(rdv.id);
    });
  };

  if (loading) {
    return <Loader />;
  } else if (user.error) {
    return <Disconnected />;
  } else if (user.role === "USER") {
    return (
      <div className="pl-8 pr-8">
        <div className="flex justify-between p-4">
          <div className="w-1/6 justify-start flex">
            <Tabs defaultValue="1" className="w-[400px]">
              <TabsList>
                <TabsTrigger
                  value="1"
                  onClick={(e: any) => {
                    setSelectedTabs(1);
                  }}
                >
                  Tous
                </TabsTrigger>
                <TabsTrigger
                  value="3"
                  onClick={(e: any) => {
                    setSelectedTabs(3);
                  }}
                >
                  A venir
                </TabsTrigger>
                <TabsTrigger
                  value="4"
                  onClick={(e: any) => {
                    setSelectedTabs(4);
                  }}
                >
                  Passé
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <h2 className="text-3xl text-center font-extrabold">Rendez-vous</h2>
          <div className="flex justify-end gap-2">
            <div>
              <Button
                variant="outline"
                onClick={(e: any) => {
                  fetchRdvs(user.id, user.role);
                }}
              >
                Actualiser
              </Button>
            </div>
            <div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={resetBooking}>
                    Prendre Rendez-vous
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[600px]">
                  <DialogHeader>
                    <DialogTitle>Prendre rendez-vous</DialogTitle>
                    <DialogDescription>
                      {rdvStep === 1
                        ? "Sélectionnez une date afin de prendre un rendez-vous."
                        : rdvStep === 2
                        ? "Sélectionnez un médecin et un créneau libre."
                        : "Sélectionnez le type de rendez-vous souhaité, et expliquer la raison de ce rendez-vous."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 justify-center">
                    {rdvStep === 1 ? (
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={[
                          { before: new Date() },
                          { dayOfWeek: [0, 6] },
                        ]}
                        weekStartsOn={1}
                        locale={fr}
                      />
                      
                ) : rdvStep === 2 ? (
                      <>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-60 justify-between"
                            >
                              {selectedDoc
                                ? fullNameOf(
                                    allMedecins!.find(
                                      (medecin) => medecin.id === selectedDoc
                                    )
                                  ) || "Sélectionner un médecin"
                                : "Sélectionner un médecin"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-60 p-0">
                            <Command>
                              <CommandList>
                                <CommandEmpty>
                                  Aucun médecin trouvé.
                                </CommandEmpty>
                                <CommandGroup>
                                  {allMedecins!.map((medecin) => (
                                    <CommandItem
                                      key={medecin.id}
                                      value={medecin.id}
                                      onSelect={(currentValue) => {
                                        setSelectedDoc(currentValue);
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
                        <Separator className="my-4"></Separator>
                        <ScrollArea className="max-h-60">
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
                                <LigneTableauCrenauxHoraires
                                  key={rdv}
                                  date={rdv}
                                />
                              ))}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                      </>
                    ) : (
                      rdvStep === 3 && (
                        <>
                          <div className="flex gap-4 justify-center">
                            <p>{formatDate(selectedRdv)}</p>
                            <Separator orientation="vertical" />
                            <p>{formatHour(selectedRdv)}</p>
                            <Separator orientation="vertical" />
                            <p>30 min</p>
                          </div>
                          <Separator className="my-4"></Separator>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[350px] justify-between"
                              >
                                {selectedType
                                  ? rdvTypes.find(
                                      (type) => type.value === selectedType
                                    )?.label
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
                                          setSelectedType(currentValue);
                                          setOpen(false);
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
                          <Separator className="my-4"></Separator>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Description</Label>
                            <Textarea
                              placeholder="Pourquoi souhaitez-vous un rendez-vous ?"
                              value={selectedDescription}
                              onChange={(e: any) => {
                                setSelectedDescription(e.target.value);
                              }}
                            />
                          </div>
                        </>
                      )
                    )}
                  </div>
                  <DialogFooter>
                    <div className="justify-center w-full flex-col">
                      {error && (
                        <div className="text-red-600 text-center w-full text-sm font-semibold my-3">
                          {rdvStep === 2
                            ? "Veuillez sélectionner un médecin pour continuer"
                            : "Veuillez remplir tous les champs"}
                        </div>
                      )}
                      <div className="flex w-full">
                        <div className="w-1/2 flex justify-start">
                          <Button onClick={decrementRdvStep} variant="outline">
                            {rdvStep === 1 ? "Annuler" : "Retour"}
                          </Button>
                        </div>
                        <div className="w-1/2 flex justify-end">
                          {rdvStep === 3 ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                {selectedType && selectedDescription ? (
                                  <Button variant="outline">Valider</Button>
                                ) : (
                                  <Button disabled>Valider</Button>
                                )}
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Confirmer la réservation ?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    <div>
                                      Une fois validée, cette réservation vous
                                      sera facturée, voici un récapitulatif :
                                    </div>
                                    <div className="flex gap-4 justify-center">
                                      <p>{formatDate(selectedRdv)}</p>
                                      <Separator orientation="vertical" />
                                      <p>{formatHour(selectedRdv)}</p>
                                      <Separator orientation="vertical" />
                                      <p>30 min</p>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between p-4">
                                      <div>
                                        {fullNameOf(
                                          allMedecins?.find(
                                            (medecin) =>
                                              medecin.id === selectedDoc
                                          )
                                        )}
                                      </div>
                                      <Separator orientation="vertical" />
                                      <div>{selectedType}</div>
                                    </div>
                                    <Separator />
                                    <div className="m-4">
                                      {selectedDescription}
                                    </div>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  {/*<AlertDialogAction onClick={createRdv}>
                                    Confirmer
                                  </AlertDialogAction>*/}
                          <CheckoutButton
                            amount={prices[selectedType] as unknown as number}
                            description={selectedDescription}
                            doc={selectedDoc}
                            selectedTime={selectedRdv}
                            type={selectedType}
                          />
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : rdvStep === 2 ? (
                            <Button disabled>Suivant</Button>
                          ) : date ? (
                            <Button
                              onClick={incrementRdvStep}
                              variant="outline"
                            >
                              Suivant
                            </Button>
                          ) : (
                            <Button disabled>Suivant</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        {deletedRdvs && deletedRdvs.length > 0 && (
          <Card className="p-4 m-2">
            <CardHeader className="flex justify-between">
              <div className="flex justify-between">
                <div>
                  <CardTitle>Rendez-vous annulés</CardTitle>
                  <CardDescription>
                    {
                      "Ces rendez-vous ont été annulés par votre médecin. Merci d'en prendre connaissance et réserver un nouveau créneau afin de réaliser votre visite."
                    }
                  </CardDescription>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">{"J'ai compris"}</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Etes vous sûr ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div>
                          Une fois validé, tous ces rendez-vous seront supprimés
                          définitivement, et aucun retour en arrière ne sera
                          possible.
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteCancelledRdvs}>
                        Valider
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-40">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Statut</TableHead>
                      <TableHead className="w-1/12">Date</TableHead>
                      <TableHead>Heure</TableHead>
                      <TableHead>Durée</TableHead>
                      <TableHead>Médecin</TableHead>
                      <TableHead className="w-1/3">Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Prix</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deletedRdvs?.map((rdv: { id: any }) => (
                      <LigneTableauListRDVUser key={rdv.id} rdv={rdv} />
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Statut</TableHead>
              <TableHead className="w-1/12">Date</TableHead>
              <TableHead>Heure</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Médecin</TableHead>
              <TableHead className="w-1/3">Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {filteredRdvs !== undefined ? (
              filteredRdvs?.map((rdv) => (
                <LigneTableauListRDVUser key={rdv.id} rdv={rdv} />
              ))
            ) : (
              <div>Vide</div>
            )}
          </TableBody>
        </Table>
      </div>
    );
  } else if (user.role === "DOCTOR") {
    return (
      <div className="pl-8 pr-8">
        <div className="flex justify-between p-4">
          <div className="w-1/6 justify-start flex">
            <Tabs defaultValue="1" className="w-[400px]">
              <TabsList>
                <TabsTrigger
                  value="1"
                  onClick={(e: any) => {
                    setSelectedTabs(1);
                  }}
                >
                  Tous
                </TabsTrigger>
                <TabsTrigger
                  value="2"
                  onClick={(e: any) => {
                    setSelectedTabs(2);
                  }}
                >
                  Ce jour
                </TabsTrigger>
                <TabsTrigger
                  value="3"
                  onClick={(e: any) => {
                    setSelectedTabs(3);
                  }}
                >
                  A venir
                </TabsTrigger>
                <TabsTrigger
                  value="4"
                  onClick={(e: any) => {
                    setSelectedTabs(4);
                  }}
                >
                  Passé
                </TabsTrigger>
                <TabsTrigger
                  value="5"
                  onClick={(e: any) => {
                    setSelectedTabs(5);
                  }}
                >
                  Annulé
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <h2 className="text-3xl text-center font-extrabold">Rendez-vous</h2>
          <div className="w-1/6 justify-end flex">
            <Button
              variant="outline"
              onClick={(e: any) => {
                fetchRdvs(user.id, user.role);
              }}
            >
              Actualiser
            </Button>
          </div>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Statut</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead className="w-1/12">Date</TableHead>
              <TableHead>Heure</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead className="w-1/3">Description</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRdvs !== undefined ? (
              filteredRdvs?.map((rdv) => (
                <LigneTableauListRDVDocteur key={rdv.id} rdv={rdv} />
              ))
            ) : (
              <div>Vide</div>
            )}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    return <Loader />;
  }
}
