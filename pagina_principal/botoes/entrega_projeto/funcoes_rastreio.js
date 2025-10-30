// =======================================================
// ARQUIVO: funcoes_rastreio.js - CORRIGIDO (V5 com Cores e Legenda CSS)
// =======================================================

/* Fases e cores (fixas) */
const fases = [
    "Projeto Aprovado / Contrato Assinado",
    "Compra dos Materiais em Andamento",
    "Materiais em Estoque / Início da Produção",
    "Em Produção - Corte e Usinagem",
    "Em Produção - Montagem",
    "Inspeção de Qualidade Final",
    "Embalagem e Preparação para Entrega",
    "Entrega e Instalação"
];

const coresFases = [
    "#c62828", // 1 - vermelho
    "#ef6c00", // 2 - laranja escuro
    "#f57c00", // 3 - laranja
    "#fbc02d", // 4 - amarelo
    "#fdd835", // 5 - amarelo claro
    "#7cb342", // 6 - verde claro
    "#388e3c", // 7 - verde
    "#2e7d32"  // 8 - verde escuro
];

/* Classes de cores (para o CSS customizado) */
const coresFasesClasses = [
    "indicator-fase-1",
    "indicator-fase-2",
    "indicator-fase-3",
    "indicator-fase-4",
    "indicator-fase-5",
    "indicator-fase-6",
    "indicator-fase-7",
    "indicator-fase-8"
];

/* Porcentagens realistas por fase */
const porcentagens = [5, 15, 30, 45, 60, 75, 90, 100];

/* Largura máxima do gráfico (em px) */
const MAX_WIDTH = 700;

/* Função principal chamada pelo botão */
function buscarStatus() {
    const codigoInput = document.getElementById('codigoRastreio').value.toUpperCase().trim();
    const resultadoDiv = document.getElementById('resultadoStatus');
    resultadoDiv.innerHTML = '';

    // ATENÇÃO: DADOS_RASTREIO deve ser um objeto definido em outro lugar, como um JSON embutido no HTML
    const projeto = DADOS_RASTREIO[codigoInput];

    if (projeto) {
        const faseAtual = Math.min(Math.max(Number(projeto.fase) || 1, 1), 8);

        // Gera a legenda de cores e fases em HTML
        const legendaHtml = gerarLegendaHtml();

        // RÓTULOS E VALORES CORRIGIDOS: Adicionando <span class="project-value">
        // ao redor dos valores dinâmicos para aplicar a cor #AD9C70 via CSS.
        let htmlContent = `
            <h3>Detalhes do Projeto: <span class="project-value">${codigoInput}</span></h3>
            <h4>Cliente: <span class="project-value">${projeto.cliente}</span></h4>
            
            <div class="status-box">
                <p><strong>Fase Atual:</strong> ${projeto.status}</p>
                <p><strong>Previsão de Entrega:</strong> ${projeto.previsao}</p>
                
                <div class="svg-timeline-wrapper">
                    </div>
                
                ${legendaHtml}
                
                <p class="detalhes-status">Última Atualização: ${projeto.detalhes}</p>
            </div>
        `;

        resultadoDiv.innerHTML = htmlContent;

        // Após inserir o HTML, renderiza o SVG
        renderSemiCircles(faseAtual);
    } else {
        resultadoDiv.innerHTML = `
            <p style="color: red; margin-top: 20px; font-weight: bold;">
                Código de rastreio não encontrado. Verifique se o código está correto ou entre em contato.
            </p>
        `;
    }
}

/* Geração da legenda de cores em HTML (AJUSTADA PARA USAR AS CLASSES CSS) */
function gerarLegendaHtml() {
    let html = `
        <div class="timeline-legend">
            <h4>Legenda das Fases do Projeto:</h4>
            <ul class="project-legend-list">
    `;

    fases.forEach((fase, index) => {
        // Usa a classe CSS para a cor da bolinha
        const classeCor = coresFasesClasses[index];

        html += `
            <li class="legend-item">
                <span class="legend-indicator ${classeCor}"></span>
                ${fase}
            </li>
        `;
    });

    html += `
            </ul>
        </div>
    `;
    return html;
}


/* Desenha SVG com 8 meias-luas alternadas dentro de .svg-timeline-wrapper */
function renderSemiCircles(faseAtual) {
    const wrapper = document.querySelector('.svg-timeline-wrapper');
    if (!wrapper) return;

    // Limpar
    wrapper.innerHTML = '';

    // configurações geometry
    const totalItems = 8;
    const padding = 25;
    const gap = 12;
    const arcRadius = 40;
    const strokeWidth = 22;
    const controlFactor = 1.6;

    // Altura é ajustada para acomodar apenas o gráfico e a porcentagem (sem os rótulos longos)
    const svgHeight = 2 * arcRadius + strokeWidth + 40;

    // cálculo da largura
    const itemWidth = arcRadius * 2 + gap;
    const contentWidth = itemWidth * totalItems - gap;
    const viewBoxWidth = contentWidth + padding * 2;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${svgHeight}`);
    svg.style.width = `${MAX_WIDTH}px`;
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.classList.add('svg-timeline');

    const baseline = svgHeight / 2;

    const startX = padding;
    const itemW = itemWidth;
    const r = arcRadius;
    const sW = strokeWidth;
    const ctrlOffset = r * controlFactor;

    for (let i = 0; i < totalItems; i++) {
        const centerX = startX + i * itemW + r;
        const up = (i % 2 === 0);

        const ativo = (i + 1) <= faseAtual;
        const cor = ativo ? coresFases[i] : "#e0e0e0";
        const perc = porcentagens[i];

        // Path geometry
        const leftX = centerX - r;
        const rightX = centerX + r;
        const baseY = baseline;
        const controlY = up ? (baseY - ctrlOffset) : (baseY + ctrlOffset);

        const d = `M ${leftX} ${baseY} Q ${centerX} ${controlY} ${rightX} ${baseY}`;

        // 1. Path (Arco)
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', cor);
        path.setAttribute('stroke-width', sW);
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('class', 'arc-path');
        svg.appendChild(path);

        // 2. Porcentagem (Dentro do Arco)
        const text = document.createElementNS(svgNS, 'text');
        // Posição para afastar a porcentagem da barra colorida
        const textY = up ? (baseY - r * 0.75) : (baseY + r * 0.75);
        text.setAttribute('x', centerX);
        text.setAttribute('y', textY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('class', 'arc-perc');
        text.textContent = `${perc}%`;
        text.setAttribute('fill', ativo ? cor : '#9a9a9a');
        svg.appendChild(text);

        // *** RÓTULOS DAS FASES (FRASES) FORAM REMOVIDOS DAQUI ***
    }

    // inserir SVG no wrapper
    wrapper.appendChild(svg);

    wrapper.style.maxWidth = `${MAX_WIDTH}px`;
    wrapper.style.margin = '18px auto';
    // O overflow pode ser mantido, mas não será mais necessário para o texto
    wrapper.style.overflow = 'visible';
}