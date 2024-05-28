/*
  Warnings:

  - The primary key for the `Available` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Conversation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `participants` on the `Conversation` table. All the data in the column will be lost.
  - The primary key for the `Devis` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appointmentId` on the `Devis` table. All the data in the column will be lost.
  - You are about to drop the column `prixAvantTva` on the `Devis` table. All the data in the column will be lost.
  - You are about to drop the column `tva` on the `Devis` table. All the data in the column will be lost.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `Message` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `recieverId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `PostComment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `PostComment` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `PostComment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PostComment` table. All the data in the column will be lost.
  - The primary key for the `PostLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `PostLike` table. All the data in the column will be lost.
  - The primary key for the `RendezVous` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idevent` on the `RendezVous` table. All the data in the column will be lost.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `nbno` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `nbyes` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Review` table. All the data in the column will be lost.
  - The primary key for the `ReviewComment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `ReviewComment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ReviewComment` table. All the data in the column will be lost.
  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `addressCite` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `addressGouvernerat` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `addressVille` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `diplome` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `domaineSecondaires` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `imageDiplome` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `nbno` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `nbyes` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[membreCreateurId,membreSuiveurId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Available` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membreCreateurId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membreSuiveurId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contenu` to the `Devis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prixAvantTVA` to the `Devis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rendezVousId` to the `Devis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Devis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contenu` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `envoyeurId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reveveurId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contenu` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titre` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contenu` to the `PostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titre` to the `PostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `PostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `PostLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `RendezVous` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RendezVous` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contenu` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titre` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ReviewComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `ReviewComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateDeModification` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `sexe` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Available" DROP CONSTRAINT "Available_userProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Devis" DROP CONSTRAINT "Devis_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "Devis" DROP CONSTRAINT "Devis_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Devis" DROP CONSTRAINT "Devis_professionelId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_professionelId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_recieverId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_rendezVousId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "RendezVous" DROP CONSTRAINT "RendezVous_patientId_fkey";

-- DropForeignKey
ALTER TABLE "RendezVous" DROP CONSTRAINT "RendezVous_professionelId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userProfileId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewComment" DROP CONSTRAINT "ReviewComment_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewComment" DROP CONSTRAINT "ReviewComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserProfileAbonnes" DROP CONSTRAINT "_UserProfileAbonnes_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserProfileAbonnes" DROP CONSTRAINT "_UserProfileAbonnes_B_fkey";

-- AlterTable
ALTER TABLE "Available" DROP CONSTRAINT "Available_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userProfileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Available_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Available_id_seq";

-- AlterTable
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_pkey",
DROP COLUMN "participants",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "membreCreateurId" TEXT NOT NULL,
ADD COLUMN     "membreSuiveurId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Conversation_id_seq";

-- AlterTable
ALTER TABLE "Devis" DROP CONSTRAINT "Devis_pkey",
DROP COLUMN "appointmentId",
DROP COLUMN "prixAvantTva",
DROP COLUMN "tva",
ADD COLUMN     "TVA" DOUBLE PRECISION NOT NULL DEFAULT 0.2,
ADD COLUMN     "contenu" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "etat" TEXT NOT NULL DEFAULT 'en-attente',
ADD COLUMN     "prixAvantTVA" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rendezVousId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "professionelId" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Devis_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Devis_id_seq";

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "created",
DROP COLUMN "from",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userProfileId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "conversationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Message_id_seq";

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "date",
DROP COLUMN "recieverId",
DROP COLUMN "senderId",
ADD COLUMN     "contenu" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "envoyeurId" TEXT NOT NULL,
ADD COLUMN     "reveveurId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "professionelId" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ALTER COLUMN "rendezVousId" SET DATA TYPE TEXT,
ALTER COLUMN "etat" SET DEFAULT 'non-lu',
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Notification_id_seq";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "date",
DROP COLUMN "text",
DROP COLUMN "type",
DROP COLUMN "userId",
ADD COLUMN     "contenu" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "titre" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userProfileId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Post_id_seq";

-- AlterTable
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_pkey",
DROP COLUMN "date",
DROP COLUMN "text",
DROP COLUMN "userId",
ADD COLUMN     "contenu" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "titre" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userProfileId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PostComment_id_seq";

-- AlterTable
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userProfileId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PostLike_id_seq";

-- AlterTable
ALTER TABLE "RendezVous" DROP CONSTRAINT "RendezVous_pkey",
DROP COLUMN "idevent",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "professionelId" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "etat" SET DEFAULT 'a-venir',
ALTER COLUMN "typeRendezVous" SET DEFAULT 'consultation',
ADD CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RendezVous_id_seq";

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
DROP COLUMN "date",
DROP COLUMN "description",
DROP COLUMN "nbno",
DROP COLUMN "nbyes",
DROP COLUMN "type",
ADD COLUMN     "contenu" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "titre" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userProfileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Review_id_seq";

-- AlterTable
ALTER TABLE "ReviewComment" DROP CONSTRAINT "ReviewComment_pkey",
DROP COLUMN "date",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nbNo" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "nbYes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userProfileId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "reviewId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ReviewComment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ReviewComment_id_seq";

-- AlterTable
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_pkey",
DROP COLUMN "addressCite",
DROP COLUMN "addressGouvernerat",
DROP COLUMN "addressVille",
DROP COLUMN "date",
DROP COLUMN "diplome",
DROP COLUMN "domaineSecondaires",
DROP COLUMN "imageDiplome",
DROP COLUMN "nbno",
DROP COLUMN "nbyes",
DROP COLUMN "rating",
ADD COLUMN     "adresseDepartement" TEXT,
ADD COLUMN     "adresseRegion" TEXT,
ADD COLUMN     "adresseRueEtNumero" TEXT,
ADD COLUMN     "adresseVille" TEXT,
ADD COLUMN     "conversations" JSONB[],
ADD COLUMN     "dateDeCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateDeModification" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "domainesSecondaires" TEXT[],
ADD COLUMN     "nbNo" INTEGER,
ADD COLUMN     "nbVotesContre" INTEGER,
ADD COLUMN     "nbVotesPour" INTEGER,
ADD COLUMN     "nbYes" INTEGER,
ADD COLUMN     "socialWebsite" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "activated" SET DEFAULT true,
ALTER COLUMN "role" SET DEFAULT 'user',
ALTER COLUMN "sexe" SET NOT NULL,
ALTER COLUMN "telephoneMobile" DROP NOT NULL,
ALTER COLUMN "telephoneMobile" SET DATA TYPE TEXT,
ALTER COLUMN "telephoneFix" DROP NOT NULL,
ALTER COLUMN "telephoneFix" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserProfile_id_seq";

-- AlterTable
ALTER TABLE "_UserProfileAbonnes" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

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
CREATE TABLE "ReviewLike" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Conversation_membreSuiveurId_idx" ON "Conversation"("membreSuiveurId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_membreCreateurId_membreSuiveurId_key" ON "Conversation"("membreCreateurId", "membreSuiveurId");

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
