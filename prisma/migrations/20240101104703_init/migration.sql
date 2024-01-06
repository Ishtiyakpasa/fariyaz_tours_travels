-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "adult_count" INTEGER NOT NULL,
    "child_count" INTEGER NOT NULL,
    "contact" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "travel_date" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "adult_price" DOUBLE PRECISION NOT NULL,
    "child_price" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "package_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "departure_city" TEXT NOT NULL,
    "small_thumb" TEXT NOT NULL,
    "large_thumb" TEXT NOT NULL,
    "gallary_image" JSONB NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL,
    "arrival_date" TIMESTAMP(3) NOT NULL,
    "adult_price" DOUBLE PRECISION NOT NULL,
    "child_price" DOUBLE PRECISION NOT NULL,
    "hotel_distence" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "hotel" TEXT NOT NULL,
    "package_category_id" INTEGER NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_us" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "conatct" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_us_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "packages_name_key" ON "packages"("name");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_package_category_id_fkey" FOREIGN KEY ("package_category_id") REFERENCES "package_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
