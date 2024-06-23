"use client";

import DashboardCard from "@/components/dashboard/dashboard-card";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Loader } from "@/components/loader/Loader";
import NotConnected from "@/components/notConnected/NotConnected";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isTokenExpired } from "@/lib/utils";
import { UserProfile } from "@prisma/client";
import { Euro, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type DashboardDataType = {
  totalRevenus: number;
  lastTotalRevenus: number;
  totalSubscriptions: number;
  lastTotalSubscriptions: number;
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
      // console.log(data.id);

      const dashboard = fetch(`/api/getDashboard?id=${data.id}`, {
        method: "GET",
      });

      dashboard.then((res) => res.json()).then((data) => {
        setDashboardData(data);
        // console.log(data.overview);

        // console.log("last : ", data.lastTotalRevenus);
        // console.log("today : ", data.totalRevenus);

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
                    <Button>Download</Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {dashboardData && (
                    <>
                      <DashboardCard title="Total Revenue" IconCard={Euro} amount={dashboardData.totalRevenus * user.prixPcr} devise="€" footer={`${calculerPourcentage(dashboardData.lastTotalRevenus, dashboardData.totalRevenus)} from last month`} />
                      <DashboardCard title="Subscriptions" IconCard={Users} amount={dashboardData.totalSubscriptions} footer={`${calculerPourcentage(dashboardData.lastTotalSubscriptions, dashboardData.totalSubscriptions)} from last month`} />
                    </>
                  )}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Sales</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+12,234</div>
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Now
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+573</div>
                      <p className="text-xs text-muted-foreground">
                        +201 since last hour
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      {/* {user && dashboardData.overview && <Overview user={user} overviewData={dashboardData.overview} />} */}
                      <Overview user={user} overviewData={dashboardData.overview} />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>
                        You made {countSale} sales this month.
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
