import { AdminAPI } from "./adminAPI.js"
import { CardProduto } from "./cardProdutos.js"
import { ButtoesPesquisa} from "./../home/buttoesPesquisa.js"

export class AddEventListener{
    static arrayProdutosAtual = []

    static async buscaAPI(){
            let arrayProdutosAtual = []
            const retorno = await AdminAPI.produtos()
            .then((result) => arrayProdutosAtual = result)
            this.arrayProdutosAtual = arrayProdutosAtual
    }

    static colocarADD(){
        this.buscaAPI() 
        setTimeout(() => {
            console.log(this.arrayProdutosAtual)
                const botoesFiltro = document.querySelectorAll(".categoriasVitrine")
                botoesFiltro.forEach((botao)=>{
                    botao.addEventListener("click", filtrarCategorias)
                    botao.addEventListener("click", ButtoesPesquisa.efeitoFocusButtonCategorias.bind(ButtoesPesquisa))
                })
            let arrayProdutos = []
            function filtrarCategorias(event){
            const inputs = event.target
            AddEventListener.arrayProdutosAtual.filter((produto)=>{
                if(produto.categoria.includes(inputs.value)){
                    arrayProdutos.push(produto)
                }
            })
            
            CardProduto.templateCard(arrayProdutos)
            arrayProdutos = []
            }
            const btnTodos = document.querySelector("#btnTodos")
            btnTodos.addEventListener("click", ButtoesPesquisa.efeitoFocusButtonTodos.bind(ButtoesPesquisa))
            btnTodos.addEventListener("click", (e)=>{
            const clique = e.target.id
            if(clique == 'btnTodos'){
                CardProduto.templateCard(this.arrayProdutosAtual)
                
            }
            })
           
        },500)
        
}
}