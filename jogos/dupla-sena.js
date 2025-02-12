import { Utils } from "../utils.js";
import { Jogo } from "./jogo.js";

export class DuplaSena extends Jogo {
    constructor(tipo) {
        super(tipo);
    }

    // O método criarSorteio agora cria dois sorteios
    criarSorteio() {
        super.criarSorteio(); // Cria o primeiro sorteio
        super.criarSorteio(); // Cria o segundo sorteio
    }

    // No método conferirApostas, agora verificamos cada aposta contra os dois sorteios
    conferirApostas() {
        const divConferirApostas = document.querySelector("#apostas-conferidas");
        this.removerApostasConferidas();
        
        this.apostas.forEach((aposta) => {
            if (this.sorteios[0].numeros.length == 0 && this.sorteios[1].numeros.length == 0) {
                const divApostaConferida = Utils.criaDiv(`${aposta.nome}-conferida`, "aposta-conferida", null, null, null);
                const divNumerosConferidos = Utils.criaDiv(`${aposta.nome}-numeros-conferidos`, "numeros-selecionados", "Sem sorteios para conferência", null, null);
                divApostaConferida.appendChild(divNumerosConferidos);
                divConferirApostas.appendChild(divApostaConferida);
            } else if (aposta.numeros.length == 0) {
                const divApostaConferida = Utils.criaDiv(`${aposta.nome}-conferida`, "aposta-conferida", null, null, null);
                const divNumerosConferidos = Utils.criaDiv(`${aposta.nome}-numeros-conferidos`, "numeros-selecionados", "Aposta sem números selecionados", null, null);
                divApostaConferida.appendChild(divNumerosConferidos);
                divConferirApostas.appendChild(divApostaConferida);
            } else {
                const divApostaConferida = Utils.criaDiv(`${aposta.nome}-conferida`, "aposta-conferida", null, null, null);
                const divNumerosConferidos = Utils.criaDiv(`${aposta.nome}-numeros-conferidos`, "numeros-selecionados", null, null, null);

                // Conferindo com o primeiro sorteio
                this.sorteios[0].numeros.forEach((numero, indice) => {
                    const divNumeroConferido = Utils.criaDiv(`numero-${indice}-${aposta.nome}-conferido`, null, numero, null, null);
                    if (aposta.numeros.includes(numero)) {
                        divNumeroConferido.className = "numero-selecionado";
                    } else {
                        divNumeroConferido.className = "numero-nao-selecionado";
                    }
                    divNumerosConferidos.appendChild(divNumeroConferido);
                });

                // Conferindo com o segundo sorteio
                this.sorteios[1].numeros.forEach((numero, indice) => {
                    const divNumeroConferido = Utils.criaDiv(`numero-${indice}-${aposta.nome}-conferido-sorteio-2`, null, numero, null, null);
                    if (aposta.numeros.includes(numero)) {
                        divNumeroConferido.className = "numero-selecionado";
                    } else {
                        divNumeroConferido.className = "numero-nao-selecionado";
                    }
                    divNumerosConferidos.appendChild(divNumeroConferido);
                });

                divApostaConferida.appendChild(divNumerosConferidos);
                divConferirApostas.appendChild(divApostaConferida);
            }
        });
    }

    removerApostasConferidas() {
        this.apostas.forEach(aposta => {
            const apostaConferida = document.querySelector(`#${aposta.nome}-conferida`);
            if (apostaConferida) apostaConferida.remove();
        });
    }
}



/* dupla sena Escolhe de 6 a 15 numeros dentro de 50 numeros com sorteio 2 sorteio de 6 números cada

Resultado:

3, 11, 24, 37, 42, 49
7, 15, 28, 33, 46, 5

Aposta 1:
10, 18, 21, 39, 48, 2

Aposta 2:
9, 17, 25, 30, 44, 4 */