import { Utils } from "../utils.js";

export class Jogo{
    sorteio = [];
    apostas = [];
    numerosSelecionados = [];
    divsApostasAdicionadas = [];

    constructor(
        quantidadeMinNumerosApostas,
        quantidadeMaxNumerosApostas,
        quantidadeNumerosAposta,
        quantidadeNumerosSorteio
    ){
        this.quantidadeMinNumerosApostas = quantidadeMinNumerosApostas;
        this.quantidadeMaxNumerosApostas = quantidadeMaxNumerosApostas;        
        this.quantidadeNumerosAposta = quantidadeNumerosAposta;
        this.quantidadeNumerosSorteio = quantidadeNumerosSorteio;
    }

    inicializaJogo(){
      const botaoAdicionaAposta = document.querySelector("#botao-adiciona-aposta");
      botaoAdicionaAposta.addEventListener("click", () =>{
        this.adicionaAposta();
      });
      this.criaSorteio();
      this.adicionaAposta();
    }

    criaSorteio(){
        const sorteios = document.querySelector("#sorteios");
        const divSorteio = Utils.criaDiv("sorteio", "sorteio", null, null, null);
        const titulo = Utils.criaH("titulo-sorteio","h2","Sorteio",null);
        sorteios.appendChild(titulo);
        for (let i = 1; i <= this.quantidadeNumerosSorteio; i++) {
            const divNumero = Utils.criaDiv(`numero${i}-sorteio`,"numero", i,null, null);
            divNumero.addEventListener("click", (event) =>{
                if(event.target.className == "numero"){
                    event.target.className = "numero-selecionado";
                    this.sorteio.push(event.target.textContent);
                }else{
                    event.target.className = "numero"
                    this.sorteio = this.sorteio.filter(numero => numero !== event.target.textContent)
                }
            });
            divSorteio.appendChild(divNumero);
        }
        sorteios.appendChild(divSorteio);
    }

    adicionaAposta(){
        this.apostas.push([]);
        const indiceNovaAposta = this.apostas.length -1;
        console.log("indice nova aposta " + indiceNovaAposta)
        const divApostasRealizadas = document.querySelector("#apostas-realizadas");
        const nomeAposta = `aposta-${indiceNovaAposta}`;
        const divAposta = Utils.criaDiv(nomeAposta, "aposta", null, null, null);
        const botaoExibeModal = Utils.criaBotao(`botao-exibe-modal-numeros-${nomeAposta}`,"Selecionar Números","btn btn-primary",null);
        botaoExibeModal.addEventListener("click", () =>{
            this.exibeModalNumerosApostaParaSelecionar(indiceNovaAposta);
        })
        const divExibeModal = Utils.criaDiv(`div-exibe-modal-numeros-${nomeAposta}`,"div-botoes",null, null, null);
        divExibeModal.appendChild(botaoExibeModal);
        divAposta.appendChild(divExibeModal);
        divApostasRealizadas.appendChild(divAposta);
        this.divsApostasAdicionadas.push(divAposta);
        
    }

    criaNumerosApostaParaSelecionar(indiceAposta){
        const divNumerosParaSelecionar = document.querySelector("#numeros-para-selecionar");
        divNumerosParaSelecionar.replaceChildren();
        const nomeAposta = `aposta-${indiceAposta}`;
        for (let i = 1; i <= this.quantidadeNumerosAposta; i++) {
            const divNumero = Utils.criaDiv(`numero${i}-${nomeAposta}`,"numero", i,null, null);
            divNumero.addEventListener("click", (event) =>{
                if(event.target.className == "numero"){
                    event.target.className = "numero-selecionado";
                    this.apostas[indiceAposta].push(event.target.textContent);
                }else{
                    event.target.className = "numero"
                    this.apostas[indiceAposta] = this.apostas[indiceAposta].filter(numero => numero !== event.target.textContent)
                }
            });
            divNumerosParaSelecionar.appendChild(divNumero);
        }
    }

    exibeModalNumerosApostaParaSelecionar(indiceAposta){
        this.criaNumerosApostaParaSelecionar(indiceAposta);
        const modalNumeros = new bootstrap.Modal('#modal-numeros-aposta-para-selecionar');
        //modalNumeros.show();
    }

    carregaNumerosApostaSelecionados(){

    }
}