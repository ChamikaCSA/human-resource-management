-- AlterTable
ALTER TABLE "User" ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "employmentType" DROP NOT NULL,
ALTER COLUMN "jobTitle" DROP NOT NULL,
ALTER COLUMN "workLocation" DROP NOT NULL;
