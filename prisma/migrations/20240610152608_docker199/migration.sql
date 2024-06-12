/*
  Warnings:

  - Added the required column `numeroCarteQuatreDerniersChiffres` to the `carteFactu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carteFactu` ADD COLUMN `numeroCarteQuatreDerniersChiffres` VARCHAR(191) NOT NULL;
