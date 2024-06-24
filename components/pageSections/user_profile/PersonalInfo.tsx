"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@prisma/client";
import { PencilLine, Undo2 } from "lucide-react";
import { useState } from "react";

export default function PersonalInfo({
  user,
}: {
  user: UserProfile | undefined;
}) {
  const [userTemp, setUserTemp] = useState<UserProfile>(user as UserProfile);
  const [modifyAddress, setModifyAddress] = useState<boolean>(false);
  const [modifyTel, setModifyTel] = useState<boolean>(false);
  const [modifyJob, setModifyJob] = useState<boolean>(false);

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

  const formatDate = (date: any) => {
    const dateFormated = new Date(date);
    return dateFormated.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const calculAge = (date: any) => {
    const dateFormated = new Date(date);
    const diff = Date.now() - dateFormated.getTime();
    const age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - 1970);
  };

  return (
    <div className="flex flex-col w-full gap-10 items-center mb-20">
      <Label className="w-full text-3xl">Informations personnelles</Label>
      <Separator className="w-[90%]" />
      <form action="#" method="POST" className="flex flex-col gap-5 w-[80%]">
        <div className="flex gap-2 items-center">
          <Label className="text-lg">Date de naissance:</Label>
          <Label>
            {formatDate(user?.birthDate.toString())}
            <span className="font-extralight">
              {" (" + calculAge(user?.birthDate.toString()) + " ans)"}
            </span>
          </Label>
        </div>
        <div className="flex gap-2 items-center">
          <Label className="text-lg">Sexe:</Label>
          <Label>{user?.sexe === "H" ? "Homme" : "Femme"}</Label>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            {!modifyAddress ? (
              <PencilLine
                className="cursor-pointer"
                onClick={() => setModifyAddress(true)}
              />
            ) : (
              <Undo2
                className="cursor-pointer"
                onClick={() => setModifyAddress(false)}
              />
            )}
            <Label className="text-lg" htmlFor="address">
              Adresse
            </Label>
          </div>
          <Input
            disabled={!modifyAddress}
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
          <Input
            disabled={!modifyAddress}
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
          <Input
            disabled={!modifyAddress}
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
          <Input
            disabled={!modifyAddress}
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
          <div className="flex items-center gap-3">
            {!modifyTel ? (
              <PencilLine
                className="cursor-pointer"
                onClick={() => setModifyTel(true)}
              />
            ) : (
              <Undo2
                className="cursor-pointer"
                onClick={() => setModifyTel(false)}
              />
            )}
            <Label className="text-lg" htmlFor="phone">
              Téléphones
            </Label>
          </div>
          <Input
            disabled={!modifyTel}
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
          <Input
            disabled={!modifyTel}
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
          <div className="flex items-center gap-3">
            {userTemp?.role !== "USER" ? (
              <></>
            ) : !modifyJob ? (
              <PencilLine
                className="cursor-pointer"
                onClick={() => setModifyJob(true)}
              />
            ) : (
              <Undo2
                className="cursor-pointer"
                onClick={() => setModifyJob(false)}
              />
            )}
            <Label className="text-lg" htmlFor="job">
              Métier
            </Label>
          </div>
          <Input
            disabled={!modifyJob}
            type="text"
            id="job"
            name="job"
            placeholder="Métier"
            value={userTemp?.metier !== "USER" ? userTemp?.role : userTemp.metier}
            onChange={(e: any) => {
              setUserTemp({ ...userTemp, metier: e.target.value });
              //console.log("usertemp: ", userTemp);
            }}
          />
        </div>
        <Button
          disabled={user === userTemp}
          onClick={handleSave}
          className="fixed bottom-5 right-10 w-32"
        >
          <input
            className="cursor-pointer"
            type="submit"
            value="Enregistrer"
            onSubmit={handleSave}
          />
        </Button>
      </form>
    </div>
  );
}
