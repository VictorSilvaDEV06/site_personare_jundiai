// dados_projetos.js
const DADOS_RASTREIO = {
    "PERSONARE001": {
        cliente: "Maria Silva",
        fase: 2,
        status: "Compra dos Materiais em Andamento",
        detalhes: "O projeto foi aprovado e os pedidos de chapas e ferragens foram enviados aos fornecedores.",
        previsao: "15/11/2025"
    },

    "PERSONARE002": {
        cliente: "João Santos",
        fase: 4,
        status: "Em Produção (Corte e Usinagem)",
        detalhes: "O projeto entrou na linha de corte e as peças estão sendo preparadas.",
        previsao: "28/11/2025"
    },

    "PERSONARE003": {
        cliente: "Ana Costa",
        fase: 6,
        status: "Inspeção de Qualidade Final",
        detalhes: "O projeto está montado na fábrica para checagem final.",
        previsao: "05/12/2025"
    }

    // Adicione mais projetos seguindo o padrão: "CODIGO": { cliente, fase(1..8), status, detalhes, previsao }
};