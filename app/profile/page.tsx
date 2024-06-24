"use client";

import { Disconnected } from "@/components/disconnected/disconnected";
import { Loader } from "@/components/loader/Loader";
import AccountSettings from "@/components/pageSections/user_profile/AccountSettings";
import Billing from "@/components/pageSections/user_profile/Billing";
import PersonalInfo from "@/components/pageSections/user_profile/PersonalInfo";
import Profile from "@/components/pageSections/user_profile/Profile";
import { Button } from "@/components/ui/button";
import { isTokenExpired } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [isMounted, setIsMounted] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>();
  const [jwtExp, setJwtExp] = useState<string | null>();
  const [user, setUser] = useState<any>();

  const [activeTab, setActiveTab] = useState("profile");

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

    user.then((res) => res.json()).then((data) => setUser(data));
  }, [jwtToken]);

  return (
    <>
      {!isMounted ? (
        <Loader />
      ) : !jwtToken ? (
        <Disconnected />
      ) : (
        <>
          <div className="flex justify-center items-start w-full">
            <div className="flex w-[70vw] relative">
              <div className="flex flex-col w-64 fixed h-fit my-10">
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("profile")}
                >
                  Profil
                </Button>
                <Button
                  variant={activeTab === "info_perso" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("info_perso")}
                >
                  Informations personnelles
                </Button>
                <Button
                  variant={activeTab === "acc_settings" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("acc_settings")}
                >
                  Paramètres du compte
                </Button>
                <Button
                  variant={activeTab === "factu" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("factu")}
                >
                  Facturation
                </Button>
              </div>
              <div className="ml-64 flex-1 pl-10">
                {activeTab === "profile" && <Profile user={user} />}
                {activeTab === "info_perso" && <PersonalInfo user={user} />}
                {activeTab === "acc_settings" && <AccountSettings user={user} />}
                {activeTab === "factu" && <Billing user={user} />}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
