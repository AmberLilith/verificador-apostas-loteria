import { DiaDeSorte } from "./jogos/dia-de-sorte.js";
import { DuplaSena } from "./jogos/dupla-sena.js";
import { Jogo } from "./jogos/jogo.js";
import { MaisMilionaria } from "./jogos/mais-molionaria.js";
import { Timemania } from "./jogos/timemania.js";
import { JogosEnum } from "./jogosEnum.js";
import { MenuNavegacao } from "./menu-navegacao/menu-navegacao.js";

const menuNavegacao = new MenuNavegacao(Object.values(JogosEnum).map(jogo => jogo.nome), "navBar",inicializaJogo);
let jogo = null;


function inicializaJogo(nome){
    const tipoJogo = JogosEnum.getTipoByName(nome);
    const jogosNormais = [JogosEnum.TESTE.tipo, JogosEnum.LOTOFACIL.tipo, JogosEnum.LOTOMANIA.tipo, JogosEnum.MEGA_SENA.tipo, JogosEnum.QUINA.tipo];
    if(tipoJogo){
        if(jogosNormais.includes(tipoJogo)){
            jogo = new Jogo(tipoJogo);            
        }else{
            if(tipoJogo == JogosEnum.DIA_DE_SORTE.tipo){
                jogo = new DiaDeSorte(tipoJogo);
            }

            if(tipoJogo == JogosEnum.MILIONARIA.tipo){
                jogo = new MaisMilionaria(tipoJogo);
            }

            if(tipoJogo == JogosEnum.DUPLA_SENA.tipo){
                jogo = new DuplaSena(tipoJogo);
            }

            if(tipoJogo == JogosEnum.TIMEMANIA.tipo){
                jogo = new Timemania(tipoJogo);
            }

            /* if(tipoJogo == JogosEnum.SUPER_SETE.tipo){
                jogo = new SuperSete(tipoJogo);
            } */
        }
        jogo.inicializaJogo();
    }
}

/* document.querySelector("#teste").addEventListener("click", () =>{
    jogo.sorteios.forEach((sorteio, indice) =>{
        console.log("Sorteios " + indice + ": " +  sorteio.numeros)
    }) 

    jogo.apostas.forEach((aposta, indice) =>{
        console.log("Apostas " + indice + ": " +  aposta.numeros)
    }) 
    
    if(jogo.mesDaSorteSorteio) console.log(jogo.mesDaSorteSorteio)

        if(jogo.mesesDaSorteApostas){
            console.log("Meses Da Sorte Apostas " + JSON.stringify([...jogo.mesesDaSorteApostas]))
        }

        if(jogo.timeCoracaoApostas){
            console.log("Times do coracao Apostas " + JSON.stringify([...jogo.timeCoracaoApostas]))
        }
        
    if(jogo.trevosDaSorteApostas){
        console.log("Trevos da sorte Apostas " + JSON.stringify([...jogo.trevosDaSorteApostas]))
    }

    if(jogo.sorteios){
        console.log("sorteio 1 " + jogo.sorteios[0])
        console.log("sorteio 2 " + jogo.sorteios[1])
    }
}) */