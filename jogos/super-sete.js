import { Utils } from "../utils.js";

export class SuperSete {
    constructor() {
        this.colunas = Array.from({ length: 7 }, () => []); // 7 colunas vazias
        this.numerosSorteados = [];
    }

    inicializaJogo() {
        this.limpaContainers();
        this.criarGradeApostas();
        this.criarBotoes();
    }

    limpaContainers() {
        document.querySelector("#sorteios").replaceChildren();
        document.querySelector("#apostas-realizadas").replaceChildren();
        document.querySelector("#apostas-conferidas").replaceChildren();
    }

    criarGradeApostas() {
        const container = document.querySelector("#apostas-realizadas");
        const grid = document.createElement("div");
        grid.classList.add("grid-super-sete");
        
        for (let coluna = 0; coluna < 7; coluna++) {
            const colunaDiv = document.createElement("div");
            colunaDiv.classList.add("coluna");
            
            for (let linha = 0; linha < 10; linha++) {
                const numero = linha;
                const celula = document.createElement("div");
                celula.classList.add("celula");
                celula.textContent = numero;
                celula.dataset.coluna = coluna;
                celula.dataset.numero = numero;
                celula.addEventListener("click", () => this.selecionarNumero(coluna, numero, celula));
                colunaDiv.appendChild(celula);
            }
            grid.appendChild(colunaDiv);
        }
        container.appendChild(grid);
    }

    selecionarNumero(coluna, numero, celula) {
        const numerosSelecionados = this.colunas.flat().length;
        const jaSelecionado = this.colunas[coluna].includes(numero);
        
        if (jaSelecionado) {
            this.colunas[coluna] = this.colunas[coluna].filter(n => n !== numero);
            celula.classList.remove("selecionado");
        } else {
            if (this.colunas[coluna].length < 3 && numerosSelecionados < 21) {
                this.colunas[coluna].push(numero);
                celula.classList.add("selecionado");
            }
        }
    }

    criarBotoes() {
        const container = document.querySelector("#apostas-realizadas");
        const botaoConferir = Utils.criaBotao("botao-conferir-super-sete", "Conferir", "btn btn-primary", null, null);
        botaoConferir.addEventListener("click", () => this.conferirApostas());
        container.appendChild(botaoConferir);
    }

    sortearNumeros() {
        this.numerosSorteados = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10));
    }

    conferirApostas() {
        if (this.numerosSorteados.length === 0) {
            this.sortearNumeros();
        }
        
        const divConferir = document.querySelector("#apostas-conferidas");
        divConferir.replaceChildren();
        
        this.numerosSorteados.forEach((numero, coluna) => {
            const colunaDiv = document.createElement("div");
            colunaDiv.classList.add("coluna-conferida");
            
            const numeroDiv = document.createElement("div");
            numeroDiv.classList.add("numero-sorteado");
            numeroDiv.textContent = numero;
            
            const acertos = this.colunas[coluna].includes(numero);
            if (acertos) {
                numeroDiv.classList.add("acerto");
            }
            
            colunaDiv.appendChild(numeroDiv);
            divConferir.appendChild(colunaDiv);
        });
    }
}


/* super sete tem 7 colunas com 10 linhas com valores de 0 a 9. pode apostar até 21 numeros sendo pelo menos 1 numero por coluna, ou seja, o minimo de 7. acima de 7
pode marcar mais de um numero por coluna até dar no maximo 21. */