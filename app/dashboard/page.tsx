"use client";

import DashboardCard from "@/components/dashboard/dashboard-card";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Loader } from "@/components/loader/Loader";
import NotConnected from "@/components/notConnected/NotConnected";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isTokenExpired } from "@/lib/utils";
import { UserProfile } from "@prisma/client";
import { Ban, Euro, Hourglass, Users } from "lucide-react";
import { useEffect, useState } from "react";

type DashboardDataType = {
  totalRevenus: number;
  lastTotalRevenus: number;
  totalSubscriptions: number;
  lastTotalSubscriptions: number;
  totalSubscriptionsComing: number;
  totalSubscriptionsCancelled: number;
  lastTotalSubscriptionsCancelled: number;
  overview: number[];
}

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>();
  const [jwtExp, setJwtExp] = useState<string | null>();
  const [user, setUser] = useState<any>({} as UserProfile);
  const [dashboardData, setDashboardData] = useState<DashboardDataType>({} as DashboardDataType);

  const [countSale, setCountSale] = useState(0)

  const handleCountSale = (count: number) => {
    setCountSale(count)
  }

  useEffect(() => {
    const setLocalStorage = () => {
      try {
        const storedJwt = localStorage.getItem("jwtToken");
        const storedJwtExp = localStorage.getItem("jwtExp");
        setJwtToken(storedJwt);
        setJwtExp(storedJwtExp);
        setIsMounted(true);
      } catch (error) {
        console.error("Error setting local storage:", error);
      }
    };

    const verifyJWT = async () => {
      console.log(jwtToken, jwtExp);
      if (
        jwtToken !== null &&
        jwtToken !== undefined &&
        jwtExp !== null &&
        jwtExp !== undefined
      ) {
        const expNumber = parseInt(jwtExp);
        const isExpired = isTokenExpired(expNumber);
        console.log(isExpired);
        if (isExpired) {
          console.log(123456);
          setJwtToken(null);
          setJwtExp(null);
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("jwtExp");
        }
      }
    };

    setLocalStorage();
    verifyJWT();
  }, [jwtExp, jwtToken]);

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
      if (data.role === "USER") {
        window.location.href = "/"
      }

      const dashboard = fetch(`/api/getDashboard?id=${data.id}`, {
        method: "GET",
      });

      dashboard.then((res) => res.json()).then((data) => {
        setDashboardData(data);
      });
    });
  }, [jwtToken]);

  function calculerPourcentage(prev: number, next: number): string {
    if (prev === 0) {
      return "";
    }

    const difference = next - prev;
    const pourcentage = (difference / prev) * 100;
    const signe = pourcentage >= 0 ? '+' : '-';

    return `${signe}${Math.abs(pourcentage).toFixed(2)}%`;
  }

  return (
    <>
      {!isMounted ? (
        <Loader />
      ) : !jwtToken ? (
        <NotConnected />
      ) : (
        <>
          {(user && user.role === "DOCTOR") ? (

            <div className="hidden flex-col md:flex">
              <div className="flex-1 space-y-4 p-8 pt-0">
                <div className="flex items-center justify-between space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                  <div className="flex items-center space-x-2">
                    {/* <CalendarDateRangePicker /> */}
                    {/* <Button>Download</Button> */}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {dashboardData && (
                    <>
                      <DashboardCard title="Total Revenue" IconCard={Euro} amount={dashboardData.totalRevenus * user.prixPcr} devise="€" footer={`${calculerPourcentage(dashboardData.lastTotalRevenus, dashboardData.totalRevenus)} par rapport au mois dernier`} />

                      <DashboardCard title="Nombre Rendez-vous" IconCard={Users} amount={dashboardData.totalSubscriptions} footer={`${calculerPourcentage(dashboardData.lastTotalSubscriptions, dashboardData.totalSubscriptions)} par rapport au mois dernier`} />

                      <DashboardCard title="Rendez-vous à venir" IconCard={Hourglass} amount={dashboardData.totalSubscriptionsComing} footer={``} link="/rendez_vous" />

                      <DashboardCard title="Taux d'annulation" IconCard={Ban} amount={dashboardData.totalSubscriptionsCancelled} footer={`${calculerPourcentage(dashboardData.lastTotalSubscriptionsCancelled, dashboardData.totalSubscriptionsCancelled)} par rapport au mois dernier`} />
                    </>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>{"Vue d'ensemble"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview user={user} overviewData={dashboardData.overview} />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Consultations Récentes</CardTitle>
                      <CardDescription>
                        Vous avez fait {countSale} consultations ce mois-ci.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentSales handleCountSale={handleCountSale} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}