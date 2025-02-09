import { Modal } from "../modal/modal.js";
import { Utils } from "../utils.js";

export class Sorteio{
    numeros = [];
        /* Usado quando usuário cancelar/fechar
        o modal de seleção de número sem ser clicando no botaoAcao, 
        se a variavel numeros já tiver valores selecionados,
        backupNumeros vai ter os mesmo valores da variavel numeros que já
        tinham sido adicionados. backupNumeros será usado
        para desfazer as alterações que o usuário fez na variavel numeros */
        backupNumeros = [];
    
        constructor(indiceSorteio, quantidadeNumerosSorteio, quantidadeNumerosParaSelecionar) {
            this.indiceSorteio = indiceSorteio;
            this.quantidadeNumerosSorteio = quantidadeNumerosSorteio;
            this.quantidadeNumerosParaSelecionar = quantidadeNumerosParaSelecionar;
            this.modal = null;
        }
    
        adicionaSorteioNoDocumento() {
            const divSorteios = document.querySelector("#sorteios");
            const nomeSorteio = `sorteio-${this.indiceSorteio}`;
            const divSorteio = Utils.criaDiv(nomeSorteio, "sorteio", null, null, null);
            const botaoExibeModal = Utils.criaBotao(`botao-exibe-modal-numeros-${nomeSorteio}`, "Selecionar Números", "btn btn-primary", null, null);
            botaoExibeModal.addEventListener("click", () => {
                this.modal = new Modal(`sorteio-${this.indiceSorteio}`, `Selecione números Sorteio ${this.indiceSorteio}`, "Carregar", this.cancelaSelecaoDeNumeros, this.exibeNumerosSelecionadosNoDocumento);
                this.criaNumerosParaSelecionar(this.modal.divCorpoModal.id);
                this.backupNumeros = [...this.numeros];
                this.modal.exibe();
            })
            const divComNumeros = Utils.criaDiv(`numeros-${nomeSorteio}`, "numeros-selecionados", "Numeros do sorteio", null, null);
            divSorteio.appendChild(divComNumeros);
            const divExibeModal = Utils.criaDiv(`div-exibe-modal-numeros-${nomeSorteio}`, "div-botoes", null, null, null);
            divExibeModal.appendChild(botaoExibeModal);
            divSorteio.appendChild(divExibeModal);
            divSorteios.appendChild(divSorteio);
        }
    
        criaNumerosParaSelecionar(idContainer) {
            const divContainer = document.querySelector(`#${idContainer}`);
            const nomeSorteio = `sorteio-${this.indiceSorteio}`;
            const divNumerosParaSelecionar = Utils.criaDiv(`numeros-para-selecionar-${nomeSorteio}`, "numeros-para-selecionar", null, null, null);
            const divsNumerosAdicionados = [];
            for (let i = 1; i <= this.quantidadeNumerosParaSelecionar; i++) {
                const divNumero = Utils.criaDiv(`numero${i}-${nomeSorteio}`, "numero-nao-selecionado", i, null, null);
                divNumero.addEventListener("click", (event) => {
                    const elementoClicado = event.target;
                    const numerosChegeramAoLimite = this.numeros.length == this.quantidadeNumerosSorteio;
                    const removeSelecao = () => {
                        elementoClicado.classList.remove("numero-selecionado");
                        elementoClicado.classList.add("numero-nao-selecionado");
                        this.numeros = this.numeros.filter(numero => numero !== elementoClicado.textContent)
                    }
                    if (numerosChegeramAoLimite && elementoClicado.className == "numero-nao-selecionado") {
                        alert(`A sorteio pode ter no máximo ${this.quantidadeNumerosSorteio} números!`);
                    } else if (numerosChegeramAoLimite && elementoClicado.className == "numero-selecionado") {
                        removeSelecao();
                    } else if (this.numeros.length < this.quantidadeNumerosSorteio) {
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
            if (this.numeros.length < this.quantidadeNumerosSorteio) {
                alert(`A sorteio deve ter exatamente ${this.quantidadeNumerosSorteio} números!`);
            } else {
                const sorteio = document.querySelector(`#sorteio-${this.indiceSorteio}`);
                const divComNumerosJaExistente = document.querySelector(`#numeros-sorteio-${this.indiceSorteio}`);
                if (divComNumerosJaExistente) divComNumerosJaExistente.remove();
                const divComNumeros = Utils.criaDiv(`numeros-sorteio-${this.indiceSorteio}`, "numeros-selecionados", null, null, null);
                this.numeros.forEach((numero, indice) => {
                    const divNumeroSelecionado = Utils.criaDiv(`numero${indice}-selecionado-sorteio-${this.indiceSorteio}`, "numero-selecionado", numero, null, null);
                    divComNumeros.appendChild(divNumeroSelecionado);
                });
                sorteio.insertAdjacentElement("afterbegin", divComNumeros);
                this.modal.destroi();
            }
    
        }
}