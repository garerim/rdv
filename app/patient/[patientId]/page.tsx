import PatientContent from '@/components/patient/patientContent';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react';

interface PatientIdPageProps {
  params: {
    patientId: string;
  };
}

export default async function PatientIdPageProps({ params }: PatientIdPageProps) {
  const patient = await prisma.userProfile.findUnique({
    where: {
      id: params.patientId,
    },
    select: {
      id: true,
      avatar: true,
      firstName: true,
      lastName: true,
      email: true,
      birthDate: true,
      sexe: true,
      adresseRegion: true,
      adresseDepartement: true,
      adresseVille: true,
      adresseRueEtNumero: true,
      telephoneMobile: true,
      telephoneFix: true,
      metier: true,
      Antecedents: {
        select: {
          id: true,
          type: true,
          details: true,
          dateAntecedent: true,
          nomMedecin: true,
        },
      },
      SuiviPatient: {
        select: {
          id: true,
          diagnostique: true,
          traitement: true,
          createdAt: true,
          updatedAt: true,
          medecinProfileId: true,
          medecinProfile: true,
        },
      },
    },
  });

  if (!patient) {
    return redirect('/dashboard');
  }

  return (
    <>
      <PatientContent patient={patient} antecedents={patient.Antecedents} suiviPatients={patient.SuiviPatient} />
    </>
  );
}