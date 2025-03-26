/*
  Warnings:

  - You are about to drop the `_TagToUserImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TagToUserImage" DROP CONSTRAINT "_TagToUserImage_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToUserImage" DROP CONSTRAINT "_TagToUserImage_B_fkey";

-- DropForeignKey
ALTER TABLE "user_images" DROP CONSTRAINT "user_images_userId_fkey";

-- DropTable
DROP TABLE "_TagToUserImage";

-- DropTable
DROP TABLE "user_images";

-- CreateTable
CREATE TABLE "pictures" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PictureToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PictureToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PictureToTag_B_index" ON "_PictureToTag"("B");

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PictureToTag" ADD CONSTRAINT "_PictureToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "pictures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PictureToTag" ADD CONSTRAINT "_PictureToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
