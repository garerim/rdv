export default class Devis {
    constructor({
      id,
      professionelId,
      patientId,
      rendezVousId,
      prixAvantTVA,
      TVA,
      prixFinal,
      contenu,
      description
    }) {
      this.id = id;
      this.professionelId = professionelId;
      this.patientId = patientId;
      this.rendezVousId = rendezVousId;
      this.prixAvantTVA = prixAvantTVA;
      this.TVA = TVA;
      this.prixFinal = prixFinal;
      this.contenu = contenu;
      this.description = description;
    }
  
    validate() {
      return (
        this.id &&
        this.professionelId && 
        this.patientId && 
        this.rendezVousId && 
        this.prixAvantTVA && 
        this.TVA && 
        this.prixFinal && 
        this.contenu && 
        this.description
      );
    }
  
    toJSON() {
      return {
        id: this.id,
        professionelId: this.professionelId,
        patientId: this.patientId,
        rendezVousId: this.rendezVousId,
        prixAvantTVA: this.prixAvantTVA,
        TVA: this.TVA,
        prixFinal: this.prixFinal,
        contenu: this.contenu,
        description: this.description,
      };
    }

    static fromJSON(json) {
      return new Metadata(json);
    }
  
    toString() {
      return `
        ID: ${this.id}
        Professionel ID: ${this.professionelId}
        Patient ID: ${this.patientId}
        Rendezvous ID: ${this.rendezVousId}
        Prix Avant TVA: ${this.prixAvantTVA}
        TVA: ${this.TVA}
        Prix Final: ${this.prixFinal}
        Contenu: ${this.contenu}
        Description: ${this.description}
      `;
    }
  }