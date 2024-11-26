/*
  Warnings:

  - You are about to drop the column `endDate` on the `Leave` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `Leave` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Leave` table. All the data in the column will be lost.
  - Added the required column `comments` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromDate` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaveType` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toDate` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "endDate",
DROP COLUMN "reason",
DROP COLUMN "startDate",
ADD COLUMN     "comments" TEXT NOT NULL,
ADD COLUMN     "fromDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "leaveType" TEXT NOT NULL,
ADD COLUMN     "toDate" TIMESTAMP(3) NOT NULL;
