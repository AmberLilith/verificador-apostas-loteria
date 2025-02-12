import { Utils } from "../utils.js";
import { Jogo } from "./jogo.js";

export class DiaDeSorte extends Jogo {
    meses = ["Selecione um mês", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    mesDaSorteSorteio = "";
    mesesDaSorteApostas = new Map();

    constructor(tipo) {
        super(tipo);
    }

    criarSelectMesSorte(id, cssClass, callback, nomeAposta = null) {
        const select = Utils.criaSelect(id, cssClass, this.meses, nomeAposta ? [{ "nome": "data-nome-aposta", "valor": nomeAposta }] : null);
        select.addEventListener("change", callback);
        return select;
    }

    criarSorteio() {
        super.criarSorteio();
        const divSorteio = document.querySelector("#sorteio-1");
        if (!divSorteio) return;

        const select = this.criarSelectMesSorte(
            "select-mes-sorte-sorteio1",
            "form-select mt-3",
            (event) => {
                this.mesDaSorteSorteio = event.target.value;
                this.conferirApostas();
            }
        );

        const antecessor = document.querySelector("#div-exibe-modal-numeros-sorteio-1");
        divSorteio.insertBefore(select, antecessor);
    }

    criarAposta() {
        super.criarAposta();
        const nomeAposta = this.apostas[this.apostas.length - 1].nome;
        const divAposta = document.querySelector(`#${nomeAposta}`);
        if (!divAposta) return;

        const select = this.criarSelectMesSorte(
            `select-mes-sorte-${nomeAposta}`,
            "form-select mt-3",
            (event) => {
                this.mesesDaSorteApostas.set(nomeAposta, event.target.value);
                this.conferirApostas();
            },
            nomeAposta
        );

        const antecessor = document.querySelector(`#div-exibe-modal-numeros-${nomeAposta}`);
        divAposta.insertBefore(select, antecessor);
    }

    conferirApostas() {
        super.conferirApostas();
        const mesDaSorteSorteio = this.mesDaSorteSorteio;
        if (!mesDaSorteSorteio) return;

        this.apostas.forEach((aposta) => {
            const nomeAposta = aposta.nome;
            const mesDaSorteAposta = this.mesesDaSorteApostas.get(nomeAposta);
            if (!mesDaSorteAposta) return;

            const apostaConferida = document.querySelector(`#${nomeAposta}-conferida`);
            if (!apostaConferida) return;

            const mesConferido = Utils.criaH(
                `mes-da-sorte-${nomeAposta}-conferida`,
                "h3",
                this.meses[mesDaSorteAposta],
                "text-center"
            );

            mesConferido.style.color = (mesDaSorteSorteio == mesDaSorteAposta) ? "rgb(9, 23, 216)" : "rgb(168, 169, 183)";
            apostaConferida.appendChild(mesConferido);
        });
    }

    excluirApostaPeloNome(nomeAposta) {
        super.excluirApostaPeloNome(nomeAposta);
        this.mesesDaSorteApostas.delete(nomeAposta);
    }
}


/* export class DiaDeSorte extends Jogo {
    meses = ["Selecione um mês", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    mesDaSorteSorteio = "";
    mesesDaSorteApostas = {};
    constructor(tipo) {
        super(tipo);
    }

    criarSorteio() {
        super.criarSorteio();
        const divSorteio = document.querySelector("#sorteio-1");
        const select = Utils.criaSelect("select-mes-sorte-sorteio1", "form-select mt-3", this.meses, null);
        select.addEventListener("change", (event) => {
            this.mesDaSorteSorteio = event.target.value;
            this.conferirApostas();
        });
        const antecessor = document.querySelector("#div-exibe-modal-numeros-sorteio-1");
        if (antecessor && divSorteio) divSorteio.insertBefore(select, antecessor);
    }

    criarAposta() {
        super.criarAposta();
        const nomeAposta = this.apostas[this.apostas.length - 1].nome;
        const divAposta = document.querySelector(`#${nomeAposta}`);
        const select = Utils.criaSelect(`select-mes-sorte-${nomeAposta}`, "form-select mt-3", this.meses, [{ "nome": "data-nome-aposta", "valor": nomeAposta }]);
        select.addEventListener("change", (event) => {
            this.mesesDaSorteApostas[nomeAposta].push(event.target.value);
            this.conferirApostas();
        });
        const antecessor = document.querySelector(`#div-exibe-modal-numeros-${nomeAposta}`);
        if (antecessor && divAposta) divAposta.insertBefore(select, antecessor);
    }

    conferirApostas() {
        super.conferirApostas();
        const mesDaSorteSorteio = this.mesDaSorteSorteio;
        const nomesApostas = this.apostas.map(aposta => aposta.nome);
        if (mesDaSorteSorteio != 0) {
            this.mesesDaSorteApostas.forEach((mesDaSorteAposta, indice) => {
                if (mesDaSorteAposta != 0) {
                    const nomeAposta = nomesApostas[indice];
                    const apostaConferida = document.querySelector(`#${nomeAposta}-conferida`);
                    const mesConferido = Utils.criaH(`mes-da-sorte-${nomeAposta}-conferida`, "h3", this.meses[mesDaSorteAposta], "text-center");
                    if (mesDaSorteSorteio == mesDaSorteAposta) {
                        mesConferido.style.color = "rgb(9, 23, 216)";
                    } else {
                        mesConferido.style.color = "rgb(168, 169, 183)";
                    }
                    apostaConferida.appendChild(mesConferido);
                }
            })
        }
    }

    excluirApostaPeloNome(nomeAposta){
        super.excluirApostaPeloNome(nomeAposta);
    }
} */

/* dia de sorte Escolhe de 7 a 11 numeros dentro de 31 numeros com sorteio de 7 numeros + escolhe um mes do ano para o sorteio de 1 mes 

Resultado:
5, 12, 23, 30, 1, 18, 27

Aposta 1:
2, 19, 25, 8, 15, 29, 4

Aposta 2:
9, 16, 31, 3, 22, 11, 26 */