const produtosData = {
    hamburguer: [],
    pizza: [],
    bebida: [],
    fritas: []
};

let carrinho = [];

const categoriasEl = document.getElementById("categorias");
const produtosEl = document.getElementById("produtos");
const btnCarrinho = document.getElementById("btnCarrinho");
const carrinhoResumo = document.getElementById("carrinhoResumo");
const modalCarrinho = document.getElementById("modalCarrinho");
const listaCarrinho = document.getElementById("listaCarrinho");
const resumoQtd = document.getElementById("resumoQtd");
const resumoTotal = document.getElementById("resumoTotal");
const valorTotal = document.getElementById("valorTotal");

async function mostrarCategoria(categoria) {
    categoriasEl.style.display = "none";
    produtosEl.style.display = "flex";
    const produtosLista = document.getElementById("produtosLista");
    produtosLista.innerHTML = "";

    if (categoria === 'hamburguer') {
        try {
            const response = await fetch('https://api-cardapioonline.onrender.com/cardapio/hamburguers');
            const data = await response.json();

            produtosData.hamburguer = data;

            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.className = "produto-card";

                card.innerHTML = `
                    <div class="produto-info">
                        <div class="produto-nome"><strong>${item.hamburguerName}</strong></div>
                        <div class="produto-composicao">${item.composicao}</div>
                        <div class="produto-preco">R$ ${Number(item.preco || 0).toFixed(2)}</div>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarCarrinho('${categoria}', ${index})">Adicionar</button>
                `;

                produtosLista.appendChild(card);
            });

        } catch (err) {
            console.error("Erro ao buscar hambúrgueres:", err);
            produtosLista.innerHTML = `<p style="color:red;">Erro ao carregar os hambúrgueres. Tente novamente.</p>`;
        }
    } else if (categoria === "pizza") {
        try {
            const response = await fetch("https://api-cardapioonline.onrender.com/cardapio/pizzas");
            const data = await response.json();

            produtosData.pizza = data

            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.className = "produto-card";

                card.innerHTML = `
                    <div class="produto-info">
                        <div class="produto-nome"><strong>${item.pizzaName}</strong></div>
                        <div class="produto-composicao">${item.composicao}</div>
                        <div class="produto-preco">R$ ${Number(item.preco || 0).toFixed(2)}</div>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarCarrinho('${categoria}', ${index})">Adicionar</button>
                `;

                produtosLista.appendChild(card);
            })
        } catch (err) {
            console.error("Erro ao buscar pizzas:", err);
            produtosLista.innerHTML = `<p style="color:red;">Erro ao carregar os hambúrgueres. Tente novamente.</p>`;
        }
    } else if (categoria === "fritas") {
        try {
            const response = await fetch("https://api-cardapioonline.onrender.com/cardapio/fritas");
            const data = await response.json();

            produtosData.fritas = data

            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.className = "produto-card";

                card.innerHTML = `
                    <div class="produto-info">
                        <div class="produto-nome"><strong>${item.fritasName}</strong></div>
                        <div class="produto-composicao">${item.composicao}</div>
                        <div class="produto-preco">R$ ${Number(item.preco || 0).toFixed(2)}</div>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarCarrinho('${categoria}', ${index})">Adicionar</button>
                `;

                produtosLista.appendChild(card);
            })
        } catch (err) {
            console.error("Erro ao buscar fritas:", err);
            produtosLista.innerHTML = `<p style="color:red;">Erro ao carregar os hambúrgueres. Tente novamente.</p>`;
        }
    } else if (categoria === "bebida") {
        try {
            const response = await fetch("https://api-cardapioonline.onrender.com/cardapio/bebidas");
            const data = await response.json();

            produtosData.bebida = data

            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.className = "produto-card";

                card.innerHTML = `
                    <div class="produto-info">
                        <div class="produto-nome"><strong>${item.bebidasName}</strong></div>
                        <div class="produto-composicao">${item.composicao}</div>
                        <div class="produto-preco">R$ ${Number(item.preco || 0).toFixed(2)}</div>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarCarrinho('${categoria}', ${index})">Adicionar</button>
                `;

                produtosLista.appendChild(card);
            })
        } catch (err) {
            console.error("Erro ao buscar fritas:", err);
            produtosLista.innerHTML = `<p style="color:red;">Erro ao carregar os hambúrgueres. Tente novamente.</p>`;
        }
    }

    else {
        produtosData[categoria].forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "produto-card";
            card.innerHTML = `
                <div class="produto-info">
                    <div class="produto-nome">${item.nome}</div>
                    <div class="produto-preco">R$ ${item.preco.toFixed(2)}</div>
                </div>
                <button class="btn-adicionar" onclick="adicionarCarrinho('${categoria}', ${index})">Adicionar</button>
            `;
            produtosLista.appendChild(card);
        });
    }
}

function adicionarCarrinho(categoria, index) {
    const produto = produtosData[categoria][index];
    const nome = produto.nome || produto.hamburguerName || produto.pizzaName || produto.fritasName || produto.bebidasName;


    const existente = carrinho.find((p) => p.nome === nome);
    if (existente) {
        existente.qtd++;
    } else {
        carrinho.push({ nome, preco: produto.preco, qtd: 1 });
    }
    atualizarResumo();
    mostrarToast(`${nome} adicionado ao carrinho!`);
}

function atualizarResumo() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0);
    const totalPreco = carrinho.reduce((acc, item) => acc + item.qtd * item.preco, 0);
    resumoQtd.textContent = totalItens;
    resumoTotal.textContent = totalPreco.toFixed(2);
    btnCarrinho.querySelector("span").textContent = totalItens;
}

function abrirCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    modalCarrinho.classList.add("active");
    renderizarCarrinho();
}

function fecharCarrinho() {
    modalCarrinho.classList.remove("active");
}

function renderizarCarrinho() {
    listaCarrinho.innerHTML = "";
    carrinho.forEach((item) => {
        const div = document.createElement("div");
        div.className = "item-carrinho";
        div.innerHTML = `
          <span>${item.nome}</span>
          <span class="item-carrinho-quantidade">x${item.qtd} - R$ ${(item.preco * item.qtd).toFixed(2)}</span>
        `;
        listaCarrinho.appendChild(div);
    });
    const total = carrinho.reduce((acc, i) => acc + i.preco * i.qtd, 0);
    valorTotal.textContent = total.toFixed(2);
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Adicione algo antes de finalizar o pedido!");
        return;
    }
    alert("Pedido enviado com sucesso! Obrigado 😊");
    carrinho = [];
    atualizarResumo();
    fecharCarrinho();
    voltarCategorias();
}

function voltarCategorias() {
    produtosEl.style.display = "none";
    categoriasEl.style.display = "grid";
}

function mostrarToast(mensagem) {
    const toast = document.createElement("div");
    toast.textContent = mensagem;
    toast.style.position = "fixed";
    toast.style.bottom = "5rem";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#27ae60";
    toast.style.color = "white";
    toast.style.padding = "0.8rem 1.5rem";
    toast.style.borderRadius = "30px";
    toast.style.boxShadow = "0 4px 15px rgb(39 174 96 / 0.6)";
    toast.style.fontWeight = "600";
    toast.style.zIndex = 1100;
    toast.style.userSelect = "none";
    toast.style.opacity = "1";
    toast.style.transition = "opacity 0.6s ease";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 600);
    }, 1800);
}

btnCarrinho.addEventListener("click", abrirCarrinho);
carrinhoResumo.addEventListener("click", abrirCarrinho);
