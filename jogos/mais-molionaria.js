import { Jogo } from "./jogo.js";


export class MaisMilionaria extends Jogo {
    numerosTrevo = [1, 2, 3, 4, 5, 6];
    trevosDaSorteSorteio = [];
    trevosDaSorteApostas = new Map();

    constructor(tipo) {
        super(tipo);
    }

    criarSorteio() {
        super.criarSorteio();
        const divSorteio = document.querySelector("#sorteio-1");
        const divTrevos = this.criarDivTrevos("sorteio", this.trevosDaSorteSorteio);

        const antecessor = document.querySelector("#div-exibe-modal-numeros-sorteio-1");
        if (antecessor && divSorteio) divSorteio.insertBefore(divTrevos, antecessor);
    }

    criarAposta() {
        super.criarAposta();
        const nomeAposta = this.apostas[this.apostas.length - 1].nome;
        const divAposta = document.querySelector(`#${nomeAposta}`);
        const divTrevos = this.criarDivTrevos(nomeAposta, []);

        this.trevosDaSorteApostas.set(nomeAposta, []);

        const antecessor = document.querySelector(`#div-exibe-modal-numeros-${nomeAposta}`);
        if (antecessor && divAposta) divAposta.insertBefore(divTrevos, antecessor);
    }

    criarDivTrevos(identificador, trevosSelecionados) {
        const divTrevos = document.createElement("div");
        divTrevos.id = `trevos-${identificador}`;
        divTrevos.classList.add("d-flex", "gap-2", "mt-3");

        this.numerosTrevo.forEach(numero => {
            const btn = document.createElement("button");
            btn.textContent = numero;
            btn.classList.add("btn", "btn-outline-primary");
            btn.dataset.numero = numero;

            if (trevosSelecionados.includes(numero)) {
                btn.classList.add("active");
            }

            btn.addEventListener("click", () => {
                this.alternarTrevo(identificador, numero, btn);
            });

            divTrevos.appendChild(btn);
        });

        return divTrevos;
    }

    alternarTrevo(identificador, numero, btn) {
        let trevosSelecionados = identificador === "sorteio"
            ? this.trevosDaSorteSorteio
            : this.trevosDaSorteApostas.get(identificador) || [];

        if (trevosSelecionados.includes(numero)) {
            // Se o número já está na lista, removemos ele
            trevosSelecionados = trevosSelecionados.filter(n => n !== numero);
            btn.classList.remove("active");
        } else {
            const maxTrevos = identificador === "sorteio" ? 2 : 6;

            if (trevosSelecionados.length < maxTrevos) {
                trevosSelecionados.push(numero);
                btn.classList.add("active");
            } else {
                alert(`Você só pode escolher ${maxTrevos} trevos da sorte!`);
                return; // ❌ Impede que a classe seja adicionada!
            }
        }

        // Atualiza os dados corretamente
        if (identificador === "sorteio") {
            this.trevosDaSorteSorteio = trevosSelecionados;
        } else {
            this.trevosDaSorteApostas.set(identificador, trevosSelecionados);
        }

        this.conferirApostas();
    }

    conferirApostas() {
        super.conferirApostas();
    
        if (this.trevosDaSorteSorteio.length === 0) return;
    
        this.apostas.forEach(aposta => {
            const nomeAposta = aposta.nome;
            const trevosAposta = this.trevosDaSorteApostas.get(nomeAposta) || [];
    
            // Removendo qualquer conferência anterior para evitar duplicação
            const apostaConferida = document.querySelector(`#${nomeAposta}-conferida`);
            let trevosConferidos = document.querySelector(`#trevos-${nomeAposta}-conferida`);
            if (trevosConferidos) {
                trevosConferidos.remove();
            }
    
            // Criando novo elemento para exibir os trevos conferidos
            trevosConferidos = document.createElement("div");
            trevosConferidos.id = `trevos-${nomeAposta}-conferida`;
            trevosConferidos.classList.add("d-flex", "gap-2", "justify-content-center", "mt-2");
    
            // Conferindo cada trevo da aposta individualmente
            trevosAposta.forEach(trevo => {
                const trevoSpan = document.createElement("span");
                trevoSpan.textContent = trevo;
                trevoSpan.classList.add("px-2", "py-1", "border", "rounded");
    
                if (this.trevosDaSorteSorteio.includes(trevo)) {
                    trevoSpan.style.color = "rgb(9, 23, 216)";
                    trevoSpan.style.borderColor = "rgb(9, 23, 216)";
                } else {
                    trevoSpan.style.color = "rgb(168, 169, 183)";
                    trevoSpan.style.borderColor = "rgb(168, 169, 183)";
                }
    
                trevosConferidos.appendChild(trevoSpan);
            });
    
            apostaConferida.appendChild(trevosConferidos);
        });
    }
    

