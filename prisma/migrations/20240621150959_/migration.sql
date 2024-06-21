-- CreateTable
CREATE TABLE `UserProfile` (
    `id` VARCHAR(191) NOT NULL,
    `avatar` LONGTEXT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `activated` BOOLEAN NOT NULL DEFAULT true,
    `role` ENUM('USER', 'DOCTOR', 'ADMIN') NOT NULL DEFAULT 'USER',
    `sexe` VARCHAR(191) NOT NULL,
    `adresseRegion` VARCHAR(191) NULL,
    `adresseDepartement` VARCHAR(191) NULL,
    `adresseVille` VARCHAR(191) NULL,
    `adresseRueEtNumero` VARCHAR(191) NULL,
    `telephoneMobile` VARCHAR(191) NULL,
    `telephoneFix` VARCHAR(191) NULL,
    `nbVotesPour` INTEGER NULL DEFAULT 0,
    `nbVotesContre` INTEGER NULL DEFAULT 0,
    `domainePrincipal` VARCHAR(191) NULL,
    `domainesSecondaires` VARCHAR(191) NULL,
    `conversations` JSON NULL,
    `socialWebsite` VARCHAR(191) NULL,
    `socialYoutube` VARCHAR(191) NULL,
    `socialTwitter` VARCHAR(191) NULL,
    `socialFacebook` VARCHAR(191) NULL,
    `socialLinkedin` VARCHAR(191) NULL,
    `socialInstagram` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `description` LONGTEXT NULL,
    `metier` VARCHAR(191) NULL,
    `tags` VARCHAR(191) NULL,
    `prixPcr` DOUBLE NULL,
    `dateDeCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateDeModification` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserProfile_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carteFactu` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `nomCarte` VARCHAR(191) NOT NULL,
    `numeroCarteQuatreDerniersChiffres` VARCHAR(191) NOT NULL,
    `numeroCarte` VARCHAR(191) NOT NULL,
    `dateExpiration` VARCHAR(191) NOT NULL,
    `cvv` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VotePour` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `voteType` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JWTToken` (
    `id` VARCHAR(191) NOT NULL,
    `token` LONGTEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `isActive` INTEGER NOT NULL DEFAULT 1,
    `validUntilTimeStamp` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Antecedent` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `type` ENUM('CHIRURGICAL', 'FAMILIAUX', 'PSYCHOLOGIQUES', 'TOXICOLOGIQUES', 'TRAUMATIQUES', 'VACCINAUX', 'ALLERGIQUES', 'AUTRES') NOT NULL,
    `details` VARCHAR(191) NOT NULL,
    `dateAntecedent` DATETIME(3) NOT NULL,
    `nomMedecin` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Suivi` (
    `id` VARCHAR(191) NOT NULL,
    `patientProfileId` VARCHAR(191) NOT NULL,
    `medecinProfileId` VARCHAR(191) NOT NULL,
    `diagnostique` VARCHAR(191) NOT NULL,
    `traitement` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diplome` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `diplomeName` VARCHAR(191) NOT NULL,
    `diplomeDateObtention` DATETIME(3) NOT NULL,
    `imageDiplome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Devis` (
    `id` VARCHAR(191) NOT NULL,
    `professionelId` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `rendezVousId` VARCHAR(191) NOT NULL,
    `prixAvantTVA` DOUBLE NOT NULL,
    `TVA` DOUBLE NOT NULL DEFAULT 0.2,
    `prixFinal` DOUBLE NOT NULL,
    `contenu` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `etat` ENUM('EN_ATTENTE', 'ACCEPTE', 'REFUSE') NOT NULL DEFAULT 'EN_ATTENTE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `professionelId` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `envoyeurId` VARCHAR(191) NOT NULL,
    `reveveurId` VARCHAR(191) NOT NULL,
    `rendezVousId` VARCHAR(191) NOT NULL,
    `etat` ENUM('NON_LU', 'LU') NOT NULL DEFAULT 'NON_LU',
    `title` VARCHAR(191) NOT NULL,
    `contenu` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `contenu` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostLike` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostComment` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `contenu` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RendezVous` (
    `id` VARCHAR(191) NOT NULL,
    `professionelId` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `duration` DOUBLE NOT NULL,
    `etat` ENUM('A_VENIR', 'PASSE', 'ANNULE') NOT NULL DEFAULT 'A_VENIR',
    `typeRendezVous` ENUM('CONSULTATION', 'EXAMEN', 'AUTRE') NOT NULL DEFAULT 'CONSULTATION',
    `description` LONGTEXT NOT NULL,
    `prix` DOUBLE NOT NULL,
    `fichierJoint` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Available` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `contenu` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewLike` (
    `id` VARCHAR(191) NOT NULL,
    `reviewId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewComment` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `reviewId` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `nbYes` INTEGER NOT NULL DEFAULT 0,
    `nbNo` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `conversationId` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `isLiked` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversation` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `membreCreateurId` VARCHAR(191) NOT NULL,
    `membreSuiveurId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Conversation_membreSuiveurId_idx`(`membreSuiveurId`),
    UNIQUE INDEX `Conversation_membreCreateurId_membreSuiveurId_key`(`membreCreateurId`, `membreSuiveurId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserProfileAbonnes` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserProfileAbonnes_AB_unique`(`A`, `B`),
    INDEX `_UserProfileAbonnes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carteFactu` ADD CONSTRAINT `carteFactu_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VotePour` ADD CONSTRAINT `VotePour_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JWTToken` ADD CONSTRAINT `JWTToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Antecedent` ADD CONSTRAINT `Antecedent_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Suivi` ADD CONSTRAINT `Suivi_patientProfileId_fkey` FOREIGN KEY (`patientProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Suivi` ADD CONSTRAINT `Suivi_medecinProfileId_fkey` FOREIGN KEY (`medecinProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diplome` ADD CONSTRAINT `Diplome_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Devis` ADD CONSTRAINT `Devis_professionelId_fkey` FOREIGN KEY (`professionelId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Devis` ADD CONSTRAINT `Devis_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Devis` ADD CONSTRAINT `Devis_rendezVousId_fkey` FOREIGN KEY (`rendezVousId`) REFERENCES `RendezVous`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_professionelId_fkey` FOREIGN KEY (`professionelId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_envoyeurId_fkey` FOREIGN KEY (`envoyeurId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_reveveurId_fkey` FOREIGN KEY (`reveveurId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_rendezVousId_fkey` FOREIGN KEY (`rendezVousId`) REFERENCES `RendezVous`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostComment` ADD CONSTRAINT `PostComment_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostComment` ADD CONSTRAINT `PostComment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RendezVous` ADD CONSTRAINT `RendezVous_professionelId_fkey` FOREIGN KEY (`professionelId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RendezVous` ADD CONSTRAINT `RendezVous_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Available` ADD CONSTRAINT `Available_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewLike` ADD CONSTRAINT `ReviewLike_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewLike` ADD CONSTRAINT `ReviewLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewComment` ADD CONSTRAINT `ReviewComment_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewComment` ADD CONSTRAINT `ReviewComment_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_membreCreateurId_fkey` FOREIGN KEY (`membreCreateurId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_membreSuiveurId_fkey` FOREIGN KEY (`membreSuiveurId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserProfileAbonnes` ADD CONSTRAINT `_UserProfileAbonnes_A_fkey` FOREIGN KEY (`A`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserProfileAbonnes` ADD CONSTRAINT `_UserProfileAbonnes_B_fkey` FOREIGN KEY (`B`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
