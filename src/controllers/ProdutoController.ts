import Produto from '../classes/Produto';
import {
    
} from '../models/ProdutoModel';

class ProdutoController {
    static listarProdutos(req: any, res: any) {
        res.status(200).json({
            message: "Listando produtos"
        });
    }
}

export default ProdutoController;