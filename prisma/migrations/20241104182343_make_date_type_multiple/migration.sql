/*
  Warnings:

  - You are about to drop the column `dateTypeId` on the `dateplans` table. All the data in the column will be lost.
  - Added the required column `dateTypeId` to the `DatePlanBranches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dateplans` DROP FOREIGN KEY `DatePlans_dateTypeId_fkey`;

-- AlterTable
ALTER TABLE `dateplanbranches` ADD COLUMN `dateTypeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dateplans` DROP COLUMN `dateTypeId`;

-- AddForeignKey
ALTER TABLE `DatePlanBranches` ADD CONSTRAINT `DatePlanBranches_dateTypeId_fkey` FOREIGN KEY (`dateTypeId`) REFERENCES `DateTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
