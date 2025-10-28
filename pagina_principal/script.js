// ====== ELEMENTOS DO DOM ======
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const cartModal = document.getElementById("cart-modal");
const closeCartModalBtn = document.querySelector(".close-cart-modal");
const productsGrid = document.getElementById("products-grid");
const modalDetails = document.getElementById("modal-details");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const suggestionsList = document.getElementById("suggestions");

// Itens de todos os Dropdowns
const dropdownLinks = document.querySelectorAll('.dropdown-content a');

// ====== DADOS ======
const ambientes = [
    { id: 1, nome: "Cozinha Planejada", descricao: "Cozinha premium feita sob medida, com acabamento sofisticado e máximo aproveitamento do espaço.", imagem: "https://source.unsplash.com/600x400/?kitchen,modern" },
    { id: 2, nome: "Sala de Estar", descricao: "Ambiente moderno e acolhedor, perfeito para reunir família e amigos com estilo.", imagem: "https://source.unsplash.com/600x400/?livingroom,interior" },
    { id: 3, nome: "Quarto Planejado", descricao: "Design elegante e funcional para noites tranquilas em um espaço único.", imagem: "https://source.unsplash.com/600x400/?bedroom,modern" },
    { id: 4, nome: "Escritório Home Office", descricao: "Ambiente planejado para produtividade, com conforto e sofisticação.", imagem: "https://source.unsplash.com/600x400/?office,workspace" },
    { id: 5, nome: "Closet Premium", descricao: "Espaço exclusivo para organização e praticidade, com design de alto padrão.", imagem: "https://source.unsplash.com/600x400/?closet,luxury" }
];

const searchTerms = [
    // Residênciais
    "Cozinha Planejada", "Sala de Estar", "Quarto Planejado", "Escritório Home Office", "Closet Premium",
    "Armários de Cozinha", "Guarda-roupas", "Painéis de TV", "Escrivaninhas", "Móveis para Banheiro",
    "Dormitórios", "Cozinhas", "Home Offices", "Home Theaters", "Adegas", "Painéis", "Lavanderias",
    "Espaço Gourmet", "Banheiros", "Closets", "Estantes", "Portas", "Sala de Estar",
    // Corporativos (NOVOS TERMOS ADICIONADOS PARA A LUPA)
    "Escritórios Executivos", "Salas de Reunião", "Recepções", "Consultórios Médicos", "Lojas e Varejo",
    "Cozinhas Industriais", "Móveis para Escritório", "Projetos Comerciais",
    // Termos Genéricos
    "Cozinha", "Quarto", "Sala", "Banheiro", "Home Office",
    "MDF", "Mesas", "Sala", "Sala de Jantar", "Cabeçeira", "Mesa de Escritório",
    "Porta de correr", "Gavetas com amortecedor", "Iluminação embutida", "Móvel modulado",
    "Contato", "Orçamento", "Garantia", "Armários de Banheiro", "Móveis Modulares", "Móveis Planejados"
];

const synonyms = {
    "cozinha": ["Cozinhas", "Cozinha Planejada", "Mesa", "Armários de Cozinha", "Espaço Gourmet", "Cozinhas Industriais"],
    "sala": ["Sala de Estar", "Sala", "Home Theaters", "Painéis", "Estantes", "Salas de Reunião"],
    "quarto": ["Dormitórios", "Closets", "Guarda-roupas"],
    "escritório": ["Home Offices", "Escrivaninhas", "Mesa de Escritório", "Escritórios Executivos", "Recepções"],
    "banheiro": ["Banheiros", "Móveis para Banheiro", "Armários de Banheiro"],
    "loja": ["Lojas e Varejo", "Projetos Comerciais"],
    "gaveta": ["Gaveta", "Gavetas com amortecedor"],
    "modulado": ["Móvel modulado", "Móveis modulares"]
};

// =======================================================
// FUNÇÕES DE BUSCA E LÓGICA DO DROPDOWN (ALTERADAS)
// =======================================================

/**
 * Função principal que simula a busca ou redirecionamento.
 * @param {Event} e - O evento de clique/submit.
 * @param {string} query - O termo de busca final.
 * @param {string} [categoria=null] - A categoria do dropdown (residenciais ou corporativos).
 */
