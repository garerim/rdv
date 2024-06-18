// "use client";

// import React, { useEffect, useState } from 'react';
// import { UserProfile } from "@prisma/client";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
//   } from "@/components/ui/tooltip"
//   import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Calendar } from "@/components/ui/calendar"
// import { Check, ChevronsUpDown } from "lucide-react"
 
// import { cn } from "@/lib/utils"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

  

// const formatDate = (dateString: any) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('fr-FR', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric',
//   });
// };

// const formatHour = (dateString: any) => {
//   const date = new Date(dateString);
//   return date.toLocaleTimeString('fr-FR', {
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// export default function Page() {
//   const [jwtToken, setJwtToken] = useState<string | null>();
//   const [user, setUser] = useState<any>({} as UserProfile);
//   const [rdvs, setRdvs] = useState<any[]>();
//   const [medecins, setMedecins] = useState<{ [key: string]: string }>({});
//   const [date, setDate] = useState<Date | undefined>(new Date())
//   const [rdvStep, setRdvStep] = useState<number>();
//   const [open, setOpen] = useState(false)
//   const [value, setValue] = useState("")
//   const [allMedecins, setAllMedecins] = useState<any[]>();
//   const [allFreeRdvs, setAllFreeRdvs] = useState<string[]>();

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("jwtToken");
//       setJwtToken(token);

//       const userResponse = await fetch("/api/userByJWT", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ tokenBody: token }),
//       });

//       const userData = await userResponse.json();
//       setUser(userData);

//       const rdvResponse = await fetch(`/api/rdvByUser?id=${userData.id}`, {
//         method: "GET",
//       });

//       const rdvData = await rdvResponse.json();
//       setRdvs(rdvData);

//       const medecinPromises = rdvData.map(async (rdv: any) => {
//         const medecinName = await getDocNameById(rdv.professionelId);
//         return { id: rdv.professionelId, name: medecinName };
//       });

//       const medecinsArray = await Promise.all(medecinPromises);
//       const medecinsObject: { [key: string]: string } = {};
//       medecinsArray.forEach(medecin => {
//         medecinsObject[medecin.id] = medecin.name;
//       });
//       setMedecins(medecinsObject);
//     };

//     fetchData();
//   }, []);

//   const getDocNameById = async (id: string) => {
//     try {
//       const response = await fetch(`/api/findDocById?id=${id}`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Erreur lors de la récupération du document");
//       }

//       const data = await response.json();
//       return data.firstName + " " + data.lastName;
//     } catch (error) {
//       console.error("Erreur:", error);
//       return "Erreur";
//     }
//   };

//   const getAllDocs = async () => {
//     try {
//       const response = await fetch(`/api/getAllDoc`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Erreur lors de la récupération du document");
//       }

//       const data = await response.json();
//       console.log("getDOcs : ")
//       console.log(data)
//       setAllMedecins(data)
//     } catch (error) {
//       console.error("Erreur:", error);
//       return "Erreur";
//     }
//   };

//   const getAllDispoByDayAndDoctor = async (medecin:any, day:Date) => {
//     try {
//       const response = await fetch(`/api/getAllDispoByDayAndDoctor?id=${medecin.id}&day=${day}`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Erreur lors de la récupération du document");
//       }

//       const data = await response.json();
//       setAllFreeRdvs(data)
//       console.log(data)
//     } catch (error) {
//       console.error("Erreur:", error);
//       return "Erreur";
//     }
//   };

//   const LigneTableauListRDV = ({ rdv }: any) => {
//     const medecinName = medecins[rdv.professionelId] || "Chargement...";

//     return (
//       <TableRow>
//         <TableCell className="font-medium flex justify-center"><TooltipProvider><Tooltip delayDuration={100}>
//             <TooltipTrigger><div className={`rounded-full w-4 h-4 ${rdv.etat === 'A_VENIR'? 'bg-orange-400': rdv.etat === 'PASSE' ? 'bg-green-600' : 'bg-red-600'}`}/></TooltipTrigger>
//             <TooltipContent>{rdv.etat === 'A_VENIR'? 'A venir': rdv.etat === 'PASSE' ? 'Passé' : 'Annulé'}</TooltipContent>
//             </Tooltip></TooltipProvider>
// </TableCell>
//         <TableCell>{formatDate(rdv.startDate)}</TableCell>
//         <TableCell>{formatHour(rdv.startDate)}</TableCell>
//         <TableCell>{rdv.duration} min</TableCell>
//         <TableCell>Dr. {medecinName}</TableCell>
//         <TableCell>{rdv.typeRendezVous}</TableCell>
//         <TableCell>{rdv.prix} €</TableCell>
//       </TableRow>
//     );
//   };

//   const LigneTableauCrenauxHoraires = ({ date }: any) => {

//     console.log(date)
//     date = date as string
//     console.log(formatDate(date))
//     return (
//       <TableRow onClick={(e:any) => {console.log(e)}}>
//         <TableCell>{formatDate(date)}</TableCell>
//         <TableCell>{formatHour(date)}</TableCell>
//         <TableCell>30 min</TableCell>
//       </TableRow>
//     );
//   };

//   const incrementRdvStep = () =>{
//     {rdvStep  &&
//     setRdvStep(rdvStep + 1 )}
//   }

//   useEffect(() => {
//     {rdvStep === 1 &&  getAllDocs()}
    
//     }, [rdvStep]);

//   useEffect(() => {
//     {rdvStep === 2 &&  getAllDispoByDayAndDoctor(allMedecins!.find((medecin) => medecin.id === value), date as Date)}
//   }, [value]);

