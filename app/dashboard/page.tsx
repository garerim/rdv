"use client";

import NotConnected from "@/components/notConnected/NotConnected";
import { Loader } from "@/components/loader/Loader";
import { useEffect, useState } from "react";
import { isTokenExpired } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>();
  const [jwtExp, setJwtExp] = useState<string | null>();

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

  return (
    <>
      {!isMounted ? (
        <Loader />
      ) : !jwtToken ? (
        <NotConnected />
      ) : (
        <div className="relative w-full h-full flex justify-center gap-5 px-40">
          <div className="w-full h-52 border rounded-lg px-5 py-4 m-0">
            <div className="flex flex-col">
              <Label className="text-3xl">Prendre un rendez-vous</Label>
              <Label className="text-base opacity-60 italic">
                Trouvez rapidement un créneau disponible avec un médecin.
              </Label>
            </div>
          </div>
          <div className="w-full h-52 border rounded-lg"></div>
        </div>
      )}
    </>
  );
}
