import { Utils } from "../utils.js";

export class Modal {
    constructor(nomeAposta, titulo, textoBotaoAcao, funcaoBotaoCancelar, funcaoClickBotaoAcao, jogoAvoDesseModal) {
        this.nomeAposta = nomeAposta;
        this.titulo = titulo;
        this.jogoAvoDesseModal = jogoAvoDesseModal;
        this.divModal = Utils.criaDiv(`modal-${this.nomeAposta}`, "modal", null, null, null);
        this.divModalConteudo = Utils.criaDiv(`conteudo-modal-${this.nomeAposta}`, "modal-conteudo", null, null, null);
        const iconeFechar = document.createElement("i");
        iconeFechar.classList = ("bi bi-x-lg");
        this.botaoFecharModal = Utils.criaBotao(`botao-fechar-modal-${this.nomeAposta}`, null, "modal-fechar", iconeFechar, null);
        this.tituloModal = Utils.criaH(`h2-modal${this.nomeAposta}`, "h2", this.titulo, null);
        this.divCorpoModal = Utils.criaDiv(`modal-corpo-${this.nomeAposta}`, null, null, null, null);
        this.divFooter = Utils.criaDiv(`modal-footer-${this.nomeAposta}`, "modal-footer", null, null, null);
        this.botaoCancelar = Utils.criaBotao(`modal-botao-cancelar${this.nomeAposta}`, "Cancelar", "btn btn-danger", null, null);
        this.funcaoBotaoCancelar = funcaoBotaoCancelar;
        this.botaoAcao = Utils.criaBotao(`modal-botao-acao${this.nomeAposta}`, textoBotaoAcao, "btn btn-primary", null, null);
        this.funcaoClickBotaoAcao = funcaoClickBotaoAcao;
        this.cria();
    }

    cria() {
        this.botaoFecharModal.addEventListener("click", () => {
            this.funcaoBotaoCancelar();
            this.destroi();
        });

        this.botaoCancelar.addEventListener("click", () => {
            this.funcaoBotaoCancelar();
            this.destroi();
        });

        this.botaoAcao.addEventListener("click", () => {
            this.funcaoClickBotaoAcao();
            if(this.jogoAvoDesseModal) this.jogoAvoDesseModal.conferirApostas();
        });

        this.divModalConteudo.appendChild(this.botaoFecharModal);
        this.divModalConteudo.appendChild(this.tituloModal);
        this.divModalConteudo.appendChild(this.divCorpoModal);
        this.divFooter.appendChild(this.botaoCancelar);
        this.divFooter.appendChild(this.botaoAcao);
        this.divModalConteudo.appendChild(this.divFooter);

        this.divModal.appendChild(this.divModalConteudo);

        document.body.appendChild(this.divModal);
    }

    exibe() {
        this.divModal.classList.add("ativo");
    }

    destroi() {
        this.divModal.classList.remove("ativo");
        this.divModal.remove();
    }

    

}