import { Jogo } from "./jogos/jogo.js";
import { jogosEnum } from "./jogosEnum.js";

const jogo = new Jogo(jogosEnum.TESTE.tipo);
jogo.inicializaJogo();

document.querySelector("#teste").addEventListener("click", () =>{
    console.log("sorteio " + jogo.sorteio)
    jogo.apostas.forEach((aposta, indice) =>{
        console.log("Apostas " + indice + ": " +  aposta.numeros)
    })
    console.log("numeros " + jogo.apostas[0].numeros)
    console.log("backup numeros " + jogo.apostas[0].backupNumeros)
})