// =======================================================
// ARQUIVO: funcoes_rastreio.js
// FUNÇÃO: Contém a lógica de busca e exibição dos dados.
// =======================================================

function buscarStatus() {
    // 1. Pega o código digitado, transforma em maiúsculas e remove espaços
    const codigoInput = document.getElementById('codigoRastreio').value.toUpperCase().trim();
    const resultadoDiv = document.getElementById('resultadoStatus');

    // O DADOS_RASTREIO vem do arquivo dados_projetos.js
    const projeto = DADOS_RASTREIO[codigoInput];

    // Limpa a área de resultado antes de exibir o novo status
    resultadoDiv.innerHTML = '';

    // 2. Verifica se o projeto existe
    if (projeto) {

        // 3. Monta o HTML com os dados do projeto
        const porcentagem = projeto.porcentagem;

        let htmlContent = `
            <h3>Detalhes do Projeto: ${codigoInput}</h3>
            <h4>Cliente: ${projeto.cliente}</h4>
            
            <div class="status-box">
                <p><strong>Fase Atual:</strong> ${projeto.status}</p>
                <p><strong>Previsão de Entrega:</strong> ${projeto.previsao}</p>
                
                <div class="progresso-barra">
                    <div class="barra-interna" style="width: ${porcentagem}%;">
                        ${porcentagem}% Concluído
                    </div>
                </div>
                
                <p class="detalhes-status">Última Atualização: ${projeto.detalhes}</p>
            </div>
        `;

        // 4. Exibe o resultado
        resultadoDiv.innerHTML = htmlContent;

    } else {
        // 5. Se não encontrado, exibe mensagem de erro
        resultadoDiv.innerHTML = `
            <p style="color: red; margin-top: 20px; font-weight: bold;">
                Código de rastreio não encontrado. Por favor, verifique se o código está correto ou entre em contato.
            </p>
        `;
    }
}