// =======================================================
// ARQUIVO: dados_projetos.js
// FUNÇÃO: Armazena todos os projetos e seus status.
// ATENÇÃO: Edite manualmente este arquivo para atualizar o status dos projetos.
// =======================================================
const DADOS_RASTREIO = {
    // EXEMPLO 1: Projeto em fase inicial
    "PERSONARE001": {
        cliente: "Maria Silva",
        status: "Aguardando Compra de Material",
        porcentagem: 25,
        detalhes: "O projeto foi aprovado e os pedidos de chapas e ferragens foram enviados aos fornecedores.",
        previsao: "15/11/2025" // Formato DD/MM/AAAA
    },

    // EXEMPLO 2: Projeto em produção
    "PERSONARE002": {
        cliente: "João Santos",
        status: "Em Produção (Corte e Usinagem)",
        porcentagem: 50,
        detalhes: "O projeto entrou na linha de corte e as peças estão sendo preparadas. Previsão de finalização desta fase: 05/11.",
        previsao: "28/11/2025"
    },

    // EXEMPLO 3: Projeto quase pronto para entrega
    "PERSONARE003": {
        cliente: "Ana Costa",
        status: "Inspeção de Qualidade Final",
        porcentagem: 90,
        detalhes: "O projeto está montado na fábrica para checagem final. Agendamento de montagem será feito em breve.",
        previsao: "05/12/2025"
    }

    // ADICIONE SEUS NOVOS PROJETOS ABAIXO:
    /*
    "CODIGOUNICO4": {
        cliente: "Nome do Cliente",
        status: "Nova Fase",
        porcentagem: 0,
        detalhes: "Detalhes sobre a fase atual.",
        previsao: "DD/MM/AAAA"
    },
    */
};