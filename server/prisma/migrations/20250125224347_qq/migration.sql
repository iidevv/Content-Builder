/*
  Warnings:

  - You are about to drop the column `mediaId` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `media` table. All the data in the column will be lost.
  - Added the required column `instanceId` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_mediaId_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "mediaId";

-- AlterTable
ALTER TABLE "media" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "instanceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "thumbnailId" INTEGER;

-- CreateTable
CREATE TABLE "_SectionMedia" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SectionMedia_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SectionMedia_B_index" ON "_SectionMedia"("B");

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionMedia" ADD CONSTRAINT "_SectionMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionMedia" ADD CONSTRAINT "_SectionMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
