import express from "express";
import { Application } from "express";
import produto from "./ProdutosRoutes";

const routes = (app: Application) => {
    // rotas principais
    app.use((req: any, res: any, next: any) => {
        res.append('Access-Control-Allow-Origin', '*');
        res.append('Access-Control-Allow-Headers', '*');
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    });

    app.use(
        express.json(),
        produto
    );
};
export default routes;