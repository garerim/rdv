"use client";

import { RendezVous, UserProfile } from "@prisma/client";
import { useEffect, useState } from "react";
import RecentSalesItem from "./recent-sales-item";

type RendezVousWithPatient = RendezVous & {
  patient: {
    avatar: string | undefined;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface RecentSalesProps {
  handleCountSale: (count: number) => void;
}

export function RecentSales({handleCountSale} : RecentSalesProps) {


  const [jwtToken, setJwtToken] = useState<string | null>();
  const [user, setUser] = useState<any>({} as UserProfile);
  const [rendezVous, setRendezVous] = useState<RendezVousWithPatient[]>([])

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
      console.log(data);
      
      const rdvs = fetch(`/api/rdvByUser?id=${data.id}`, {
        method: "GET",
      });

      rdvs.then((res) => res.json()).then((data) => {
        setRendezVous(data)
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const count = data.filter((item: RendezVousWithPatient) => item.etat === "PASSE" && new Date(item.createdAt).getMonth() === currentMonth && new Date(item.createdAt).getFullYear() === currentYear).length;

        handleCountSale(count)
      });
    });
  }, [jwtToken]);

  return (
    <div className="space-y-8">
      {rendezVous && rendezVous.map((rdv, index) => (
        <>
          {rdv.etat === "PASSE" && <RecentSalesItem key={index} userPatient={rdv.patient} createdAt={rdv.createdAt} />}
        </>
      ))}

      {/* <RecentSalesItem userPatient={userPatient} /> */}
      {/* <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">
            isabella.nguyen@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-sm text-muted-foreground">will@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div> */}
    </div>
  )
}