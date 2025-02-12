import { Utils } from "../utils.js";
import { Jogo } from "./jogo.js";


export class Timemania extends Jogo {
    times = ["Selecione um time", "São Paulo", "Fluminense", "Flamengo", "Grêmio", "Cruzeiro", "Atlético Mineiro", "Vasco", "Corinthians", "Santos", "Atlético Paranaense", "Internacional", "Esporte Clube"];
    timeCoracaoSorteio = "";
    timeCoracaoApostas = new Map();

    constructor(tipo) {
        super(tipo);
    }

    criarSorteio() {
        super.criarSorteio();
        const divSorteio = document.querySelector("#sorteio-1");
        const select = Utils.criaSelect("select-time-coracao-sorteio1", "form-select mt-3", this.times, null);
        
        select.addEventListener("change", (event) => {
            this.timeCoracaoSorteio = event.target.value;
            this.conferirApostas();
        });

        const antecessor = document.querySelector("#div-exibe-modal-numeros-sorteio-1");
        if (antecessor && divSorteio) divSorteio.insertBefore(select, antecessor);
    }

    criarAposta() {
        super.criarAposta();
        const nomeAposta = this.apostas[this.apostas.length - 1].nome;
        const divAposta = document.querySelector(`#${nomeAposta}`);
        const select = Utils.criaSelect(`select-time-coracao-${nomeAposta}`, "form-select mt-3", this.times, [{ "nome": "data-nome-aposta", "valor": nomeAposta }]);
        
        select.addEventListener("change", (event) => {
            this.timeCoracaoApostas.set(nomeAposta, event.target.value);
            this.conferirApostas();
        });

        const antecessor = document.querySelector(`#div-exibe-modal-numeros-${nomeAposta}`);
        if (antecessor && divAposta) divAposta.insertBefore(select, antecessor);
    }

    conferirApostas() {
        super.conferirApostas();

        if (!this.timeCoracaoSorteio) return;

        this.apostas.forEach(aposta => {
            const nomeAposta = aposta.nome;
            const IndicetimeCoracaoAposta = this.timeCoracaoApostas.get(nomeAposta);
            
            if (!IndicetimeCoracaoAposta) return; 

            const apostaConferida = document.querySelector(`#${nomeAposta}-conferida`);
            const timeConferido = Utils.criaH(`time-coracao-${nomeAposta}-conferida`, "h3", this.times[timeCoracaoSorteio], "text-center");

            timeConferido.style.color = (this.timeCoracaoSorteio === IndicetimeCoracaoAposta) ? "rgb(9, 23, 216)" : "rgb(168, 169, 183)";
            apostaConferida.appendChild(timeConferido);
        });
    }

    excluirApostaPeloNome(nomeAposta) {
        super.excluirApostaPeloNome(nomeAposta);
        this.timeCoracaoApostas.delete(nomeAposta); 
    }
}



/* Timemania Escolhe 10 numeros de 1 a 80 com sorteio de 7 numeros + mais nome do time do caração 

Para Testar:

Resultado:

7, 20, 59, 14, 15, 10, 37

Aposta 1: 54, 39, 61, 79, 19, 68, 67, 36, 48, 14

Aposta 2: 74, 67, 80, 23, 1, 9, 52, 30, 54, 60

*/