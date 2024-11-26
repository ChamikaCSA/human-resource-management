/*
  Warnings:

  - Made the column `endDateStartTime` on table `Leave` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDateEndTime` on table `Leave` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Leave" ALTER COLUMN "endDateStartTime" SET NOT NULL,
ALTER COLUMN "startDateEndTime" SET NOT NULL;
