const inNome = document.getElementById("inNome");
const sltTipo = document.getElementById("sltTipo");
const sltSabor = document.getElementById("sltSabor");
const inPreco = document.getElementById("inPreco");
const inEstoque = document.getElementById("inEstoque");
const sltFaixaPreco = document.getElementById("sltFaixaPreco");
const grupoFaixaPreco = document.getElementById("grupoFaixaPreco");

const btCadastrar = document.getElementById("btCadastrar");
const btMostrar = document.getElementById("btMostrar");
const btConsultar = document.getElementById("btConsultar");
const btConsultarFaixaPreco = document.getElementById("btConsultarFaixaPreco");

const outCadastro = document.getElementById("outCadastro");

btCadastrar.addEventListener("click", cadastrarProduto);
btMostrar.addEventListener("click", mostrarProdutos);
btConsultar.addEventListener("click", consultarProduto);
btConsultarFaixaPreco.addEventListener("click", consultarFaixaPreco);
outCadastro.addEventListener("click", gerenciarCliqueProduto);

var vetProdutos = [];
var indiceEdicao = -1;

function cadastrarProduto() {

    var nomeProduto = inNome.value;
    var tipoProduto = sltTipo.value;
    var saborProduto = sltSabor.value;
    var precoProduto = Number(inPreco.value);
    var estoqueProduto = Number(inEstoque.value);

    var produto = {
        nome: nomeProduto,
        tipo: tipoProduto,
        sabor: saborProduto,
        preco: precoProduto,
        estoque: estoqueProduto
    };

    if (inNome.value == "") {
        alert("Campo nome deixado vazio!");
        inNome.focus();
    } else if (sltTipo.value == 1) {
        alert("Campo tipo de produto deixado vazio!");
        sltTipo.focus();
    } else if (sltSabor.value == 1) {
        alert("Campo sabor deixado vazio!");
        sltSabor.focus();
    } else if (precoProduto < 0 || inPreco.value == "") {
        alert("Campo preço com valor < 0 ou deixado vazio!");
        inPreco.focus();
    } else if (estoqueProduto < 0 || inEstoque.value == "") {
        alert("Campo estoque deve ser > 0 ou deixado vazio!");
        inEstoque.focus();
    } else {
        if (indiceEdicao == -1) {
            vetProdutos.push(produto);
            alert("Produto cadastrado!");
        } else {
            vetProdutos[indiceEdicao] = produto;
            indiceEdicao = -1;
            btCadastrar.textContent = "Cadastrar";
            alert("Produto alterado!");
        }

        salvarProdutosLocalStorage();

        limparCampos();
        outCadastro.innerHTML = "";
    }
}

function armazanarDados(produto) {

    let vetProdutos = [];
    vetProdutos.push(produto);
    let jsonVetProdutos = JSON.stringify(vetProdutos);
    localStorage.setItem("listaprodutos", jsonVetProdutos);

    //localStorage.setItem("produtos", JSON.stringify([produto]));
}

function mostrarProdutos() {

    pegarDados();

    if (vetProdutos.length == 0) {
        outCadastro.innerHTML = '<p class="mensagem-vazia">Nenhum produto cadastrado.</p>';
    } else {
        renderizarCardsProdutos(vetProdutos);
    }
}

pegarDados();

function pegarDados() {

    const produtos = JSON.parse(localStorage.getItem("listaprodutos"));
    console.log(produtos);

    vetProdutos = produtos || [];
}

function consultarProduto() {

    var pesquisa = inNome.value.trim().toUpperCase();

    if (pesquisa == "") {
        inNome.focus();
    } else {
        var encontrou = false;
        var produtosEncontrados = [];
        var indicesEncontrados = [];

        for (var ind = 0; ind < vetProdutos.length; ind++) {

            if (vetProdutos[ind].nome.toUpperCase().includes(pesquisa)) {

                produtosEncontrados.push(vetProdutos[ind]);
                indicesEncontrados.push(ind);

                encontrou = true;
            }
        }

        if (encontrou == false) {
            outCadastro.innerHTML = '<p class="mensagem-vazia">Produto não encontrado.</p>';
        } else {
            renderizarCardsProdutos(produtosEncontrados, indicesEncontrados);
        }

        limparCampos();
        cancelarEdicao();
    }
}

function exibirFiltroFaixaPreco() {

    grupoFaixaPreco.hidden = false;
}

