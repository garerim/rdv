"use client";

import { Button } from "@/components/ui/button";
import { UserProfile } from "@prisma/client";
import { useState } from "react";

export default function PersonalInfo({
  user,
}: {
  user: UserProfile | undefined;
}) {
  const [userTemp, setUserTemp] = useState<UserProfile>(user as UserProfile);
  const handleSave = () => {
    fetch("/api/users/personalInfos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenBody: localStorage.getItem("jwtToken"),
        user: userTemp,
      }),
    }).catch((error) => {
      console.error("Error:", error);
    });
    window.location.reload();
  };

  return (
    <div>
      <h1>Informations personnelles</h1>
      <form action="#" className="flex flex-col gap-5">
        <p>Date de naissance: {user?.birthDate.toString()}</p>
        <p>Sexe: {user?.sexe}</p>
        <div className="flex flex-col gap-2">
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            id="addressRegion"
            name="addressRegion"
            placeholder="Région"
            value={userTemp?.adresseRegion as string}
            onChange={(e: any) => {
              setUserTemp({ ...userTemp, adresseRegion: e.target.value });
              //console.log("usertemp: ", userTemp);
            }}
          />
          <input
            type="text"
            id="addressDep"
            name="addressDep"
            placeholder="Département"
            value={userTemp?.adresseDepartement as string}
            onChange={(e: any) => {
              setUserTemp({ ...userTemp, adresseDepartement: e.target.value });
              //console.log("usertemp: ", userTemp);
            }}
          />
          <input
            type="text"
            id="addressCity"
            name="addressCity"
            placeholder="Ville"
            value={userTemp?.adresseVille as string}
            onChange={(e: any) => {
              setUserTemp({ ...userTemp, adresseVille: e.target.value });
              //console.log("usertemp: ", userTemp);
            }}
          />
          <input
            type="text"
            id="addressStreet"
            name="addressStreet"
            placeholder="Rue et numéro"
            value={userTemp?.adresseRueEtNumero as string}
            onChange={(e: any) => {
              setUserTemp({ ...userTemp, adresseRueEtNumero: e.target.value });
              //console.log("usertemp: ", userTemp);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Téléphones</label>
          <input
            type="tel"
            id="phonePort"
            name="phonePort"
            placeholder="06 .. .. .. .."
            value={userTemp?.telephoneMobile as string}
            onChange={(e: any) => {
              setUserTemp({ ...userTemp, telephoneMobile: e.target.value });
              //console.log("usertemp: ", userTemp);
            }}
          />
          <input
            type="tel"
            id="phoneFix"
            name="phoneFix"
            placeholder="04 .. .. .. .."
            value={userTemp?.telephoneFix as string}
            onChange={(e: any) => {
              setUserTemp({ ...userTemp, telephoneFix: e.target.value });
              //console.log("usertemp: ", userTemp);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="job">Métier</label>
          <input
            type="text"
            id="job"
            name="job"
            placeholder="Métier"
            value={userTemp?.metier as string}
            onChange={(e: any) => {
              setUserTemp({ ...userTemp, metier: e.target.value });
              //console.log("usertemp: ", userTemp);
            }}
          />
        </div>
        <Button onClick={handleSave}>
          <input type="submit" value="Enregistrer" onSubmit={handleSave} />
        </Button>
      </form>
    </div>
  );
}
