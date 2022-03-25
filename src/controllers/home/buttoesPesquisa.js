import { ApiPublica } from "./apiPublicaItens.js"

const content = await ApiPublica.buscarProdutosApi()
let inputArrtotal = []
let inputArrtotalSubtraido = []
function reset(){
const result = inputArrtotal.shift()
inputArrtotalSubtraido.push(result)
    
}
export class ButtoesPesquisa{
    static arrayProdutos = []

    static filtrarTotal(){
        
       content.filter((produto)=>{
            if(produto.categoria){
                this.arrayProdutos.push(produto)
                ApiPublica.template(this.arrayProdutos)
            }
        })

      
        this.arrayProdutos = []
    }


    static filtrarCategorias(event){

            const inputs = event.target

            content.filter((produto)=>{
                                                                        
                if(produto.categoria == inputs.value){
                   
                    
                    this.arrayProdutos.push(produto)
                }
                              
                       
            })
     
        ApiPublica.template(this.arrayProdutos)
        this.arrayProdutos = []
       
    }
    static efeitoFocusButtonTodos(event){
        const inputs = event.target
                     
            if(inputs.getAttribute("class") === "categoriasVitrine"){
                inputs.setAttribute("class","categoriaSelected")
                 if((inputs.getAttribute("class") === "categoriaSelected")){
                    reset()
                    inputArrtotal.push(inputs)
              
                    for(let i = 1; i < inputArrtotalSubtraido.length; i++){
                            inputArrtotalSubtraido[i].setAttribute("class","categoriasVitrine")
                            console.log(inputArrtotalSubtraido[i])
                    }
                }
                 
                console.log(inputArrtotal)
            }

            if(inputs.setAttribute("class","categoriaSelected")){
                inputs.setAttribute("class","categoriasVitrine")
                console.log(inputArrtotal)
            }
        console.log(inputs)
    }
    static efeitoFocusButtonCategorias(event){
        const inputs = event.target
                     
            if(inputs.getAttribute("class") === "categoriasVitrine"){
                inputs.setAttribute("class","categoriaSelected")
                 if((inputs.getAttribute("class") === "categoriaSelected")){
                    reset()
                    inputArrtotal.push(inputs)
              
                    for(let i = 1; i < inputArrtotalSubtraido.length; i++){
                            inputArrtotalSubtraido[i].setAttribute("class","categoriasVitrine")
                            console.log(inputArrtotalSubtraido[i])
                    }
                 }
                 
                console.log(inputArrtotal)
            }

            if(inputs.setAttribute("class","categoriaSelected")){
                inputs.setAttribute("class","categoriasVitrine")
                console.log(inputArrtotal)
            }
        console.log(inputs)
    }
 
}
 