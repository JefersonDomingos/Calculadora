const operacoesAnterioresTexto = document.querySelector("#operacoes-anteriores");
const operacoesAtuaisTexto= document.querySelector("#operacoes-atuais");
const botoes = document.querySelectorAll("#botoes-caixa button");

class Calculator {
    constructor(operacoesAnterioresTexto, operacoesAtuaisTexto){ 
        //transformando elementos em propriedades do objeto
        this.operacoesAnterioresTexto = operacoesAnterioresTexto; 
        this.operacoesAtuaisTexto = operacoesAtuaisTexto; 
        this.operacaoAtual = ""; 

    }
    //vai mostrar os digitos na TELA
    addDigito(digito){ 
        
        if(digito ==="." && this.operacoesAtuaisTexto.innerText.includes(".")){
            return; 
        }
        this.operacaoAtual = digito;
        this.atualizarTela();
    }

    //Pocessar as operações da calculadora
    processarOperacoes(operacao){
    if(this.operacoesAtuaisTexto.innerText === "" && operacao !=="C"){
       
        if(this.operacoesAnterioresTexto.innerText !== ""){   
            this.trocarOperacao(operacao)
        }
        return;
    }
    //Pegando os valores digitados
        let valorOperacao;
        const anterior = +this.operacoesAnterioresTexto.innerText.split(" ")[0];
        const atual = +this.operacoesAtuaisTexto.innerText;

        switch(operacao){ //Verificar casos da operação 
            case "+":  
                valorOperacao = anterior + atual
                this.atualizarTela(valorOperacao, operacao, atual, anterior)
                break; 
            case "-":  
                valorOperacao = anterior - atual
                this.atualizarTela(valorOperacao, operacao, atual, anterior)
                break;
            case "*":  
                valorOperacao = anterior * atual
                this.atualizarTela(valorOperacao, operacao, atual, anterior)
                break;
            case "/":  
                valorOperacao = anterior / atual
                this.atualizarTela(valorOperacao, operacao, atual, anterior)
                break;
            case "DEL":
                this.processoDeletarOperador();
                break;
            case "CE":
                this.processoLimparOpearacaoAtual();
                break;
            case "C":
                this.LimparTodasOperacoes();
                break;
            case "=":
                this.processoIgualOperador();
                break;
            default:
                return;
        }        

    }
    
    atualizarTela(valorOperacao = null, operacao = null, atual = null, anterior = null){
        console.log(valorOperacao, operacao, anterior, atual)
        if(valorOperacao === null){
            this.operacoesAtuaisTexto.innerText += this.operacaoAtual;
        }else{
            if(anterior === 0){
                valorOperacao = atual
            }
            this.operacoesAnterioresTexto.innerText = `${valorOperacao} ${operacao}`;
            this.operacoesAtuaisTexto.innerText = "";
        } 
        
    }
    //trocar operacoes matemáticas 
    trocarOperacao(operacao){
        const matOperacoes = ["+", "-", "*", "/"]
        if(!matOperacoes.includes(operacao)){
            return;
        }
        this.operacoesAnterioresTexto.innerText = this.operacoesAnterioresTexto.innerText.slice(0, -1)+operacao;
    }

    //Deletar ultimo digito usando o slice(0, -1)
    processoDeletarOperador(){
        this.operacoesAtuaisTexto.innerText = this.operacoesAtuaisTexto.innerText.slice(0, -1)

    }
    //Limpar operacaoAtual
    processoLimparOpearacaoAtual(){
        this.operacoesAtuaisTexto.innerText = "";
    }
    //Limpar todas as operacoes
    LimparTodasOperacoes(){
        this.operacoesAtuaisTexto.innerText = "";
        this.operacoesAnterioresTexto.innerText = "";
    }
    //quando apertar o igual
    processoIgualOperador(){ 
        const operacao = operacoesAnterioresTexto.innerText.split(" ")[1];
        this.processarOperacoes(operacao);
    }

}

const calculo = new Calculator(operacoesAnterioresTexto, operacoesAtuaisTexto); 

botoes.forEach((btn) =>{
    btn.addEventListener("click", (elemento)=>{
        const valor = elemento.target.innerText; 
      
        //Separnado operações e numeros
        if(+valor >= 0 || valor==="."){  
            calculo.addDigito(valor); 
        }else{ 
            calculo.processarOperacoes(valor);

        }
    })
})


