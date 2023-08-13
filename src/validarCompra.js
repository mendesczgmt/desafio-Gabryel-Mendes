const DEBITO = "debito"
const DINHEIRO = "dinheiro"
const CREDITO = "credito"

class validarCompra {
    constructor() {
        this.carrinho = []
        this.metodoPagamento = [DEBITO, DINHEIRO, CREDITO];
        this.valorFinal = 0.00
        this.Cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        }
        this.extraPrincipal = {
            "queijo": "sanduiche",
            "chantily": "cafe"
        }
        this.nomesItens = []
    }

    validarCompra(formaDePagamento,itens) {
        if(!this.carrinhoTemItens(itens)) {
        return "Não há itens no carrinho de compra!"
      }

        if(!this.FormaPagamentoValida(formaDePagamento)) {
        return "Forma de pagamento inválida!";
      } 

        this.nomesItens = this.obterNomesDosItens(itens);

        for (const item of itens) {
            const [nome, quantidade] = item.split(',');

            if(!this.itemEstaNoCardapio(nome)) {
            return "Item inválido!"
            }  
            
            if(!this.QuantidadeValida(quantidade)) {
                return "Quantidade inválida!"
            }
            
            if(this.ItemExtra(nome) && !this.principalIncluido(this.extraPrincipal[nome])) {
                return "Item extra não pode ser pedido sem o principal"
              }

            this.carrinho.push(nome)
            this.valorFinal += this.Cardapio[nome] * quantidade
            
        }
        
        this.calcularValorFinal(formaDePagamento)
        this.formatarValorFinal()
        return `R$ ${this.valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',')}`
    }
  
    carrinhoTemItens(itens) {
    	return itens.length > 0;
    }

  	FormaPagamentoValida(formaDePagamento) {
      return this.metodoPagamento.includes(formaDePagamento);
    }
  
  	obterNomesDosItens(itens) {
      let nomes = [];

      for (const item of itens) {
          const [nome] = item.split(',');
          nomes.push(nome)
      }

      return nomes
    }	
  
   	itemEstaNoCardapio(nome) {
      return nome in this.Cardapio
    }

  	QuantidadeValida(quantidade) {
      return quantidade > 0;
    }
  
  	ItemExtra(nome) {
      return this.extraPrincipal[nome] != undefined
    }
    
    principalIncluido(principal) {
      return this.nomesItens.includes(principal)
    }

    formatarValorFinal() {""
    this.valorFinal = Number.parseFloat(this.valorFinal).toFixed(2);
    }

    
    calcularValorFinal(formaDePagamento) {
      switch (formaDePagamento) {
          case DINHEIRO:
            this.valorFinal = this.valorFinal * 0.95
            break;
          case CREDITO:
            this.valorFinal = this.valorFinal * 1.03
            break;
          default:
            break
        }
  }

}

export {validarCompra};