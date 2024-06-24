"use client";

import { RendezVous, UserProfile } from "@prisma/client";
import { useEffect, useState } from "react";
import RecentSalesItem from "./recent-sales-item";
import { cn } from "@/lib/utils";

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

export function RecentSales({ handleCountSale }: RecentSalesProps) {


  const [jwtToken, setJwtToken] = useState<string | null>();
  const [user, setUser] = useState<any>({} as UserProfile);
  const [rendezVous, setRendezVous] = useState<RendezVousWithPatient[]>([])
  const [countRdv, setCountRdv] = useState(0)

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
      // console.log(data);

      const rdvs = fetch(`/api/rdvWithUserByUser?id=${data.id}`, {
        method: "GET",
      });

      rdvs.then((res) => res.json()).then((data) => {
        setRendezVous(data)
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const count = data.filter((item: RendezVousWithPatient) => item.etat === "PASSE" && new Date(item.createdAt).getMonth() === currentMonth && new Date(item.createdAt).getFullYear() === currentYear).length;
        setCountRdv(count)

        handleCountSale(count)
      });
    });
  }, [jwtToken]);

  return (
    <div className={cn("space-y-8 max-h-[320px]", countRdv > 4 && "overflow-y-scroll")}>
      {rendezVous && rendezVous.map((rdv) => (
        <>
          {(rdv.etat === "PASSE" && new Date(rdv.createdAt).getMonth() === new Date().getMonth()) && <RecentSalesItem key={rdv.id} userPatient={rdv.patient} createdAt={rdv.createdAt} />}
        </>
      ))}
    </div>
  )
}