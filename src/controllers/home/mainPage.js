import { ApiPublica } from './apiPublicaItens.js'
import { Autenticador } from './verificadorLogin.js'
import { adminPage } from "../admin/cadastrarProduto.js"
import { botoesCategoria } from "../admin/cadastrarProduto.js"
import { PesquisaDinamica } from "./campoPesquisa.js"
import {ButtoesPesquisa} from "./buttoesPesquisa.js"
import { UsuarioAutenticadoAPI } from './usuarioAunteticadoAPI.js'
import { LocalStorage } from '../localStorage.js'
import { Carrinho } from './adicionarCarrinho.js'
import { RemoverCarrinhar} from './removerCarrinho.js'
// AUTENTICACAO
Autenticador.autenticar()
const verificacao = Autenticador.usuarioAtual()
if(verificacao == 'autenticado'){
    // RENDERIZAR CARRINHO
    const arrayProdutosCarrinho = await Carrinho.renderizarCarrinhoAutenticado()
    Carrinho.getProduto(arrayProdutosCarrinho)
    // DADOS DOS PRODUTOS
    const arrayProdutosAutenticado = await UsuarioAutenticadoAPI.produtos()
    // RENDERIZACAO PRODUTOS
    ApiPublica.template(arrayProdutosAutenticado)
    // RENDERIZACAO BOTOES CATEGORIAS
    adminPage.carregarCategorias("my/products", botoesCategoria, "Nav")
    // FILTRO POR PESQUISA
    const campoPesquisa = document.querySelector("#pesquisa")
    campoPesquisa.addEventListener("keyup", (e)=> {
        const infoPesquisa =  e.target.value 
        PesquisaDinamica.filtroPesquisa(arrayProdutosAutenticado, infoPesquisa)
    })
    // VALOR TOTAL CARRINHO
    const historicoCard = []
    const botoesAddCart = document.querySelectorAll('.adicionarNoCarrinho')
    botoesAddCart.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 
            const click = e.target
            const cardClick = click.closest('.cardProduto').id
            const produtoADD = {
                "product_id": `${cardClick}`
            }
             const filtro = arrayProdutosAutenticado.find((produto) => produto.id == cardClick)

            Carrinho.adicionarCarrinhoDinamic(filtro)
            Carrinho.adicionarCarrinhoAutenticado(produtoADD)
            const valores = document.querySelectorAll('.valorProdutoCarrinho')
            const qtdCarrinho = document.getElementById('spanQtdCarrinho')
            const totalCarrinho = document.getElementById('spanValorCarrinho')
            let valorTotal = 0
            let comprimento = []
            valores.forEach((valor) => {
                const valorAtual = Number(valor.innerText.slice(2))
                valorTotal   += valorAtual
                comprimento.push(valor)
            })
            qtdCarrinho.innerText = comprimento.length
            totalCarrinho.innerText = valorTotal.toFixed(2) 
        })
        })
    const botoesRemover = document.querySelectorAll('.tirarCarrinho')
    botoesRemover.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 
            const click = e.target
            const cardClick = click.closest('.cardProduto').id
            const cliqueCarrinho = cardClick.replace(/^./, "")
            const filtro = historicoCard.find((produto) => produto.id == cliqueCarrinho)
            RemoverCarrinhar.removerItemCarrinhoAutenticado(cliqueCarrinho)
            Carrinho.removerCarrinhoAutenticado(cardClick)
            })
        })
        const qtdCarrinho = document.getElementById('spanQtdCarrinho')
        const totalCarrinho = document.getElementById('spanValorCarrinho')
        const valores = document.querySelectorAll('.valorProdutoCarrinho')
         let valorTotal = 0
        let comprimento = []
        valores.forEach((valor) => {
            const valorAtual = Number(valor.innerText.slice(2))
            valorTotal   += valorAtual
            comprimento.push(valor)
        })
        qtdCarrinho.innerText = comprimento.length
        totalCarrinho.innerText = valorTotal.toFixed(2) 
        setTimeout(() => {
            const botoesFiltro = document.querySelectorAll(".categoriasVitrine")
            
            botoesFiltro.forEach((botao)=>{
                botao.addEventListener("click", filtrarCategorias)
                botao.addEventListener("click", ButtoesPesquisa.efeitoFocusButtonCategorias.bind(ButtoesPesquisa)) 
            })
        }, 500)
    let arrayProdutos = []
    function filtrarCategorias(event){
        const inputs = event.target
        arrayProdutosAutenticado.filter((produto)=>{
            if(produto.categoria.includes(inputs.value)){
                arrayProdutos.push(produto)
            }
            
        })
    ApiPublica.template(arrayProdutos)
    arrayProdutos = []
}
setTimeout(() => {
    const btnTodos = document.querySelector("#btnTodos")
    btnTodos.addEventListener("click", (e)=>{
        const clique = e.target.id
        if(clique == 'btnTodos'){
            ApiPublica.template(arrayProdutosAutenticado)
        }
    
        btnTodos.addEventListener("click", ButtoesPesquisa.efeitoFocusButtonTodos.bind(ButtoesPesquisa))
    })
}, 500)

}
if(verificacao == 'anonimo'){
    //CADASTRO PROD
    const cadastrarProdutos = document.getElementById('cadastrarProdutos')
    cadastrarProdutos.style.display = 'none'
    // DADOS DOS PRODUTOS
    const arrayProdutos = await ApiPublica.buscarProdutosApi()
    Carrinho.startCarrinhoAnonimo(arrayProdutos)
    // RENDERIZACAO PRODUTOS
    ApiPublica.template(arrayProdutos)
    // RENDERIZACAO BOTOES CATEGORIAS
    adminPage.carregarCategorias("products", botoesCategoria, "Nav")
    // FILTRO POR PESQUISA
    const campoPesquisa = document.querySelector("#pesquisa")
    campoPesquisa.addEventListener("keyup", (e)=> {
        const infoPesquisa =  e.target.value 
        PesquisaDinamica.filtroPesquisa(arrayProdutos, infoPesquisa)
    })
    // VALOR TOTAL CARRINHO
    const totalCarrinho = document.getElementById('spanValorCarrinho')
    let valorTotal = 0
    const valores = document.querySelectorAll('.valorProdutoCarrinho')
    valores.forEach((valor) => {
        const valorAtual = Number(valor.innerText.slice(2))
        valorTotal   += valorAtual
    })
    totalCarrinho.innerText = valorTotal
    const botoesAddCart = document.querySelectorAll('.adicionarNoCarrinho')
    botoesAddCart.forEach((btn) => { 
        btn.addEventListener("click", (e) => { 
            const click = e.target
            const cardClick = click.closest('.cardProduto').id
            Carrinho.adicionarNoCarrinhoAnonimo(cardClick, arrayProdutos)
            const qtdCarrinho = document.getElementById('spanQtdCarrinho')
            qtdCarrinho.innerText = Carrinho.arrayCarrinho.length
            const totalCarrinho = document.getElementById('spanValorCarrinho')
            let valorTotal = 0
            const valores = document.querySelectorAll('.valorProdutoCarrinho')
            valores.forEach((valor) => {
                const valorAtual = Number(valor.innerText.slice(2))
                valorTotal   += valorAtual
            })
            totalCarrinho.innerText = valorTotal.toFixed(2) 
        })
        })
        RemoverCarrinhar.removerItemCarrinhoAnonimo()
    // QUANTIDADE CARRINHO
    const qtdCarrinho = document.getElementById('spanQtdCarrinho')
    qtdCarrinho.innerText = Carrinho.arrayCarrinho.length
    //função que adiciona evento listen em todos os botoes da categoria
//inicio
   
setTimeout(() => {
    const btnTodos = document.querySelector("#btnTodos")
    const inputCategorias = document.querySelectorAll(".categoriasVitrine")
    //adiciona focus nos botoes
    for(let i = 1; i <  inputCategorias.length ; i++){
        inputCategorias[i].addEventListener("click", ButtoesPesquisa.filtrarCategorias.bind(ButtoesPesquisa))
        inputCategorias[i].addEventListener("click", ButtoesPesquisa.efeitoFocusButtonCategorias.bind(ButtoesPesquisa))                   
           
                               
    }
    btnTodos.addEventListener("click", ButtoesPesquisa.filtrarTotal.bind(ButtoesPesquisa))
    btnTodos.addEventListener("click", ButtoesPesquisa.efeitoFocusButtonTodos.bind(ButtoesPesquisa))
}, 500);
//fim
}
const campoPesquisa = document.querySelector("#pesquisa")
// DESLOGAR
const botaoDeslogar = document.getElementById('sairDaConta')
botaoDeslogar.addEventListener('click', () => {
    LocalStorage.clearUserLocalStorage()
    Autenticador.autenticar()
})
const btnAdicionarCarrinho = document.querySelector("#btnAdicionarCarrinho")
//btnAdicionarCarrinho.addEventListener()
// CARRINHO
// const btnAdicionarCarrinho = document.querySelector("#btnAdicionarCarrinho")
// btnAdicionarCarrinho.addEventListener()
