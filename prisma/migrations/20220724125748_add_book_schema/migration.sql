-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "edition" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publish_date" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "copies" INTEGER NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);
