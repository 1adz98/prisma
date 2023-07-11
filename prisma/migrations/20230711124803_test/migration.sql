/*
  Warnings:

  - You are about to drop the column `userId` on the `userpreference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userIdPreference]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `userpreference` DROP FOREIGN KEY `UserPreference_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `userIdPreference` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `userpreference` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `User_userIdPreference_key` ON `User`(`userIdPreference`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userIdPreference_fkey` FOREIGN KEY (`userIdPreference`) REFERENCES `UserPreference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
