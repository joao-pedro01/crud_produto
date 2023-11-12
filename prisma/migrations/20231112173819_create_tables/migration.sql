-- CreateTable
CREATE TABLE "produto" (
    "id" SERIAL NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
