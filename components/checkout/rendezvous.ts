import { DateTime } from 'luxon';

export enum EtatRendezVous {
  A_VENIR = 'A_VENIR',
  PASSE = 'PASSE',
  ANNULE = 'ANNULE',
}

export enum TypeRendezVous {
  CONSULTATION = 'CONSULTATION',
  EXAMEN = 'EXAMEN',
}

export interface RendezVousProps {
  id: string;
  professionelId: string;
  patientId: string;
  startDate: Date | string;
  endDate?: Date | string;
  duration: number;
  etat: EtatRendezVous;
  typeRendezVous: TypeRendezVous;
  description: string;
  prix: number;
  fichierJoint?: string;
}

export default class RendezVous {
  id: string;
  professionelId: string;
  patientId: string;
  startDate: DateTime;
  endDate?: DateTime;
  duration: number;
  etat: EtatRendezVous;
  typeRendezVous: TypeRendezVous;
  description: string;
  prix: number;
  fichierJoint?: string;

  constructor(props: RendezVousProps) {
    this.id = props.id;
    this.professionelId = props.professionelId;
    this.patientId = props.patientId;
    this.startDate = typeof props.startDate === 'string' ? DateTime.fromISO(props.startDate) : DateTime.fromJSDate(props.startDate);
    this.endDate = props.endDate ? (typeof props.endDate === 'string' ? DateTime.fromISO(props.endDate) : DateTime.fromJSDate(props.endDate)) : undefined;
    this.duration = props.duration;
    this.etat = props.etat;
    this.typeRendezVous = props.typeRendezVous;
    this.description = props.description;
    this.prix = props.prix;
    this.fichierJoint = props.fichierJoint;
  }

  toJSON() {
    return {
      id: this.id,
      professionelId: this.professionelId,
      patientId: this.patientId,
      startDate: this.startDate.toISO(),
      endDate: this.endDate ? this.endDate.toISO() : undefined,
      duration: this.duration,
      etat: this.etat,
      typeRendezVous: this.typeRendezVous,
      description: this.description,
      prix: this.prix,
      fichierJoint: this.fichierJoint,
    };
  }

  validate() {
    // Add validation logic here
    return true;
  }
}