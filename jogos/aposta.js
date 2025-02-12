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

    constructor(
        quantidadeMinNumeros,
        quantidadeMaxNumeros,
        quantidadeNumeros,
        jogoPaiDessaAposta,
        nome
    ) {
        this.quantidadeMinNumeros = quantidadeMinNumeros;
        this.quantidadeMaxNumeros = quantidadeMaxNumeros;
        this.quantidadeNumeros = quantidadeNumeros;
        this.jogoPaiDessaAposta = jogoPaiDessaAposta;
        this.nome = nome;
        this.modal = null;
    }

    /* ontemIndiceApostaPeloNome(listaDeApostasAdicionadas, idAposta){
        listaDeApostasAdicionadas.forEach((aposta, indice) =>{
            if(aposta.nome === idAposta){
                return indice;
            }
        });
        return -1; //Se não encontrar nenhuma correspondencia
    } */

    adicionaApostaNoDocumento = () => {
        const divApostasRealizadas = document.querySelector("#apostas-realizadas");
        const divAposta = Utils.criaDiv(this.nome, "aposta", null, null, null);
        const botaoExibeModal = Utils.criaBotao(`botao-exibe-modal-numeros-${this.nome}`, "Selecionar Números", "btn btn-primary", null, null);
        botaoExibeModal.addEventListener("click", () => {
            this.modal = new Modal(this.nome, "Selecione números Aposta", "Carregar", this.cancelaSelecaoDeNumeros, this.exibeNumerosSelecionadosNoDocumento, this.jogoPaiDessaAposta);
            this.criaNumerosParaSelecionar(this.modal.divCorpoModal.id);
            this.backupNumeros = [...this.numeros];
            this.modal.exibe();
        })
        const divExibeModal = Utils.criaDiv(`div-exibe-modal-numeros-${this.nome}`, "div-botoes", null, null, null);
        if(this.jogoPaiDessaAposta.apostas.length > 0){
            const botaoExcluirAposta = Utils.criaBotao(`botao-excluir-aposta${this.nome}`,"Excluir", "btn btn-danger", null, null);
            botaoExcluirAposta.addEventListener("click", () =>{                
                const apostaVerificada = document.querySelector(`#${this.nome}-conferida`);
                if(apostaVerificada) apostaVerificada.remove();
                this.jogoPaiDessaAposta.excluirApostaPeloNome(this.nome);                
            });
            divExibeModal.appendChild(botaoExcluirAposta);
        }
        const divComNumeros = Utils.criaDiv(`numeros-${this.nome}`, "numeros-selecionados", "Numeros da aposta", null, null);
        divAposta.appendChild(divComNumeros);        
        divExibeModal.appendChild(botaoExibeModal);
        divAposta.appendChild(divExibeModal);
        divApostasRealizadas.appendChild(divAposta);
    }

    criaNumerosParaSelecionar(idContainer) {
        const divContainer = document.querySelector(`#${idContainer}`);
        const divNumerosParaSelecionar = Utils.criaDiv(`numeros-para-selecionar-${this.nome}`, "numeros-para-selecionar", null, null, null);
        const divsNumerosAdicionados = [];
        for (let i = 1; i <= this.quantidadeNumeros; i++) {
            const divNumero = Utils.criaDiv(`numero${i}-${this.nome}`, "numero-nao-selecionado", i, null, null);
            divNumero.addEventListener("click", (event) => {
                const elementoClicado = event.target;
                const numerosChegeramAoLimite = this.numeros.length == this.quantidadeMaxNumeros
                const removeSelecao = () => {
                    elementoClicado.classList.remove("numero-selecionado");
                    elementoClicado.classList.add("numero-nao-selecionado");
                    this.numeros = this.numeros.filter(numero => numero !== elementoClicado.textContent)
                }
                if (numerosChegeramAoLimite && elementoClicado.className == "numero-nao-selecionado") {
                    alert(`A aposta pode ter no máximo ${this.quantidadeMaxNumeros} números!`);
                } else if (numerosChegeramAoLimite && elementoClicado.className == "numero-selecionado") {
                    removeSelecao();
                } else if (this.numeros.length < this.quantidadeMaxNumeros) {
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
        if (this.numeros.length < this.quantidadeMinNumeros) {
            alert(`A aposta deve ter pelo menos ${this.quantidadeMinNumeros} números!`);
        } else {
            const aposta = document.querySelector(`#${this.nome}`);
            const divComNumerosJaExistente = document.querySelector(`#numeros-${this.nome}`);
            if (divComNumerosJaExistente) divComNumerosJaExistente.remove();
            const divComNumeros = Utils.criaDiv(`numeros-${this.nome}`, "numeros-selecionados", null, null, null);
            this.numeros.forEach((numero, indice) => {
                const divNumeroSelecionado = Utils.criaDiv(`numero${indice}-selecionado-${this.nome}`, "numero-selecionado", numero, null, null);
                divComNumeros.appendChild(divNumeroSelecionado);
            });
            aposta.insertAdjacentElement("afterbegin", divComNumeros);
            this.modal.destroi();
        }

    }

}