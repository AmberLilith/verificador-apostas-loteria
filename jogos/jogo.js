import { JogosEnum } from "../jogosEnum.js";
import { Utils } from "../utils.js";
import { Aposta } from "./aposta.js";
import { Sorteio } from "./sorteio.js";

export class Jogo {
  sorteios = [];
  apostas = [];
  numerosSelecionados = [];

  constructor(tipo) {
    const nomeConstanteJogoEnum = JogosEnum.getNomeConstanteByTipo(tipo);
    const constanteJogoEnum = JogosEnum[nomeConstanteJogoEnum];
    this.quantidadeMinNumerosApostas = constanteJogoEnum.qtddMinNumsAposta;
    this.quantidadeMaxNumerosApostas = constanteJogoEnum.qtddMaxNumsAposta;
    this.quantidadeNumerosParaSelecionar = constanteJogoEnum.qtddNumsParaSelecionar;
    this.quantidadeNumerosSorteio = constanteJogoEnum.qtddNumsSorteio;
    document.documentElement.style.setProperty("--cor-do-jogo", constanteJogoEnum.cor);
  }

  inicializaJogo() {
    this.limpaContainers();
    const cabecalhoSorteio = document.createElement("div");
      cabecalhoSorteio.classList.add("cabecalho");
      const tituloCabecalhoSorteio = document.createElement("h3");
      tituloCabecalhoSorteio.textContent = "Sorteio";
      cabecalhoSorteio.appendChild(tituloCabecalhoSorteio);
      document.querySelector("#sorteios").appendChild(cabecalhoSorteio);

      const cabecalhoApostasRealizadas = document.createElement("div");
      cabecalhoApostasRealizadas.classList.add("cabecalho");
      const tituloCabecalhoApostasRealizadas = document.createElement("h3");
      tituloCabecalhoApostasRealizadas.textContent = "Apostas";
      const botaoAdicionarAposta = document.createElement("button");
      botaoAdicionarAposta.addEventListener("click", () => {
        this.criarAposta();
      });
      botaoAdicionarAposta.id = "botao-adicionar-aposta";
      botaoAdicionarAposta.classList.add("btn", "btn-primary");
      botaoAdicionarAposta.textContent = "Adicionar";

      cabecalhoApostasRealizadas.appendChild(tituloCabecalhoApostasRealizadas);
      cabecalhoApostasRealizadas.appendChild(botaoAdicionarAposta);
      document.querySelector("#apostas-realizadas").appendChild(cabecalhoApostasRealizadas);
      const cabecalhoApostasConferidas = document.createElement("div");
      cabecalhoApostasConferidas.classList.add("cabecalho");
      const tituloCabecalhoApostasConferidas = document.createElement("h3");
      tituloCabecalhoApostasConferidas.textContent = "Conferir Apostas";
      const botaoConferirApostas = Utils.criaBotao("botao-conferir-apostas","Conferir","btn btn-primary",null, null);
      botaoConferirApostas.addEventListener("click", () => {
        this.conferirApostas();
      });
      cabecalhoApostasConferidas.appendChild(tituloCabecalhoApostasConferidas);
      cabecalhoApostasConferidas.appendChild(botaoConferirApostas);
      document.querySelector("#apostas-conferidas").appendChild(cabecalhoApostasConferidas);
    
    this.criarSorteio();
    this.criarAposta();
  }

  limpaContainers() {
    document.querySelector("#sorteios").replaceChildren();
    document.querySelector("#apostas-realizadas").replaceChildren();
    document.querySelector("#apostas-conferidas").replaceChildren();
  }

  criarSorteio() {
    const indiceNovoSorteio = this.sorteios.length + 1;
    const novoSorteio = new Sorteio(indiceNovoSorteio, this.quantidadeNumerosSorteio, this.quantidadeNumerosParaSelecionar, this);
    novoSorteio.adicionaSorteioNoDocumento();
    this.sorteios.push(novoSorteio);
  }

  criarAposta() {
    const nome = `aposta-${Utils.gerarHashDeString(`aposta-${this.apostas.length}`)}`;
    const novaAposta = new Aposta(this.quantidadeMinNumerosApostas, this.quantidadeMaxNumerosApostas, this.quantidadeNumerosParaSelecionar, this, nome);
    novaAposta.adicionaApostaNoDocumento();
    this.apostas.push(novaAposta);
    this.conferirApostas();
  }

  excluirApostaPeloNome(nomeAposta) {
    this.apostas.forEach((aposta, indice) => {
      if (aposta.nome === nomeAposta) {
        document.querySelector(`#${aposta.nome}`).remove();
        this.apostas.splice(indice, 1);
      }
    })
  }

  conferirApostas(){
    const divConferirApostas = document.querySelector("#apostas-conferidas");
    this.removerApostasConferidas();
    this.apostas.forEach((aposta) => {
      if (this.sorteios[0].numeros.length == 0) {
        const divApostaConferida = Utils.criaDiv(`${aposta.nome}-conferida`, "aposta-conferida", null, null, null);
        const divNumerosConferidos = Utils.criaDiv(`${aposta.nome}-numeros-conferidos`, "numeros-selecionados", "Sem sorteio para conferência", null, null);
        divApostaConferida.appendChild(divNumerosConferidos);
        divConferirApostas.appendChild(divApostaConferida);
      } else if (aposta.numeros.length == 0) {
        const divApostaConferida = Utils.criaDiv(`${aposta.nome}-conferida`, "aposta-conferida", null, null, null);
        const divNumerosConferidos = Utils.criaDiv(`${aposta.nome}-numeros-conferidos`, "numeros-selecionados", "Aposta sem número selecionados", null, null);
        divApostaConferida.appendChild(divNumerosConferidos);
        divConferirApostas.appendChild(divApostaConferida);
      } else {
        const acertos = aposta.numeros.filter(numero => this.sorteios[0].numeros.includes(numero));
        const divApostaConferida = Utils.criaDiv(`${aposta.nome}-conferida`, "aposta-conferida", null, null, null);
        const divNumerosConferidos = Utils.criaDiv(`${aposta.nome}-numeros-conferidos`, "numeros-selecionados", null, null, null);
        this.sorteios[0].numeros.forEach((numero, indice) => {
          const divNumeroConferido = Utils.criaDiv(`numero-${indice}-${aposta.nome}-conferida`, null, numero, null, null);
          if (acertos.includes(numero)) {
            divNumeroConferido.className = "numero-selecionado";
          } else {
            divNumeroConferido.className = "numero-nao-selecionado";
          }
          divNumerosConferidos.appendChild(divNumeroConferido);
          divApostaConferida.appendChild(divNumerosConferidos);
        });
        divConferirApostas.appendChild(divApostaConferida);
      }
    })
  }

  removerApostasConferidas() {
    this.apostas.forEach(aposta => {
      const apostaConferida = document.querySelector(`#${aposta.nome}-conferida`);
      if (apostaConferida) apostaConferida.remove();
    })
  }


}