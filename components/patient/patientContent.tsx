"use client"
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '../ui/separator';
import React, { useState } from 'react';
import AntecedentFormDialog from './antecedentForm';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Antecedent = {
  id: string;
  type: 'CHIRURGICAL' | 'FAMILIAUX' | 'PSYCHOLOGIQUES' | 'TOXICOLOGIQUES' | 'TRAUMATIQUES' | 'VACCINAUX' | 'ALLERGIQUES' | 'AUTRES';
  details: string;
  dateAntecedent: Date;
  nomMedecin: string;
};

type PatientContentProps = {
  patient: {
    id: string | null;
    avatar: string | null;
    firstName: string;
    lastName: string;
    email: string | null;
    birthDate: Date | null;
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
};

const PatientContent: React.FC<PatientContentProps> = ({ patient, antecedents }) => {
  const router = useRouter()

  const handleFormSubmit = () => {
    router.refresh;
  };

  const handleDelete = async (id: string) => {
    const response = await fetch('/api/patient/delete-antecedent', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert('Antécédent supprimé avec succès');
      router.refresh;
    } else {
      alert('Erreur lors de la suppression de l\'antécédent');
    }
  };

  return (
    <div className="flex flex-col h-full border-t">
      <div className="p-4 flex items-center border-b">
        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center mr-4">
          {patient.avatar ? (
            <img
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
              ? new Date(patient.birthDate).toLocaleDateString('en-US', {
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
                  onClick={() => handleDelete(antecedent.id)}
                >
                  Supprimer
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucun antécédent trouvé.</p>
          )}
        </div>
        <AntecedentFormDialog patientId={patient.id || ''} onFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default PatientContent;