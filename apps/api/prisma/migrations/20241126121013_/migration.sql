-- AlterTable
ALTER TABLE "User" ADD COLUMN     "leaveBalanceCasual" INTEGER NOT NULL DEFAULT 6,
ADD COLUMN     "leaveBalanceMedical" INTEGER NOT NULL DEFAULT 6;
