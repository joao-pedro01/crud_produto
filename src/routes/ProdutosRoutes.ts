import express from "express";
import ProdutoController from "../controllers/ProdutoController";

const router = express.Router();

router
    .get("/api/produtos/", ProdutoController.listarProdutos)

export default router;