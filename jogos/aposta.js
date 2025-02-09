import { Modal } from "../modal/modal.js";
import { Utils } from "../utils.js";

export class Aposta {
    numeros = [];
    /* Usado quando usuário cancelar/fechar
    o modal de seleção de número sem ser clicando no botaoAcao, 
    se a variavel numeros já tiver valores selecionados,
    backupNumeros vai ter os mesmo valores da variavel numeros que já
    tinham sido adicionados. backupNumeros será usado
    para desfazer as alterações que o usuário fez na variavel numeros */
    backupNumeros = [];

    constructor(indiceAposta,
        quantidadeMinNumerosApostas,
        quantidadeMaxNumerosApostas,
        quantidadeNumerosAposta,
    ) {
        this.indiceAposta = indiceAposta;
        this.quantidadeMinNumerosApostas = quantidadeMinNumerosApostas;
        this.quantidadeMaxNumerosApostas = quantidadeMaxNumerosApostas;
        this.quantidadeNumerosAposta = quantidadeNumerosAposta;
        this.modal = null;
    }

    adicionaApostaNoDocumento(listaDeApostasAdicionadas) {
        const divApostasRealizadas = document.querySelector("#apostas-realizadas");
        const nomeAposta = `aposta-${this.indiceAposta}`;
        const divAposta = Utils.criaDiv(nomeAposta, "aposta", null, null, null);
        const botaoExibeModal = Utils.criaBotao(`botao-exibe-modal-numeros-${nomeAposta}`, "Selecionar Números", "btn btn-primary", null, null);
        botaoExibeModal.addEventListener("click", () => {
            this.modal = new Modal(`aposta-${this.indiceAposta}`, `Selecione números Aposta ${this.indiceAposta}`, "Carregar", this.cancelaSelecaoDeNumeros, this.exibeNumerosSelecionadosNoDocumento);
            this.criaNumerosParaSelecionar(this.modal.divCorpoModal.id);
            this.backupNumeros = [...this.numeros];
            this.modal.exibe();
        })
        const divExibeModal = Utils.criaDiv(`div-exibe-modal-numeros-${nomeAposta}`, "div-botoes", null, null, null);
        if(this.indiceAposta > 0){
            const botaoExcluirAposta = Utils.criaBotao(`botao-excluir-aposta${nomeAposta}`,"Excluir", "btn btn-danger", null, null);
            botaoExcluirAposta.addEventListener("click", () =>{
                document.querySelector(`#${nomeAposta}`).remove();
                listaDeApostasAdicionadas.splice(this.indiceAposta,1);
            });
            divExibeModal.appendChild(botaoExcluirAposta);
        }
        const divComNumeros = Utils.criaDiv(`numeros-${nomeAposta}`, "numeros-selecionados", "Numeros da aposta", null, null);
        divAposta.appendChild(divComNumeros);        
        divExibeModal.appendChild(botaoExibeModal);
        divAposta.appendChild(divExibeModal);
        divApostasRealizadas.appendChild(divAposta);
    }

    criaNumerosParaSelecionar(idContainer) {
        const divContainer = document.querySelector(`#${idContainer}`);
        const nomeAposta = `aposta-${this.indiceAposta}`;
        const divNumerosParaSelecionar = Utils.criaDiv(`numeros-para-selecionar-${nomeAposta}`, "numeros-para-selecionar", null, null, null);
        const divsNumerosAdicionados = [];
        for (let i = 1; i <= this.quantidadeNumerosAposta; i++) {
            const divNumero = Utils.criaDiv(`numero${i}-${nomeAposta}`, "numero-nao-selecionado", i, null, null);
            divNumero.addEventListener("click", (event) => {
                const elementoClicado = event.target;
                const numerosChegeramAoLimite = this.numeros.length == this.quantidadeMaxNumerosApostas
                const removeSelecao = () => {
                    elementoClicado.classList.remove("numero-selecionado");
                    elementoClicado.classList.add("numero-nao-selecionado");
                    this.numeros = this.numeros.filter(numero => numero !== elementoClicado.textContent)
                }
                if (numerosChegeramAoLimite && elementoClicado.className == "numero-nao-selecionado") {
                    alert(`A aposta pode ter no máximo ${this.quantidadeMaxNumerosApostas} números!`);
                } else if (numerosChegeramAoLimite && elementoClicado.className == "numero-selecionado") {
                    removeSelecao();
                } else if (this.numeros.length < this.quantidadeMaxNumerosApostas) {
                    if (elementoClicado.className == "numero-nao-selecionado") {
                        elementoClicado.classList.remove("numero-nao-selecionado");
                        elementoClicado.classList.add("numero-selecionado");
                        this.numeros.push(elementoClicado.textContent);
                    } else {
                        removeSelecao();
                    }
                }
            });

            divsNumerosAdicionados.push(divNumero)
            divNumerosParaSelecionar.appendChild(divNumero);
        }
        divContainer.appendChild(divNumerosParaSelecionar);
        divsNumerosAdicionados.forEach(divNumero => {
            if (this.numeros.includes(divNumero.textContent)) {
                divNumero.classList.remove("numero-nao-selecionado");
                divNumero.classList.add("numero-selecionado");
            }
        })
    }

    cancelaSelecaoDeNumeros = () => {
        this.numeros = [...this.backupNumeros];
        this.backupNumeros = [];
    }

    /* Função exibeNumerosSelecionadosNoDocumento abaixo
         precisa ser arrow function porque é passada como 
        argumento no construtor da classe Modal. Passando como
        arrow function o this chamando dentro dessa função vai
        se referir ao objeto da classe que contem a função,
        caso contrário, o this vai se referir ao objeto atual, 
        nesse caso, objeto da classe Modal. */
    exibeNumerosSelecionadosNoDocumento = () => {
        if (this.numeros.length < this.quantidadeMinNumerosApostas) {
            alert(`A aposta deve ter pelo menos ${this.quantidadeMinNumerosApostas} números!`);
        } else {
            const aposta = document.querySelector(`#aposta-${this.indiceAposta}`);
            const divComNumerosJaExistente = document.querySelector(`#numeros-aposta-${this.indiceAposta}`);
            if (divComNumerosJaExistente) divComNumerosJaExistente.remove();
            const divComNumeros = Utils.criaDiv(`numeros-aposta-${this.indiceAposta}`, "numeros-selecionados", null, null, null);
            this.numeros.forEach((numero, indice) => {
                const divNumeroSelecionado = Utils.criaDiv(`numero${indice}-selecionado-aposta-${this.indiceAposta}`, "numero-selecionado", numero, null, null);
                divComNumeros.appendChild(divNumeroSelecionado);
            });
            aposta.insertAdjacentElement("afterbegin", divComNumeros);
            this.modal.destroi();
        }

    }

}