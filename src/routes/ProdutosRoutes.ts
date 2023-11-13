import express from "express";
import ProdutoController from "../controllers/ProdutoController";

const router = express.Router();

router
    // Rota para obter produtos com um determinado nome via parâmetro de consulta
    // /api/produtos?produto=celular
    .get("/api/produtos/", ProdutoController.listarProdutos)
    .get("/api/produtos/:id", ProdutoController.listarProdutosPorId)
    .post("/api/produtos/", ProdutoController.inserirProduto)
    .put("/api/produtos/:id", ProdutoController.alterarProduto)
    .delete("/api/produtos/:id", ProdutoController.deletarProduto)

export default router;