import { Produto } from '../classes/Produto';
import { alterarProduto, contarCategoria, deletarProduto, inserirProduto, listarProdutos, listarProdutosPorId } from '../models/ProdutoModel';

class ProdutoController {
    
    /**
     * Lista os produtos de acordo com o filtro fornecido.
     * @param {string} filtro - O filtro a ser aplicado na busca dos produtos.
     * @returns {Promise<Produto[]>} Uma promessa que retorna um array de objetos Produto.
    */
    static listarProdutos(req: any, res: any): void {
        listarProdutos(req.query.produto).then((produtos: Produto[]) => {
            res.status(200).json(produtos);
        }).catch(() => {
            res.status(500).json({ message: 'Erro ao listar produtos' });
        });
    }

    /**
     * Retorna um produto pelo seu ID do banco de dados.
     * @param {number} id - O ID do produto a ser retornado.
     * @returns {Promise<Produto | null>} - Uma Promise que resolve com o produto encontrado ou null se não encontrado.
    */
    static listarProdutosPorId(req: any, res: any): void {
        let objProduto: Produto = new Produto();
        objProduto.setId(parseInt(req.params.id));

        listarProdutosPorId(objProduto.getId()).then((produto: Produto | null) => {
            if(!produto) {
                return res.status(404).json({ message: "Produto não encontrado!" });
            }
            res.status(200).json(produto);
        }).catch(() => {
            res.status(500).json({ message: 'Erro ao listar produto por id' });
        });
    }

    
    /**
     * Insere um novo produto no sistema.
     * 
     * @remarks
     * Este método recebe um objeto `req` que contém as informações do produto a ser inserido e um objeto `res` que será utilizado para enviar a resposta da requisição HTTP.
     * 
     * @param req - O objeto que contém as informações do produto a ser inserido.
     * @param res - O objeto que será utilizado para enviar a resposta da requisição HTTP.
     * 
     * @returns void
     * 
     * @throws {Error} Se ocorrer um erro ao inserir o produto.
    */
    static inserirProduto(req: any, res: any): void {
        let produto: Produto = new Produto();

        if(!req.body.nome) {
            return res.status(400).json({ message: "Nome é obrigatório!" });
        }
        if(!req.body.idCategoria) {
            return res.status(400).json({ message: "Id da categoria é obrigatório!" });
        }else if(!Number.isInteger(req.body.idCategoria)) {
            return res.status(400).json({ message: "Id da categoria deve ser um número inteiro!" });
        }
        produto.setNome(req.body.nome);
        produto.setIdCategoria(req.body.idCategoria);

        contarCategoria(produto.getIdCategoria()).then((categoria: number) => {
            if(categoria === 0) {
                return res.status(404).json({ message: "Categoria não encontrada!" });
            }
        }).catch(() => {
            return res.status(500).json({ message: 'Erro cadastrar produto' });
        });

        inserirProduto(produto).then((status: boolean) => {
            if(!status) {
                return res.status(500).json({ message: "Erro ao cadastrar produto!" });
            }

            res.status(200).json(`${produto.getNome()} inserido com sucesso!`);
        }).catch(() => {
            res.status(500).json({ message: 'Erro ao listar produto por id' });
        });
    }
    
    /**
     * Altera um produto existente no banco de dados.
     * @param req - O objeto de requisição HTTP.
     * @param res - O objeto de resposta HTTP.
     * @returns void
     * 
     * @description Este método recebe uma requisição HTTP contendo os dados de um produto a ser alterado no banco de dados. 
     * Caso o produto exista, ele é atualizado com as informações fornecidas na requisição. 
     * Se o idCategoria for fornecido, o método verifica se a categoria existe no banco de dados antes de atualizar o produto.
     * Se o produto for atualizado com sucesso, uma mensagem de sucesso é enviada na resposta HTTP.
     * Caso contrário, uma mensagem de erro é enviada na resposta HTTP.
    */
    static alterarProduto(req: any, res: any): void {
        let produto: Produto = new Produto();
        produto.setId(parseInt(req.params.id));

        if(req.body.nome) {
            produto.setNome(req.body.nome);
        }

        if(req.body.idCategoria) {
            if(!Number.isInteger(req.body.idCategoria)) {
                return res.status(400).json({ message: "Id da categoria deve ser um número inteiro!" });
            }
            produto.setIdCategoria(req.body.idCategoria);
            console.log(produto.getIdCategoria());
            contarCategoria(produto.getIdCategoria()).then((categoria: number) => {
                if(categoria === 0) {
                    return res.status(404).json({ message: "Categoria não encontrada!" });
                }
            }).catch(() => {
                res.status(500).json({ message: 'Erro cadastrar produto' });
            });
        }

        listarProdutosPorId(produto.getId()).then((resProduto: Produto | null) => {
            if(!resProduto) {
                return res.status(404).json({ message: "Produto não encontrado!" });
            }

            alterarProduto(produto).then((bool: boolean) => {
                if(!bool) {
                    return res.status(406).json({ message: 'Erro ao atualizar produto!' });
                }
                res.status(200).json(`${resProduto.getNome()} alterado com sucesso!`);
            }).catch(() => {
                res.status(500).json({ message: 'Erro ao listar produto por id' });
            });
        }).catch(() => {
            res.status(500).json({ message: 'Erro ao alterar produto' });
        });
    }
    
    /**
     * Deleta um produto pelo seu ID.
     * @param req - O objeto de requisição HTTP.
     * @param res - O objeto de resposta HTTP.
     * @returns Uma resposta HTTP com uma mensagem de sucesso ou erro.
     * Se o produto não for encontrado, retorna um status 404 com uma mensagem de erro.
     * Se ocorrer um erro ao deletar o produto, retorna um status 500 com uma mensagem de erro.
    */
    static deletarProduto(req: any, res: any): void {
        let produto: Produto = new Produto();
        produto.setId(parseInt(req.params.id));

        listarProdutosPorId(produto.getId()).then((produto) => {           
            if(!produto) {
                return res.status(404).json({ message: "Produto não encontrado!" });
            }

            deletarProduto(produto.getId()).then((bool: boolean) => {
                return res.status(200).json(`${produto.getNome()} excluído com sucesso!`);
            }).catch(() => {
                return res.status(500).json({ message: 'Erro ao deletar produto' });
            });
        }).catch(() => {
            return res.status(500).json({ message: 'Erro ao deletar produto' });
        });        
    }
}

export default ProdutoController;