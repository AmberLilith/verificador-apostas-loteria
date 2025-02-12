import { Utils } from "../utils.js";

export class MenuNavegacao {
    opcaoAtivada = null;

    constructor(listaDeOpcoes, idContainer, funcaoAoclicar) {
        this.listaDeOpcoes = listaDeOpcoes;
        this.container = document.querySelector(`#${idContainer}`);
        this.funcaoAoclicar = funcaoAoclicar;
        this.criar();
    }

    criar() {
        const divMenuNavegacao = Utils.criaDiv("menu-navegacao", "menu-navegacao", null, null, null);
        
        this.listaDeOpcoes.forEach((opcao, indice) => {
            const divOpcao = Utils.criaDiv(`menu-navegacao-opcao${indice}`, "opcao", opcao, null, null);
            divOpcao.addEventListener("click", (event) => {
                this.ativaApenasOpcaoSelecionada(divOpcao);
                this.funcaoAoclicar(event.target.textContent);
            });
            divMenuNavegacao.appendChild(divOpcao);
        });

        this.container.appendChild(divMenuNavegacao);
    }

    ativaApenasOpcaoSelecionada(opcaoSelecionada) {
        document.querySelectorAll(".menu-navegacao .opcao-selecionada").forEach(opcao => {
            opcao.classList.remove("opcao-selecionada");
            opcao.classList.add("opcao");
        });
        opcaoSelecionada.classList.remove("opcao");
        opcaoSelecionada.classList.add("opcao-selecionada");
        this.opcaoAtivada = opcaoSelecionada;
    }
}
