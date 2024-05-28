-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'DOCTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "TypeAntecedent" AS ENUM ('CHIRURGICAL', 'FAMILIAUX', 'PSYCHOLOGIQUES', 'TOXICOLOGIQUES', 'TRAUMATIQUES', 'VACCINAUX', 'ALLERGIQUES', 'AUTRES');

-- CreateEnum
CREATE TYPE "EtatDevis" AS ENUM ('EN_ATTENTE', 'ACCEPTE', 'REFUSE');

-- CreateEnum
CREATE TYPE "EtatNotification" AS ENUM ('NON_LU', 'LU');

-- CreateEnum
CREATE TYPE "TypeRendezVous" AS ENUM ('CONSULTATION', 'EXAMEN', 'AUTRE');

-- CreateEnum
CREATE TYPE "EtatRendezVous" AS ENUM ('A_VENIR', 'PASSE', 'ANNULE');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT true,
    "secretToken" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "sexe" TEXT NOT NULL,
    "adresseRegion" TEXT,
    "adresseDepartement" TEXT,
    "adresseVille" TEXT,
    "adresseRueEtNumero" TEXT,
    "telephoneMobile" TEXT,
    "telephoneFix" TEXT,
    "nbVotesPour" INTEGER,
    "nbVotesContre" INTEGER,
    "domainePrincipal" TEXT,
    "domainesSecondaires" TEXT[],
    "conversations" JSONB[],
    "socialWebsite" TEXT,
    "socialYoutube" TEXT,
    "socialTwitter" TEXT,
    "socialFacebook" TEXT,
    "socialLinkedin" TEXT,
    "socialInstagram" TEXT,
    "video" TEXT,
    "cv" TEXT,
    "description" TEXT,
    "metier" TEXT,
    "tags" TEXT[],
    "prixPcr" DOUBLE PRECISION,
    "nbYes" INTEGER,
    "nbNo" INTEGER,
    "dateDeCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDeModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Antecedent" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "type" "TypeAntecedent" NOT NULL,
    "details" TEXT NOT NULL,
    "dateAntecedent" TIMESTAMP(3) NOT NULL,
    "nomMedecin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Antecedent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suivi" (
    "id" TEXT NOT NULL,
    "patientProfileId" TEXT NOT NULL,
    "medecinProfileId" TEXT NOT NULL,
    "diagnostique" TEXT NOT NULL,
    "traitement" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Suivi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diplome" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "diplomeName" TEXT NOT NULL,
    "diplomeDateObtention" TIMESTAMP(3) NOT NULL,
    "imageDiplome" TEXT NOT NULL,

    CONSTRAINT "Diplome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devis" (
    "id" TEXT NOT NULL,
    "professionelId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "rendezVousId" TEXT NOT NULL,
    "prixAvantTVA" DOUBLE PRECISION NOT NULL,
    "TVA" DOUBLE PRECISION NOT NULL DEFAULT 0.2,
    "prixFinal" DOUBLE PRECISION NOT NULL,
    "contenu" TEXT NOT NULL,
    "description" TEXT,
    "etat" "EtatDevis" NOT NULL DEFAULT 'EN_ATTENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Devis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "professionelId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "envoyeurId" TEXT NOT NULL,
    "reveveurId" TEXT NOT NULL,
    "rendezVousId" TEXT NOT NULL,
    "etat" "EtatNotification" NOT NULL DEFAULT 'NON_LU',
    "title" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostComment" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RendezVous" (
    "id" TEXT NOT NULL,
    "professionelId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "duration" DOUBLE PRECISION NOT NULL,
    "etat" "EtatRendezVous" NOT NULL DEFAULT 'A_VENIR',
    "typeRendezVous" "TypeRendezVous" NOT NULL DEFAULT 'CONSULTATION',
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "fichierJoint" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Available" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Available_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewLike" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewComment" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "nbYes" INTEGER NOT NULL DEFAULT 0,
    "nbNo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "membreCreateurId" TEXT NOT NULL,
    "membreSuiveurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserProfileAbonnes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");

-- CreateIndex
CREATE INDEX "Conversation_membreSuiveurId_idx" ON "Conversation"("membreSuiveurId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_membreCreateurId_membreSuiveurId_key" ON "Conversation"("membreCreateurId", "membreSuiveurId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserProfileAbonnes_AB_unique" ON "_UserProfileAbonnes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserProfileAbonnes_B_index" ON "_UserProfileAbonnes"("B");

-- AddForeignKey
ALTER TABLE "Antecedent" ADD CONSTRAINT "Antecedent_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suivi" ADD CONSTRAINT "Suivi_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suivi" ADD CONSTRAINT "Suivi_medecinProfileId_fkey" FOREIGN KEY ("medecinProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diplome" ADD CONSTRAINT "Diplome_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devis" ADD CONSTRAINT "Devis_professionelId_fkey" FOREIGN KEY ("professionelId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devis" ADD CONSTRAINT "Devis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devis" ADD CONSTRAINT "Devis_rendezVousId_fkey" FOREIGN KEY ("rendezVousId") REFERENCES "RendezVous"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_professionelId_fkey" FOREIGN KEY ("professionelId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_envoyeurId_fkey" FOREIGN KEY ("envoyeurId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_reveveurId_fkey" FOREIGN KEY ("reveveurId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_rendezVousId_fkey" FOREIGN KEY ("rendezVousId") REFERENCES "RendezVous"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_professionelId_fkey" FOREIGN KEY ("professionelId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Available" ADD CONSTRAINT "Available_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewLike" ADD CONSTRAINT "ReviewLike_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewLike" ADD CONSTRAINT "ReviewLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewComment" ADD CONSTRAINT "ReviewComment_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewComment" ADD CONSTRAINT "ReviewComment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_membreCreateurId_fkey" FOREIGN KEY ("membreCreateurId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_membreSuiveurId_fkey" FOREIGN KEY ("membreSuiveurId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProfileAbonnes" ADD CONSTRAINT "_UserProfileAbonnes_A_fkey" FOREIGN KEY ("A") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProfileAbonnes" ADD CONSTRAINT "_UserProfileAbonnes_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
