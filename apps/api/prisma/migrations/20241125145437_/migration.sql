/*
  Warnings:

  - You are about to drop the column `fromDate` on the `Leave` table. All the data in the column will be lost.
  - You are about to drop the column `toDate` on the `Leave` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDateEndTime` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDateStartTime` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateEndTime` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateStartTime` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "fromDate",
DROP COLUMN "toDate",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endDateEndTime" TEXT NOT NULL,
ADD COLUMN     "endDateStartTime" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDateEndTime" TEXT NOT NULL,
ADD COLUMN     "startDateStartTime" TEXT NOT NULL;