function consultarFaixaPreco() {

    var filtroFaixaEstavaOculto = grupoFaixaPreco.hidden;

    exibirFiltroFaixaPreco();

    if (filtroFaixaEstavaOculto == true) {
        sltFaixaPreco.focus();
        return;
    }

    var faixaSelecionada = sltFaixaPreco.value;

    if (faixaSelecionada == "1") {
        faixaSelecionada = "todos";
    }

    var encontrou = false;
    var produtosEncontrados = [];
    var indicesEncontrados = [];

    outCadastro.innerHTML = "";

    for (var ind = 0; ind < vetProdutos.length; ind++) {

        if (
            faixaSelecionada == "todos" ||

            (faixaSelecionada == "baixo" &&
                vetProdutos[ind].preco <= 10) ||

            (faixaSelecionada == "medio" &&
                vetProdutos[ind].preco > 10 &&
                vetProdutos[ind].preco <= 20) ||

            (faixaSelecionada == "alto" &&
                vetProdutos[ind].preco > 20)
        ) {

            produtosEncontrados.push(vetProdutos[ind]);
            indicesEncontrados.push(ind);

            encontrou = true;
        }
    }

    if (encontrou == false) {

        outCadastro.innerHTML = '<p class="mensagem-vazia">Não há produtos nessa faixa de preço.</p>';
    } else {
        renderizarCardsProdutos(produtosEncontrados, indicesEncontrados);
    }

    limparCampos();
    cancelarEdicao();
}

function limparCampos() {

    inNome.value = "";
    sltTipo.selectedIndex = 0;
    sltSabor.selectedIndex = 0;
    inPreco.value = "";
    sltFaixaPreco.selectedIndex = 0;
    inEstoque.value = "";
}

function cancelarEdicao() {

    indiceEdicao = -1;
    btCadastrar.textContent = "Cadastrar";
}

function salvarProdutosLocalStorage() {

    const jsonVetProdutos = JSON.stringify(vetProdutos);
    console.log(jsonVetProdutos);
    localStorage.setItem("listaprodutos", jsonVetProdutos);
}

function renderizarCardsProdutos(produtos, indicesOriginais) {

    outCadastro.innerHTML = "";

    for (var ind = 0; ind < produtos.length; ind++) {

        var indiceProduto = indicesOriginais ? indicesOriginais[ind] : ind;
        var produto = produtos[ind];
        var artigo = document.createElement("article");
        var info = document.createElement("div");
        var titulo = document.createElement("h3");
        var tipo = document.createElement("p");
        var sabor = document.createElement("p");
        var preco = document.createElement("p");
        var estoque = document.createElement("p");
        var acoes = document.createElement("div");
        var btEditarProduto = document.createElement("button");
        var btExcluirProduto = document.createElement("button");

        artigo.className = "produto-card";
        info.className = "produto-info";
        acoes.className = "produto-acoes";

        titulo.textContent = produto.nome;
        tipo.innerHTML = "<strong>Tipo:</strong> ";
        sabor.innerHTML = "<strong>Sabor:</strong> ";
        preco.innerHTML = "<strong>Preço:</strong> ";
        estoque.innerHTML = "<strong>Estoque:</strong> ";

        tipo.appendChild(document.createTextNode(produto.tipo));
        sabor.appendChild(document.createTextNode(produto.sabor));
        preco.appendChild(document.createTextNode("R$ " + produto.preco.toFixed(2)));
        estoque.appendChild(document.createTextNode(produto.estoque));

        btEditarProduto.type = "button";
        btEditarProduto.className = "bt-editar-produto";
        btEditarProduto.dataset.indice = indiceProduto;
        btEditarProduto.textContent = "Editar";

        btExcluirProduto.type = "button";
        btExcluirProduto.className = "bt-excluir-produto";
        btExcluirProduto.dataset.indice = indiceProduto;
        btExcluirProduto.textContent = "Excluir";

        // Adiciona o título do produto na área de informações.
        info.appendChild(titulo);
        // Adiciona o tipo do produto na área de informações.
        info.appendChild(tipo);
        // Adiciona o sabor do produto na área de informações.
        info.appendChild(sabor);
        // Adiciona o preço do produto na área de informações.
        info.appendChild(preco);
        // Adiciona o estoque do produto na área de informações.
        info.appendChild(estoque);
        acoes.appendChild(btEditarProduto);
        acoes.appendChild(btExcluirProduto);
        artigo.appendChild(info);
        artigo.appendChild(acoes);

        outCadastro.appendChild(artigo);
    }
}

function gerenciarCliqueProduto(evento) {

    var botao = evento.target;

    if (botao.classList.contains("bt-editar-produto")) {
        editarProduto(Number(botao.dataset.indice));
    }

    if (botao.classList.contains("bt-excluir-produto")) {
        excluirProdutoPorIndice(Number(botao.dataset.indice));
    }
}

function editarProduto(indice) {

    var produto = vetProdutos[indice];

    inNome.value = produto.nome;
    sltTipo.value = produto.tipo;
    sltSabor.value = produto.sabor;
    inPreco.value = produto.preco;
    inEstoque.value = produto.estoque;
    indiceEdicao = indice;
    btCadastrar.textContent = "Salvar Alteração";
    inNome.focus();
}

function excluirProdutoPorIndice(indice) {

    var confirmou = confirm("Deseja excluir este produto?");

    if (confirmou == true) {
        vetProdutos.splice(indice, 1);

        if (indiceEdicao == indice) {
            indiceEdicao = -1;
            btCadastrar.textContent = "Cadastrar";
            limparCampos();
        } else if (indiceEdicao > indice) {
            indiceEdicao--;
        }

        salvarProdutosLocalStorage();
        alert("Produto excluído!");
        mostrarProdutos();
    }
}
