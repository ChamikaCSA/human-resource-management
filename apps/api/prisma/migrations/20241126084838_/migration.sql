-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Supervisor', 'Subordinate');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Role"[];
