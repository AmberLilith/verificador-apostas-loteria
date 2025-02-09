import { jogosEnum } from "../jogosEnum.js";
import { Aposta } from "./aposta.js";
import { Sorteio } from "./sorteio.js";

export class Jogo{
    sorteios = [];
    apostas = [];
    numerosSelecionados = [];

    constructor(tipo){
        const nomeConstanteJogoEnum = jogosEnum.getNomeConstanteByTipo(tipo);
        const constanteJogoEnum = jogosEnum[nomeConstanteJogoEnum];
        this.quantidadeMinNumerosApostas = constanteJogoEnum.qtddMinNumsAposta;
        this.quantidadeMaxNumerosApostas = constanteJogoEnum.qtddMaxNumsAposta;        
        this.quantidadeNumerosParaSelecionar = constanteJogoEnum.qtddNumsParaSelecionar;
        this.quantidadeNumerosSorteio = constanteJogoEnum.qtddNumsSorteio;
        document.documentElement.style.setProperty("--cor-do-jogo", constanteJogoEnum.cor);
    }

    inicializaJogo(){
      const botaoAdicionaAposta = document.querySelector("#botao-adiciona-aposta");
      botaoAdicionaAposta.addEventListener("click", () =>{
        this.criaAposta();
      });
      this.criaSorteio();
      this.criaAposta();
    }

    criaSorteio(){
        const indiceNovoSorteio = this.sorteios.length + 1;
        const novoSorteio = new Sorteio(indiceNovoSorteio,this.quantidadeNumerosSorteio, this.quantidadeNumerosParaSelecionar);
        novoSorteio.adicionaSorteioNoDocumento();
        this.sorteios.push(novoSorteio);   
    }

    criaAposta(){
        const indiceNovaAposta = this.apostas.length;
        const novaAposta = new Aposta(indiceNovaAposta, this.quantidadeMinNumerosApostas, this.quantidadeMaxNumerosApostas, this.quantidadeNumerosParaSelecionar);
        novaAposta.adicionaApostaNoDocumento(this.apostas);
        this.apostas.push(novaAposta);        
    }

    
}