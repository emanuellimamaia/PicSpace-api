/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ImageTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ImageTags" DROP CONSTRAINT "_ImageTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageTags" DROP CONSTRAINT "_ImageTags_B_fkey";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_ImageTags";

-- CreateTable
CREATE TABLE "user_images" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageId" TEXT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToUserImage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TagToUserImage_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TagToUserImage_B_index" ON "_TagToUserImage"("B");

-- AddForeignKey
ALTER TABLE "user_images" ADD CONSTRAINT "user_images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUserImage" ADD CONSTRAINT "_TagToUserImage_A_fkey" FOREIGN KEY ("A") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUserImage" ADD CONSTRAINT "_TagToUserImage_B_fkey" FOREIGN KEY ("B") REFERENCES "user_images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
