import { PrismaClient, UserRole, TypeAntecedent, EtatDevis, EtatNotification, TypeRendezVous, EtatRendezVous } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Seed UserProfiles
  const userProfiles = await Promise.all(Array.from({ length: 10 }).map(async () => {
    return prisma.userProfile.create({
      data: {
        avatar: faker.image.avatar(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birthDate: faker.date.past({years: 30, refDate: new Date()}),
        activated: faker.datatype.boolean(),
        role: faker.helpers.arrayElement(Object.values(UserRole)),
        sexe: faker.person.sex(),
        adresseRegion: faker.location.state(),
        adresseDepartement: faker.location.state(),
        adresseVille: faker.location.city(),
        adresseRueEtNumero: faker.location.streetAddress(),
        telephoneMobile: faker.phone.number(),
        telephoneFix: faker.phone.number(),
        nbVotesPour: faker.number.int({min: 5, max: 100}),
        nbVotesContre: faker.number.int({min: 5, max: 100}),
        domainePrincipal: faker.person.jobTitle(),
        domainesSecondaires: faker.person.jobTitle(),
        socialWebsite: faker.internet.url(),
        socialYoutube: faker.internet.url(),
        socialTwitter: faker.internet.url(),
        socialFacebook: faker.internet.url(),
        socialLinkedin: faker.internet.url(),
        socialInstagram: faker.internet.url(),
        video: faker.internet.url(),
        description: faker.lorem.paragraph(),
        metier: faker.person.jobTitle(),
        tags: faker.lorem.words(3),
        prixPcr: faker.number.float({ min: 50, max: 200 }),
        dateDeCreation: faker.date.past(),
        dateDeModification: faker.date.recent(),
      },
    });
  }));

  // Seed RendezVous
  const rendezVous = await Promise.all(userProfiles.map(async (user) => {
    return prisma.rendezVous.create({
      data: {
        professionelId: user.id,
        patientId: user.id,
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        duration: 30,
        etat: faker.helpers.arrayElement(Object.values(EtatRendezVous)),
        typeRendezVous: faker.helpers.arrayElement(Object.values(TypeRendezVous)),
        description: faker.lorem.paragraph(),
        prix: faker.number.float({ min: 50, max: 500 }),
        fichierJoint: faker.system.fileName(),
      },
    });
  }));

  // Seed Devis
  await Promise.all(rendezVous.map(async (rv) => {
    return prisma.devis.create({
      data: {
        professionelId: rv.professionelId,
        patientId: rv.patientId,
        rendezVousId: rv.id,
        prixAvantTVA: faker.number.float({ min: 100, max: 1000 }),
        prixFinal: faker.number.float({ min: 100, max: 1000 }),
        contenu: faker.lorem.paragraph(),
        description: faker.lorem.sentence(),
        etat: faker.helpers.arrayElement(Object.values(EtatDevis)),
      },
    });
  }));

  // Seed Notifications
  await Promise.all(rendezVous.map(async (rv) => {
    return prisma.notification.create({
      data: {
        professionelId: rv.professionelId,
        patientId: rv.patientId,
        envoyeurId: rv.professionelId,
        reveveurId: rv.patientId,
        rendezVousId: rv.id,
        etat: faker.helpers.arrayElement(Object.values(EtatNotification)),
        title: faker.lorem.sentence(),
        contenu: faker.lorem.paragraph(),
      },
    });
  }));

  // Seed carteFactu
  await Promise.all(userProfiles.map(async (user) => {
    return prisma.carteFactu.create({
      data: {
        userProfileId: user.id,
        nomCarte: faker.finance.creditCardIssuer(),
        numeroCarteQuatreDerniersChiffres: faker.finance.creditCardNumber().slice(-4),
        numeroCarte: faker.finance.creditCardNumber(),
        dateExpiration: faker.date.future().toISOString().slice(0, 10),
        cvv: faker.finance.creditCardCVV(),
      },
    });
  }));

  // Seed VotePour
  await Promise.all(userProfiles.map(async (user) => {
    return prisma.votePour.create({
      data: {
        userProfileId: user.id,
        voteType: faker.number.int({ min: 1, max: 5 }),
      },
    });
  }));

  // Seed JWTToken
  await Promise.all(userProfiles.map(async (user) => {
    return prisma.jWTToken.create({
      data: {
        token: faker.string.alphanumeric(32),
        userId: user.id,
        isActive: faker.number.int({ min: 0, max: 1 }),
        validUntilTimeStamp: faker.date.future().toISOString(),
      },
    });
  }));

  // Seed Antecedent
  await Promise.all(userProfiles.map(async (user) => {
    return prisma.antecedent.create({
      data: {
        userProfileId: user.id,
        type: faker.helpers.arrayElement(Object.values(TypeAntecedent)),
        details: faker.lorem.paragraph(),
        dateAntecedent: faker.date.past(),
        nomMedecin: faker.person.lastName(),
      },
    });
  }));

  // Seed Suivi
  await Promise.all(userProfiles.map(async (user) => {
    return prisma.suivi.create({
      data: {
        patientProfileId: user.id,
        medecinProfileId: faker.helpers.arrayElement(userProfiles).id,
        diagnostique: faker.lorem.paragraph(),
        traitement: faker.lorem.sentence(),
      },
    });
  }));

  // Seed Diplome
  await Promise.all(userProfiles.map(async (user) => {
    return prisma.diplome.create({
      data: {
        userProfileId: user.id,
        diplomeName: faker.person.jobTitle(),
        diplomeDateObtention: faker.date.past(),
        imageDiplome: faker.image.url(),
      },
    });
  }));

  // Seed Available
  await Promise.all(userProfiles.map(async (user) => {
    return prisma.available.create({
      data: {
        userProfileId: user.id,
        startDate: faker.date.future(),
        endDate: faker.date.future(),
      },
    });
  }));

  // Seed Review
  const reviews = await Promise.all(userProfiles.map(async (user) => {
    return prisma.review.create({
      data: {
        userProfileId: user.id,
        titre: faker.lorem.sentence(),
        contenu: faker.lorem.paragraph(),
      },
    });
  }));

  // Seed ReviewComment
  await Promise.all(reviews.map(async (review) => {
    return prisma.reviewComment.create({
      data: {
        userProfileId: faker.helpers.arrayElement(userProfiles).id,
        reviewId: review.id,
        text: faker.lorem.paragraph(),
        nbYes: faker.number.int(100),
        nbNo: faker.number.int(100),
      },
    });
  }));

  // Seed ReviewLike
  await Promise.all(reviews.map(async (review) => {
    return prisma.reviewLike.create({
      data: {
        reviewId: review.id,
        userId: faker.helpers.arrayElement(userProfiles).id,
      },
    });
  }));

  // Seed Post
  const posts = await Promise.all(userProfiles.map(async (user) => {
    return prisma.post.create({
      data: {
        userProfileId: user.id,
        titre: faker.lorem.sentence(),
        contenu: faker.lorem.paragraph(),
        image: faker.image.url(),
      },
    });
  }));

  // Seed PostComment
  await Promise.all(posts.map(async (post) => {
    return prisma.postComment.create({
      data: {
        userProfileId: faker.helpers.arrayElement(userProfiles).id,
        postId: post.id,
        titre: faker.lorem.sentence(),
        contenu: faker.lorem.paragraph(),
      },
    });
  }));

  // Seed PostLike
  await Promise.all(posts.map(async (post) => {
    return prisma.postLike.create({
      data: {
        userProfileId: faker.helpers.arrayElement(userProfiles).id,
        postId: post.id,
      },
    });
  }));

  // Seed Message and Conversation
  const conversations = await Promise.all(userProfiles.map(async (user) => {
    return prisma.conversation.create({
      data: {
        name: faker.lorem.words(2),
        membreCreateurId: user.id,
        membreSuiveurId: faker.helpers.arrayElement(userProfiles).id,
      },
    });
  }));

  await Promise.all(conversations.map(async (conversation) => {
    return prisma.message.create({
      data: {
        userProfileId: faker.helpers.arrayElement(userProfiles).id,
        conversationId: conversation.id,
        text: faker.lorem.sentence(),
        isLiked: faker.datatype.boolean(),
      },
    });
  }));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