    excluirApostaPeloNome(nomeAposta) {
        super.excluirApostaPeloNome(nomeAposta);
        this.trevosDaSorteApostas.delete(nomeAposta);
    }
}




/* export class MaisMilionaria extends Jogo {
    trevosDaSorteSorteios = [[]];
    trevosDaSorteApostas = [];
    quantidadeMinTrevosDaSorte = 2;
    quantidadeMaxTrevosDaSorte = 6;
    constructor(tipo) {
        super(tipo);
    }

    criarSorteio() {
        super.criarSorteio();
        const divSorteio = document.querySelector("#sorteio-1");
        const divTrevos = Utils.criaDiv(`div-trevos-sorte-sorteio-1`, "trevos-da-sorte", null, null, null);
        for (let i = 1; i <= this.quantidadeMaxTrevosDaSorte; i++) {
            const trevo = Utils.criaDiv(`div-trevo-sorte-${i}-sorteio-1`, "numero-nao-selecionado", i, null, null);
            trevo.addEventListener("click", (event) => {
                const elemento = event.target;
                if (elemento.className == "numero-nao-selecionado") {
                    elemento.classList.remove("numero-nao-selecionado");
                    elemento.classList.add("numero-selecionado");
                    this.trevosDaSorteSorteios[0].push(elemento.textContent);
                } else {
                    elemento.classList.remove("numero-selecionado");
                    elemento.classList.add("numero-nao-selecionado");
                    this.trevosDaSorteSorteios[0] = this.trevosDaSorteSorteios[0].filter(item => item !== elemento.textContent);
                }
            })
            divTrevos.appendChild(trevo);
        }
        const h2 = Utils.criaH(`titulo-trevos-sorte-sorteio-1`, "h3", "Trevos Da Sorte", null);
        if (divSorteio) {
            divSorteio.appendChild(h2);
            divSorteio.appendChild(divTrevos);
        }
    }

    criarAposta() {
        super.criarAposta();
        const nomeAposta = this.apostas[this.apostas.length - 1].nome;
        const divAposta = document.querySelector(`#${nomeAposta}`);
        const divTrevos = Utils.criaDiv(`div-trevos-sorte-${nomeAposta}`, "trevos-da-sorte", null, null, null);
        for (let i = 1; i <= this.quantidadeMaxTrevosDaSorte; i++) {
            const trevo = Utils.criaDiv(`div-trevo-sorte-${i}-${nomeAposta}`, "numero-nao-selecionado", i, null, null);
            trevo.addEventListener("click", (event) => {
                const elemento = event.target;
                if (elemento.className == "numero-nao-selecionado") {
                    elemento.classList.remove("numero-nao-selecionado");
                    elemento.classList.add("numero-selecionado");
                    this.trevosDaSorteSorteios[0].push(elemento.textContent);
                } else {
                    elemento.classList.remove("numero-selecionado");
                    elemento.classList.add("numero-nao-selecionado");
                    this.trevosDaSorteApostas[0] = this.trevosDaSorteSorteios[0].filter(item => item !== elemento.textContent);
                }
            })
            divTrevos.appendChild(trevo);
        }
        const h2 = Utils.criaH(`titulo-trevos-sorte-${nomeAposta}`, "h3", "Trevos Da Sorte", null);
        if (divAposta) {
            divAposta.appendChild(h2);
            divAposta.appendChild(divTrevos);
        }
    }
} */




/* milionaria = Escolhe de 6 até 10 números de 1 a 50 para acertar 7 numeros + escolhe de 2 a 6 números dentro de 6 para numeros da sorte com sorteio de 2 numeros da sorte

Resultado: 2, 9, 18, 26, 39, 47, 50

Aposta 1: 8, 15, 23, 31, 42, 48

Aposta 2: 5, 12, 20, 35, 45, 50 */