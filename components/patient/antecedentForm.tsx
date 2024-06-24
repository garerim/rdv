"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AntecedentFormDialogProps {
  patientId: string;
  onFormSubmit: () => void;
}

const AntecedentFormDialog: React.FC<AntecedentFormDialogProps> = ({
  patientId,
  onFormSubmit,
}) => {
  const [type, setType] = useState("CHIRURGICAL");
  const [details, setDetails] = useState("");
  const [dateAntecedent, setDateAntecedent] = useState("");
  const [nomMedecin, setNomMedecin] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateAntecedent) {
      setFormError("Veuillez sélectionner une date.");
      return;
    }

    const antecedent = {
      type,
      details,
      dateAntecedent: new Date(dateAntecedent),
      nomMedecin,
      userProfileId: patientId,
    };

    const response = await fetch("/api/patient/create-antecedent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(antecedent),
    });

    if (response.ok) {
      setType("CHIRURGICAL");
      setDetails("");
      setDateAntecedent("");
      setNomMedecin("");
      setFormError(null);
      onFormSubmit();
    } else {
      alert("Erreur lors de la création de l'antécédent");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ajouter un Antécédent</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un Antécédent</DialogTitle>
          <DialogDescription>
            {
              "Remplissez les détails de l'antécédent ci-dessous. Cliquez sur 'Ajouter' une fois terminé."
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="col-span-3"
            >
              <option value="CHIRURGICAL">Chirurgical</option>
              <option value="FAMILIAUX">Familiaux</option>
              <option value="PSYCHOLOGIQUES">Psychologiques</option>
              <option value="TOXICOLOGIQUES">Toxicologiques</option>
              <option value="TRAUMATIQUES">Traumatiques</option>
              <option value="VACCINAUX">Vaccinaux</option>
              <option value="ALLERGIQUES">Allergiques</option>
              <option value="AUTRES">Autres</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="details" className="text-right">
              Détails
            </Label>
            <Input
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateAntecedent" className="text-right">
              Date
            </Label>
            <Input
              type="date"
              id="dateAntecedent"
              value={dateAntecedent}
              onChange={(e) => setDateAntecedent(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          {formError && <p className="text-red-500">{formError}</p>}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nomMedecin" className="text-right">
              Médecin
            </Label>
            <Input
              id="nomMedecin"
              value={nomMedecin}
              onChange={(e) => setNomMedecin(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              {type && details && dateAntecedent && nomMedecin ? (
                <Button type="submit" variant="outline">
                  Ajouter
                </Button>
              ) : (
                <Button disabled>Ajouter</Button>
              )}
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AntecedentFormDialog;
