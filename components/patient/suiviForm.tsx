"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useGlobale } from '@/components/provider/globale-provider';  // Assurez-vous que ce chemin est correct

interface SuiviFormProps {
  patientProfileId: string;
  onFormSubmit: () => void;
}

const SuiviForm: React.FC<SuiviFormProps> = ({ patientProfileId, onFormSubmit }) => {
  const [diagnostique, setDiagnostique] = useState('');
  const [traitement, setTraitement] = useState('');
  const { user } = useGlobale();
  const [medecinProfileId, setMedecinProfileId] = useState('');

  useEffect(() => {
    if (user) {
      setMedecinProfileId(user.id); 
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/patient/create-suiviPatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patientProfileId, diagnostique, traitement, medecinProfileId }),
    });

    if (response.ok) {
      onFormSubmit();
    } else {
      alert('Erreur lors de la création du suivi');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ajouter Suivi</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter Suivi</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="diagnostique" className="text-right">
                Diagnostique
              </Label>
              <Textarea
                id="diagnostique"
                value={diagnostique}
                onChange={(e) => setDiagnostique(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="traitement" className="text-right">
                Traitement
              </Label>
              <Textarea
                id="traitement"
                value={traitement}
                onChange={(e) => setTraitement(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              {diagnostique && traitement ? <Button type="submit" variant="outline">Enregistrer</Button> : <Button disabled>Enregistrer</Button>}
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SuiviForm;
