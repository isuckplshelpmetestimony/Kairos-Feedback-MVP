/*
  Warnings:

  - Added the required column `ownerToken` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN "ownerToken" TEXT NOT NULL DEFAULT 'legacy-token';
-- Remove the default so future inserts must provide a value
ALTER TABLE "Project" ALTER COLUMN "ownerToken" DROP DEFAULT;
