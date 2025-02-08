export class Utils{
    static criaBotao(id, texto, classes, listaDemaisParametros){
        const botao = document.createElement("button");
        if(id) botao.id = id;
        if(texto) botao.innerText = texto;
        if(classes) botao.classList = classes;
        if(listaDemaisParametros){
            listaDemaisParametros.forEach(parametro =>{
                botao.setAttribute(parametro.nome, parametro.valor);
            });
        }
        return botao;
    }

    static criaSmall(id, classes, textContent){
        const small = document.createElement("div");
        if(id) small.id = id;
        if(classes) small.classList = classes;
        if(textContent) small.textContent = textContent
        return small
    }

    static criaDiv(id, classes,textContent, listaDeStyles, listaDeParametros){
        const div = document.createElement("div");
        if(id) div.id = id;
        if(classes) div.classList = classes;
        if(textContent) div.textContent = textContent        
        if(listaDeStyles){
            let styles = ""
            listaDeStyles.forEach(style => {
                styles += `${style.nome}:${style.valor}`
            });
            div.style = styles;
        }
        if(listaDeParametros){
            listaDeParametros.forEach(parametros => {
                div.setAttribute(parametros.nome, parametros.valor);
            });
        }
        
        return div;
    }

    static criaInput(id, type, classes, placehoder, listaDemaisParametros){
        const input = document.createElement("input");
        if(id) input.id = id;
        if(type) input.type = type;
        if(classes) input.classList = classes;
        if(placehoder) input.placeholder = placehoder;
        if(listaDemaisParametros) listaDemaisParametros.forEach(parametros => {
            input.setAttribute(parametros.nome, parametros.valor);
        });
        return input;
    }

    static criaH(id, tipo, titulo, classes){
        const h = document.createElement(tipo);
        if(id) h.id = id;
        if(titulo) h.innerText = titulo;
        if(classes) h.classList = classes;
        return h;
    }

    static criaSelect(id, classes, listaDeOpcoes, listaDemaisParametros){
        const select = document.createElement("select");
        if(id) select.id = id;
        if(classes) select.classList = classes;
        if(listaDeOpcoes) listaDeOpcoes.forEach((opcao, value) =>{
            const option = document.createElement("option");
            option.textContent = opcao;
            option.value = value;
            select.appendChild(option);
        });
        if(listaDemaisParametros){
            listaDemaisParametros.forEach(parametro =>{
                select.setAttribute(parametro.nome,parametro.valor);
            })
        }
        return select;
    }

    static criaTable(id, listaDeTitulosColunas, quantidadeLinhas, classes, listaDemaisParametros){ //TODO precisa terminar codigo de criar tabela
        const tabela = document.createElement("table");
        if(id) tabela.id = id;
        if(classes) tabela.classList = classes;
        const cabecalho = document.createElement("thead");
        const trCabecalho = document.createElement("tr");
        cabecalho.appendChild(trCabecalho);
        tabela.appendChild(cabecalho);
        const body = document.createElement("tbody");
        tabela.appendChild(body);
        if(listaDeTitulosColunas) listaDeTitulosColunas.array.forEach(titulo => {
            const th = document.createElement("th");
            th.textContent = titulo;
            trCabecalho.appendChild(th);
        });
    }

    static capitalize(str){
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    static dividirStringEmPares(string) {
        const listaDePares = [];
        for (let i = 0; i < string.length; i += 2) {
            listaDePares.push(string.slice(i, i + 2));
        }
        return listaDePares;
    }

    static padronizaNumeroParaDoisDigitos(numero){
        if(numero.length == 1) numero = `0${numero}`
        return numero;
    }

    static restringeInputSomenteNumeros(inputValue){ //Se for chamar no evento input de um input: input.value = Utils.restringeInputSomenteNumeros(input.value);
        return inputValue.replace(/[^0-9]/g, "");
    }

    static restringeInputSomenteNumerosEVirgula(inputValue){
        return inputValue.replace(/[^0-9,]/g, "");
    }

    static normalizarCSVNumeros(valor) {
        valor = valor.trim();        
        valor = valor.replace(/,+/g, ','); // Substitui múltiplas vírgulas por uma única vírgula       
        valor = valor.replace(/^,+|,+$/g, ''); // Remove vírgula do início e do fim se houver
        return valor;
    }

    
    
}