function testarBusca(e, query, categoria = null) {
    e.preventDefault();
    const finalQuery = query || searchInput.value.trim();
    let message = "";

    if (!finalQuery) return;

    // Se a busca veio de um dropdown
    if (categoria) {
        if (categoria === 'residenciais') {
            message = `Busca Disparada (RESIDENCIAIS): ${finalQuery}`;
        } else if (categoria === 'corporativos') {
            message = `Busca Disparada (CORPORATIVOS): ${finalQuery}`;
        } else {
            message = `Busca Disparada (Geral): ${finalQuery}`;
        }
    } else {
        // Se a busca veio da lupa/input
        message = `Busca Disparada (LUPA): ${finalQuery}`;
    }

    console.log(message);
    alert(message + "\n(Função de busca real será implementada na próxima fase, após o DB)");
    // Lógica futura para redirecionamento ou filtro Ajax viria aqui.
}


// NOVO: LÓGICA UNIFICADA PARA CAPTURAR O CLIQUE DO DROPDOWN E CATEGORIA
dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Obtém o nome do ambiente clicado (ex: "Dormitórios")
        const ambiente = e.target.getAttribute('data-ambiente');

        // 2. Encontra o elemento pai mais próximo que tem a classe .dropdown-menu
        const dropdownMenu = e.target.closest('.dropdown-menu');

        if (!dropdownMenu) return;

        // 3. Obtém a categoria (ex: "residenciais" ou "corporativos")
        const categoria = dropdownMenu.getAttribute('data-category');

        if (ambiente && categoria) {
            // Dispara a função de busca usando o ambiente e a categoria correta
            testarBusca(e, ambiente, categoria);

            // Opcional: Fechar o dropdown após o clique
            // suggestionsList.style.display = "none";
        }
    });
});


// ====== SUGESTÕES (mantidas) ======
function filtrarSugestoes(query) {
    const termosEncontrados = [];
    searchTerms.forEach(term => {
        if (term.toLowerCase().includes(query.toLowerCase())) termosEncontrados.push(term);
    });
    Object.keys(synonyms).forEach(key => {
        if (query.toLowerCase().includes(key)) synonyms[key].forEach(s => {
            if (!termosEncontrados.includes(s)) termosEncontrados.push(s);
        });
    });
    return [...new Set(termosEncontrados)];
}

function mostrarSugestoes() {
    const query = searchInput.value.trim();
    suggestionsList.innerHTML = "";
    if (!query || query.length < 2) {
        suggestionsList.style.display = "none";
        return;
    }
    const results = filtrarSugestoes(query);
    if (results.length === 0) {
        suggestionsList.style.display = "none";
        return;
    }
    results.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        li.addEventListener('click', (e) => {
            searchInput.value = item;
            suggestionsList.style.display = "none";
            // A busca da sugestão é sempre uma busca geral (lupa), não precisa de categoria
            testarBusca(e);
        });
        suggestionsList.appendChild(li);
    });
    suggestionsList.style.display = "block";
}

// ====== MODAIS (mantidos) ======
function abrirModal(id) {
    const produto = ambientes.find(p => p.id === id);
    if (!produto) return;
    modalDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <img src="${produto.imagem}" alt="${produto.nome}" style="width:100%; border-radius:8px; margin:1rem 0;">
        <p>${produto.descricao}</p>
        <button class="cta-button add-to-cart-btn">Adicionar à Lista de Orçamento</button>
    `;
    modal.style.display = "block";
}

function addToCart(productId) { /* Lógica do carrinho aqui */ }
function updateCartCount() { /* Lógica de atualização aqui */ }
function openCartModal() { /* Lógica do modal aqui */ }

// ====== EVENT LISTENERS ======
searchInput.addEventListener("input", mostrarSugestoes);

// Clique na lupa
searchButton.addEventListener("click", testarBusca);

// Enter no teclado
searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") testarBusca(e);
});

// Fechar sugestões ao clicar fora
document.addEventListener("click", e => {
    if (!e.target.closest(".search-container")) suggestionsList.style.display = "none";
});

// Fechar modais
if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
if (closeCartModalBtn) closeCartModalBtn.onclick = () => cartModal.style.display = "none";

window.onclick = event => {
    if (event.target === modal) modal.style.display = "none";
    if (event.target === cartModal) cartModal.style.display = "none";
};

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada. Digite na pesquisa para testar.");
});