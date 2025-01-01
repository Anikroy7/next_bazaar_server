/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `newsLetters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "newsLetters_email_key" ON "newsLetters"("email");
