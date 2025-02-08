import { Jogo } from "./jogos/jogo.js";

const jogo = new Jogo(6,11,100,20);
jogo.inicializaJogo();

document.querySelector("#teste").addEventListener("click", () =>{
    console.log("sorteio " + jogo.sorteio)
    jogo.apostas.forEach((aposta, indice) =>{
        console.log("Apostas " + indice + aposta)
    })
})