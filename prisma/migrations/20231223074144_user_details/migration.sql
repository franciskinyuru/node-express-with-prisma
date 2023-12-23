-- CreateTable
CREATE TABLE "UserDetails" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "job" TEXT NOT NULL,
    "jobdesc" TEXT NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_user_id_key" ON "UserDetails"("user_id");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
