import { Utils } from "./utils.js";

export class Alerta {
    quantidadeAlertasCriados = 0;
    constructor(tipo, idContainer) {
        this.tipo = tipo; //primary, danger, secondary, etc.
        this.container = document.querySelector(`#${idContainer}`);
    }

    mostraAlerta(mensagem) {
        this.quantidadeAlertasCriados++;
        const divAlert = Utils.criaDiv(`div-alert${this.quantidadeAlertasCriados}`, `alert alert-${this.tipo} fade show alert-dismissible`, null, [{ "nome": "role", "value": "alert" }]);
        const divMensagem = Utils.criaDiv(`mensagem-alerta${this.quantidadeAlertasCriados}`, null, mensagem, null, null);
        const botaoClose = Utils.criaBotao(`botao-close-alerta${this.quantidadeAlertasCriados}`, null, "btn-close",null, [{ "nome": "data-bs-dismiss", "valor": "alert" }, { "nome": "aria-label", "valor": "Close" }]);
        divAlert.appendChild(divMensagem);
        divAlert.appendChild(botaoClose);
        this.container.appendChild(divAlert);
        setTimeout(() => {
            this.fechaAlerta();
        }, 3000);
    }

    fechaAlerta() {
        const botaoFechar = this.container.querySelector(`#botao-close-alerta${this.quantidadeAlertasCriados}`);
        if (botaoFechar) botaoFechar.click();
        this.quantidadeAlertasCriados --;
    }
}