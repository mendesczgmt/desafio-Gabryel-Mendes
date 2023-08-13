import { validarCompra } from "./validarCompra.js";

class CaixaDaLanchonete {   
    calcularValorDaCompra(metodoDePagamento, itens) {
        const validacao = new validarCompra()
        return validacao.validarCompra(metodoDePagamento, itens)
        
    }
}

export { CaixaDaLanchonete };
