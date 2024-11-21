/*
  Warnings:

  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workLocation` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "employmentType" TEXT NOT NULL,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "workLocation" TEXT NOT NULL;
