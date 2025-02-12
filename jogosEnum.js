export class JogosEnum {
    //static TESTE = { tipo: 'teste', nome: "Teste", cor: "#82726a", qtddNumsSorteio: 5, qtddMinNumsAposta: 2, qtddMaxNumsAposta: 3, qtddNumsParaSelecionar:10}
    static LOTOFACIL = { tipo: 'lotofacil', nome: "Lotofácil", cor: "#930089", qtddNumsSorteio: 15, qtddMinNumsAposta: 15, qtddMaxNumsAposta: 20, qtddNumsParaSelecionar:25}
    static LOTOMANIA = { tipo: 'lotomania', nome: "Lotomania", cor: "#f78100", qtddNumsSorteio: 20, qtddMinNumsAposta: 50, qtddMaxNumsAposta: 50, qtddNumsParaSelecionar: 100}
    static MEGA_SENA = { tipo: 'megasena', nome: "Mega Sena", cor: "#209869", qtddNumsSorteio: 6, qtddMinNumsAposta: 6, qtddMaxNumsAposta: 20, qtddNumsParaSelecionar: 60}
    static QUINA = { tipo: 'quina', nome: "Quina", cor: "#260085", qtddNumsSorteio: 5, qtddMinNumsAposta: 5, qtddMaxNumsAposta: 15, qtddNumsParaSelecionar: 80}
    static MILIONARIA = { tipo: 'milionaria', nome: "+Milionária", cor: "#2e3078", qtddNumsSorteio: 7, qtddMinNumsAposta: 6, qtddMaxNumsAposta: 10, qtddNumsParaSelecionar: 50}
    static DIA_DE_SORTE = { tipo: 'diadesorte', nome: "Dia de Sorte", cor: "#cb852b", qtddNumsSorteio: 7, qtddMinNumsAposta: 7, qtddMaxNumsAposta: 11, qtddNumsParaSelecionar: 31}
    static DUPLA_SENA = { tipo: 'duplasena', nome: "Dupla Sena", cor: "#a61324", qtddNumsSorteio: 6, qtddMinNumsAposta: 6, qtddMaxNumsAposta: 15, qtddNumsParaSelecionar: 50}
    //static SUPER_SETE = { tipo: 'supersete', nome: "Super Sete", cor: "#a8cf44"}
    static TIMEMANIA = { tipo: 'timemania', nome: "Timemania", cor: "#02ff02", qtddNumsSorteio: 7, qtddMinNumsAposta: 10, qtddMaxNumsAposta: 10, qtddNumsParaSelecionar: 80}

    static getNomeBytipo(tipo) {
        const camposEstaticos = Object.keys(JogosEnum).filter((key) => {
            return typeof (JogosEnum)[key] !== "function";
        });
        for (const campo of camposEstaticos) {
            const constante = (JogosEnum)[campo]
            if (constante.tipo === tipo) {
                return constante.nome
            }
        }
        return "Nome não encontrado!"
    }

    static getTipoByName(nome) {
        const camposEstaticos = Object.keys(JogosEnum).filter((key) => {
            return typeof (JogosEnum)[key] !== "function";
        });
        for (const campo of camposEstaticos) {
            const constante = (JogosEnum)[campo]
            if (constante.nome === nome) {
                return constante.tipo
            }
        }
        return "Tipo não encontrado!"
    }

    static getCorBytipo(tipo) {
        const camposEstaticos = Object.keys(JogosEnum).filter((key) => {
            return typeof (JogosEnum)[key] !== "function";
        });
        for (const campo of camposEstaticos) {
            const constante = (JogosEnum)[campo]
            if (constante.tipo === tipo) {
                return constante.cor
            }
        }
        return "Nome não encontrado!"
    }

    static getNomeConstanteByTipo(tipo) {
        for (const [chave, valor] of Object.entries(JogosEnum)) {
            if (valor.tipo === tipo) {
                return chave;
            }
        }
        return null;
    }
}