//   const fullNameOf = (medecin:any) =>{
//     return `Dr. ${medecin.firstName} ${medecin.lastName}`
//   }

//   return (
//     <div className='pl-8 pr-8'>
//         <div className='flex justify-end p-4'>
//           <div className='w-1/6'></div>
//           <h2 className="text-3xl text-center font-extrabold w-full">Rendez-vous</h2>
//           <div className='w-1/6 flex justify-end'>
//           <Dialog>
//         <DialogTrigger asChild>
//           <Button variant="outline" onClick={() => {setRdvStep(1), console.log("set")}}>Prendre Rendez-vous</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px] max-h-[600px]">
//           <DialogHeader>
//             <DialogTitle>Prendre rendez-vous</DialogTitle>
//             <DialogDescription>
//               Sélectionnez une date afin de prendre un rendez-vous.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4 justify-center">
//             { rdvStep === 1 ?
            
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={setDate}
//             className="rounded-md border"
//           />
//           :rdvStep === 2 ? <>
//           <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={open}
//               className="w-60 justify-between"
//             >
//               {value
//                 ? fullNameOf(allMedecins!.find((medecin) => medecin.id === value))
//                 : "Sélectionner un médecin"}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-60 p-0">
//             <Command>
//               {/* Possibilité d'ajouter une barre de recherche avec la ligne ci-dessous et le Check plus bas*/}
//               {/* <CommandInput placeholder="Sélectionner un médecin" /> */}
//               <CommandList>
//                 <CommandEmpty>Aucun médecin trouvé.</CommandEmpty>
//                 <CommandGroup>
//                   {allMedecins!.map((medecin) => (
//                     <CommandItem
//                       key={fullNameOf(medecin)}
//                       value={medecin.id}
//                       onSelect={(currentValue) => {
//                         setValue(currentValue === value ? "" : currentValue)
//                         setOpen(false)
//                       }}
//                     >
//                       {/* <Check
//                         className={cn(
//                           "mr-2 h-4 w-4",
//                           value === fullNameOf(medecin) ? "opacity-100" : "opacity-0"
//                         )}
//                       /> */}
//                       {fullNameOf(medecin)}
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//         <div className="overflow-y-scroll max-h-60 w-full">
//         <Table className='w-full mt-2'>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Date</TableHead>
//               <TableHead>Heure</TableHead>
//               <TableHead>Durée</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {/* allFreeRdvs?.length > 0 ?  */}
//             {allFreeRdvs?.map((rdv) => (
//               <LigneTableauCrenauxHoraires key={rdv} rdv={rdv} />
//             ))}
//             {/* :<></>}} */}
//           </TableBody>
//         </Table>
//             </div>
//         </>
//         :
//         <></>
//             }
//           </div>
//           <DialogFooter>
//             <Button onClick={() => incrementRdvStep()} variant={'outline'}>Suivant</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//       </div>
//         </div>
//       <Table className='w-full'>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px] text-center">Statut</TableHead>
//             <TableHead className='w-1/12'>Date</TableHead>
//             <TableHead>Heure</TableHead>
//             <TableHead>Durée</TableHead>
//             <TableHead>Médecin</TableHead>
//             <TableHead>Type</TableHead>
//             <TableHead>Prix</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {rdvs?.map((rdv) => (
//             <LigneTableauListRDV key={rdv.id} rdv={rdv} />
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

export default function Page() {
  const [jwtToken, setJwtToken] = useState<string | null>();
  const [user, setUser] = useState<any>({} as UserProfile);
  const [rdvs, setRdvs] = useState<any[]>();
  const [medecins, setMedecins] = useState<{ [key: string]: string }>({});
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [rdvStep, setRdvStep] = useState<number>(0); // Initialisez rdvStep à 0
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [allMedecins, setAllMedecins] = useState<any[]>();
  const [allFreeRdvs, setAllFreeRdvs] = useState<string[]>();
  const [selectedRdv, setSelectedRdv] = useState<any>();
  const [selectedDoc, setSelectedDoc] = useState<any>();

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
    const medecinName = medecins[rdv.professionelId] || "Chargement...";

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
        <TableCell>Dr. {medecinName}</TableCell>
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
  };

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

  const fullNameOf = (medecin: any) => {
    return `Dr. ${medecin.firstName} ${medecin.lastName}`;
  };

  const bookAppointment = (date: any) => {
    setSelectedDoc(value)
    setValue("")
    setSelectedRdv(date)
    incrementRdvStep()
  }

  return (
    <div className='pl-8 pr-8'>
      <div className='flex justify-end p-4'>
        <div className='w-1/6'></div>
        <h2 className="text-3xl text-center font-extrabold w-full">Rendez-vous</h2>
        <div className='w-1/6 flex justify-end'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setRdvStep(1)}>Prendre Rendez-vous</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[600px]">
              <DialogHeader>
                <DialogTitle>Prendre rendez-vous</DialogTitle>
                <DialogDescription>
                  Sélectionnez une date afin de prendre un rendez-vous.
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
                      <Textarea id="description" placeholder="Pourquoi souhaitez-vous un rendez-vous ?" />
                    </div>
                  </>
                }
              </div>
              <DialogFooter>
                {rdvStep !== 2 ? <Button onClick={incrementRdvStep} variant="outline">{rdvStep === 1 ? "Suivant" : "Valider"}</Button>:<></>}
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
          {rdvs?.map((rdv) => (
            <LigneTableauListRDV key={rdv.id} rdv={rdv} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

