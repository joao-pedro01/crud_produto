import { Categoria } from "../classes/Categoria";
import { Produto } from "../classes/Produto";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function listarProdutos(query: string): Promise<Produto[]> {
    let produtos: Produto[] = [];
    let categorias: Categoria[] = [];
    const result = await prisma.produto.findMany({
        include: {
            fk_categoria: true
        },
        where: {
            nome: { contains: query || undefined },
        }
    });
    await prisma.$disconnect();

    result.forEach((produto) => {
        let objProduto: Produto = new Produto();
        let objCategoria: Categoria = new Categoria();
        objProduto.setId(produto.id);
        objProduto.setNome(produto.nome);
        objProduto.setIsActive(produto.isActive);
        objProduto.setCreatedAt(produto.createdAt);
        objProduto.setUpdatedAt(produto.updatedAt);
        objCategoria.setId(produto.fk_categoria.id);
        objCategoria.setNome(produto.fk_categoria.nome);
        objCategoria.setIsActive(produto.fk_categoria.isActive);
        objCategoria.setCreatedAt(produto.fk_categoria.createdAt);
        objCategoria.setUpdatedAt(produto.fk_categoria.updatedAt);

        // indice para o array de categorias
        let indice = categorias.findIndex(categoria => categoria.getId() === produto.fk_categoria.id);

        // if para verificar se o objeto categoria já existe no array
        if (indice === -1) {
            objCategoria.setId(produto.fk_categoria.id);
            objCategoria.setNome(produto.fk_categoria.nome);
            objCategoria.setIsActive(produto.fk_categoria.isActive);
            objCategoria.setCreatedAt(produto.fk_categoria.createdAt);
            objCategoria.setUpdatedAt(produto.fk_categoria.updatedAt);
    
            objProduto.setCategoria(objCategoria);
            categorias.push(objCategoria);
            produtos.push(objProduto);
            return;
        }
        // se já existir, apenas atribui o objeto categoria ao produto
        objProduto.setCategoria(categorias[indice]);
        produtos.push(objProduto);
    });

    return produtos;
}

export async function listarProdutosPorId(id: number): Promise<Produto | null> {
    const result = await prisma.produto.findUnique({
        where: {
            id: id
        },
        include: {
            fk_categoria: true
        }
    });
    await prisma.$disconnect();

    if (!result) {
        return null;
    }

    let objProduto: Produto = new Produto();
    let objCategoria: Categoria = new Categoria();
    objProduto.setId(result.id);
    objProduto.setNome(result.nome);
    objProduto.setIsActive(result.isActive);
    objProduto.setCreatedAt(result.createdAt);
    objProduto.setUpdatedAt(result.updatedAt);
    objCategoria.setId(result.fk_categoria.id);
    objCategoria.setNome(result.fk_categoria.nome);
    objCategoria.setIsActive(result.fk_categoria.isActive);
    objCategoria.setCreatedAt(result.fk_categoria.createdAt);
    objCategoria.setUpdatedAt(result.fk_categoria.updatedAt);
    objProduto.setCategoria(objCategoria);    

    return objProduto;
}

export async function contarCategoria(id_categoria: number) {
    const categoria = await prisma.categoria.count({
        where: { id: id_categoria },
    });

    await prisma.$disconnect();
    return categoria; 
}

export async function inserirProduto(produto: Produto) {
    const result = await prisma.produto.create({
        data: {
            id_categoria: produto.getIdCategoria(),
            nome: produto.getNome(),
            preco: 5,
        }
    });

    await prisma.$disconnect();
    
    if (!result) {
        return false;
    }

    return true;
}

export async function alterarProduto(produto: Produto) {
    console.log(produto.getIdCategoria());
    console.log(produto.getNome());
    const result = await prisma.produto.update({
        where: {
            id: produto.getId()
        },
        data: {
            id_categoria: produto.getIdCategoria(),
            nome: produto.getNome(),
            preco: 5,
        }
    });

    await prisma.$disconnect();
    if (!result) {
        return false;
    }
    return true;
}

export async function deletarProduto(id: number) {
    const result = await prisma.produto.delete({
        where: {
            id: id
        }
    });

    await prisma.$disconnect();
    if (!result) {
        return false;
    }
    return true;
}