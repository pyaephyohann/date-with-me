/*
  Warnings:

  - You are about to drop the `dateplanbranches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `dateplanbranches` DROP FOREIGN KEY `DatePlanBranches_datePlanId_fkey`;

-- DropForeignKey
ALTER TABLE `dateplanbranches` DROP FOREIGN KEY `DatePlanBranches_dateTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `dateplanbranches` DROP FOREIGN KEY `DatePlanBranches_drinkId_fkey`;

-- DropForeignKey
ALTER TABLE `dateplanbranches` DROP FOREIGN KEY `DatePlanBranches_foodId_fkey`;

-- DropForeignKey
ALTER TABLE `dateplanbranches` DROP FOREIGN KEY `DatePlanBranches_placeId_fkey`;

-- DropTable
DROP TABLE `dateplanbranches`;

-- CreateTable
CREATE TABLE `DatePlanPlaces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datePlanId` INTEGER NOT NULL,
    `placeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DatePlanFoods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datePlanId` INTEGER NOT NULL,
    `foodId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DatePlanDrinks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datePlanId` INTEGER NOT NULL,
    `drinkId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DatePlanDateTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datePlanId` INTEGER NOT NULL,
    `dateTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DatePlanPlaces` ADD CONSTRAINT `DatePlanPlaces_datePlanId_fkey` FOREIGN KEY (`datePlanId`) REFERENCES `DatePlans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatePlanPlaces` ADD CONSTRAINT `DatePlanPlaces_placeId_fkey` FOREIGN KEY (`placeId`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatePlanFoods` ADD CONSTRAINT `DatePlanFoods_datePlanId_fkey` FOREIGN KEY (`datePlanId`) REFERENCES `DatePlans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatePlanFoods` ADD CONSTRAINT `DatePlanFoods_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Foods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatePlanDrinks` ADD CONSTRAINT `DatePlanDrinks_datePlanId_fkey` FOREIGN KEY (`datePlanId`) REFERENCES `DatePlans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatePlanDrinks` ADD CONSTRAINT `DatePlanDrinks_drinkId_fkey` FOREIGN KEY (`drinkId`) REFERENCES `Drinks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatePlanDateTypes` ADD CONSTRAINT `DatePlanDateTypes_datePlanId_fkey` FOREIGN KEY (`datePlanId`) REFERENCES `DatePlans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatePlanDateTypes` ADD CONSTRAINT `DatePlanDateTypes_dateTypeId_fkey` FOREIGN KEY (`dateTypeId`) REFERENCES `DateTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
