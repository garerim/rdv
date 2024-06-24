"use client"
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '../ui/separator';
import React, { useState } from 'react';
import SuiviForm from './suiviForm';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import AntecedentFormDialog from './antecedentForm';
import TransformToAntecedentDialog from './transformToAntecedentForm';
import { UserProfile } from '@prisma/client';
import Image from 'next/image';

type SuiviPatient = {
  id: string;
  diagnostique: string | null;
  traitement: string | null;
  createdAt: Date;
  updatedAt: Date;
  medecinProfileId: string | null;
  medecinProfile: UserProfile;
};

type Antecedent = {
  id: string;
  type: 'CHIRURGICAL' | 'FAMILIAUX' | 'PSYCHOLOGIQUES' | 'TOXICOLOGIQUES' | 'TRAUMATIQUES' | 'VACCINAUX' | 'ALLERGIQUES' | 'AUTRES';
  details: string | null;
  dateAntecedent: Date;
  nomMedecin: string | null;
};

type PatientContentProps = {
  patient: {
    id: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    email: string | null;
    birthDate: Date;
    sexe: string | null;
    adresseRegion: string | null;
    adresseDepartement: string | null;
    adresseVille: string | null;
    adresseRueEtNumero: string | null;
    telephoneMobile: string | null;
    telephoneFix: string | null;
    metier: string | null;
  };
  antecedents: Antecedent[];
  suiviPatients: SuiviPatient[];
};

const PatientContent: React.FC<PatientContentProps> = ({ patient, antecedents, suiviPatients }) => {
  const router = useRouter();
  const [selectedSuivi, setSelectedSuivi] = useState<SuiviPatient | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFormSubmit = () => {
    router.refresh();
  };

  const handleDelete = async (id: string, type: 'antecedent' | 'suiviPatient') => {
    const response = await fetch(`/api/patient/delete-${type}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      alert(`Erreur lors de la suppression de ${type}`);
    }
  };

  const handleOpenDialog = (suiviPatient: SuiviPatient) => {
    setSelectedSuivi(suiviPatient);
    setDialogOpen(true);
  };

  const handleTransformToAntecedent = async (type: Antecedent['type']) => {
    if (!selectedSuivi) return;

    const nomMedecin = `${selectedSuivi.medecinProfile.firstName} ${selectedSuivi.medecinProfile.lastName}`  || 'Inconnu';
    const details = `Diagnostic : ${selectedSuivi.diagnostique}\nTraitement : ${selectedSuivi.traitement}`;
    
    const newAntecedent = {
      type,
      details,
      dateAntecedent: new Date(),
      nomMedecin,
    };

    // Supprimer l'ancien suivi patient
    const deleteResponse = await fetch(`/api/patient/delete-suiviPatient`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: selectedSuivi.id }),
    });

    if (!deleteResponse.ok) {
      alert('Erreur lors de la suppression du suivi patient');
      return;
    }

    // Ajouter le nouvel antécédent
    const addResponse = await fetch(`/api/patient/create-antecedent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, details, dateAntecedent: new Date(), nomMedecin, userProfileId: patient.id }),
    });

    if (addResponse.ok) {
      router.refresh();
    } else {
      alert('Erreur lors de la transformation du diagnostic en antécédent');
    }
  };

  return (
    <div className="flex flex-col h-full border-t">
      <div className="p-4 flex items-center border-b">
        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center mr-4">
          {patient.avatar ? (
            <Image
              src={patient.avatar}
              alt={`${patient.firstName} ${patient.lastName}'s avatar`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-2xl font-bold">
              {patient.firstName.charAt(0).toUpperCase()}
              {patient.lastName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h2 className="font-bold text-xl">{`${patient.firstName} ${patient.lastName}`}</h2>
          <p className="text-gray-600">
            {patient.sexe === 'H' ? 'Masculin' : 'Féminin'} |{' '}
            {patient.birthDate
              ? new Date(patient.birthDate).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Date de naissance inconnue'}
          </p>
          <p className="text-gray-600">{patient.metier}</p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg">Antécédents</span>
          {antecedents.length > 0 ? (
            antecedents.map((antecedent: Antecedent) => (
              <div key={antecedent.id} className="border p-2 rounded">
                <p className="font-semibold">{antecedent.type}</p>
                <p>{antecedent.details}</p>
                <p className="text-gray-600 text-sm">
                  {new Date(antecedent.dateAntecedent).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })} - {antecedent.nomMedecin}
                </p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => handleDelete(antecedent.id, 'antecedent')}
                >
                  Supprimer
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucun antécédent trouvé.</p>
          )}
        </div>
        <AntecedentFormDialog patientId={patient.id} onFormSubmit={handleFormSubmit} />
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg">Suivis</span>
          {suiviPatients.length > 0 ? (
            suiviPatients.map((suiviPatient: SuiviPatient) => (
              <div key={suiviPatient.id} className="border p-2 rounded">
                <p className="font-semibold">{suiviPatient.diagnostique}</p>
                <p>{suiviPatient.traitement}</p>
                <p className="text-gray-600 text-sm">
                  {new Date(suiviPatient.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })} - Médecin: {suiviPatient.medecinProfile.firstName} {suiviPatient.medecinProfile.lastName}
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(suiviPatient.id, 'suiviPatient')}
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOpenDialog(suiviPatient)}
                  >
                    Transformer en antécédent
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucun suivi de patient trouvé.</p>
          )}
        </div>
        <SuiviForm patientProfileId={patient.id} onFormSubmit={handleFormSubmit} />
      </div>
      {selectedSuivi && (
        <TransformToAntecedentDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={handleTransformToAntecedent}
        />
      )}
    </div>
  );
};

export default PatientContent;