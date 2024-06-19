"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@prisma/client";
import { useState } from "react";

export default function AccountSettings({
  user,
}: {
  user: UserProfile | undefined;
}) {
  const [oldPassword, setOldPassword] = useState<string>(user?.password || "");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const updatePassword = async () => {
    const res = await fetch("/api/users/accountSettings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenBody: localStorage.getItem("jwtToken"),
        user: user,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    });

    const data = await res.json();

    if (data.message === "Ancien mot de passe incorrect") {
      setError(data.message);
    } else {
      location.reload();
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full gap-10 items-center justify-center mb-20">
        <Label className="w-full text-3xl">Paramètres du compte</Label>
        <Separator className="w-[90%]" />
        <form method="POST" action="#" className="flex flex-col gap-8 w-[80%]">
          <Label className="text-lg">Modifier le mot de passe</Label>
          <Input
            type="password"
            placeholder="Ancien mot de passe"
            onChange={(e: any) => setOldPassword(e.target.value)}
          />
          <Separator />
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              placeholder="Nouveau mot de passe"
              onChange={(e: any) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              onChange={(e: any) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button
            type="button"
            onClick={() => {
              if (newPassword === confirmPassword) {
                updatePassword();
              } else {
                setError("Les mots de passe ne correspondent pas");
              }
            }}
          >
            Enregistrer
          </Button>
          <Label className="w-full">{error}</Label>
        </form>
      </div>
    </div>
  );
}
