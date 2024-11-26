-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_supervisorId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "supervisorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
