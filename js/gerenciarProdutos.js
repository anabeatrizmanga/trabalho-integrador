var vetTipos = [
    "Sorvete",
    "Açaí",
    "Milkshake",
    "Especial da Casa"
];

var vetSabores = [
    "Nuvem de Chocolate",
    "Nuvem de Baunilha",
    "Nuvem de Morango",
    "Flocos Celestiais",
    "Coco Cremoso",
    "Maracujá Tropical",
    "Manga Doce",
    "Uva",
    "Limão",
    "Abacaxi",
    "Leite Condensado",
    "Ninho com Chocolate",
    "Morango Cremoso",
    "Doce de Leite",
    "Coco",
    "Banana",
    "Chocolate Supremo",
    "Baunilha Clássico",
    "Ovomaltine",
    "Cookies & Cream"
];

var vetFaixaPreco = [
    "Até R$ 10,00",
    "R$ 10,01 até R$ 20,00",
    "Acima de R$ 20,00"
];

var vetDisponibilidade = [
    "Disponível",
    "Estoque Baixo",
    "Esgotado"
];

var vetProdutos = [];
var indiceEdicao = -1;

const inNome = document.getElementById("inNome");
const sltTipo = document.getElementById("sltTipo");
const sltSabor = document.getElementById("sltSabor");
const inPreco = document.getElementById("inPreco");
const inEstoque = document.getElementById("inEstoque");

const inFiltroNome = document.getElementById("inFiltroNome");
const inFiltroTipo = document.getElementById("inFiltroTipo");
const inFiltroSabor = document.getElementById("inFiltroSabor");
const inFiltroPreco = document.getElementById("inFiltroPreco");
const inFiltroEstoque = document.getElementById("inFiltroEstoque");

const btCadastrar = document.getElementById("btCadastrar");
const btMostrar = document.getElementById("btMostrar");
const btConsultar = document.getElementById("btConsultar");
const btFiltrar = document.getElementById("btFiltrar");
const btEstoqueBaixo = document.getElementById("btEstoqueBaixo");

const outCadastro = document.getElementById("outCadastro");
const outFiltro = document.getElementById("outFiltro");

btCadastrar.addEventListener("click", cadastrarProduto);
btMostrar.addEventListener("click", mostrarProdutos);
btConsultar.addEventListener("click", consultarProduto);
if (btFiltrar) {
    btFiltrar.addEventListener("click", filtrarDisponibilidade);
}
outCadastro.addEventListener("click", gerenciarCliqueProduto);

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
        mostrarProdutos();
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

    if (vetProdutos.length == 0) {
        outCadastro.innerHTML = '<p class="mensagem-vazia">Nenhum produto cadastrado.</p>';
    } else {
        renderizarCardsProdutos(vetProdutos);
    }
}

function consultarProduto() {

    if (inNome.value == "" &&
        sltTipo.value == "1" &&
        sltSabor.value == "1" &&
        inPreco.value == "" &&
        inEstoque.value == "") {

        alert("Informe algum dado para consulta!");

    } else {

        var pesquisa;

        if (inNome.value != "") {
            pesquisa = inNome.value;
        }

        if (sltTipo.value != "1") {
            pesquisa = sltTipo.value;
        }

        if (sltSabor.value != "1") {
            pesquisa = sltSabor.value;
        }

        if (inPreco.value != "") {
            pesquisa = inPreco.value;
        }

        if (inEstoque.value != "") {
            pesquisa = inEstoque.value;
        }

        var encontrou = false;

        var produtosEncontrados = [];
        var indicesEncontrados = [];

        for (var ind = 0; ind < vetProdutos.length; ind++) {

            if (
                vetProdutos[ind].nome.toUpperCase() == pesquisa.toUpperCase() ||
                vetProdutos[ind].tipo.toUpperCase() == pesquisa.toUpperCase() ||
                vetProdutos[ind].sabor.toUpperCase() == pesquisa.toUpperCase() ||
                vetProdutos[ind].preco == Number(pesquisa) ||
                vetProdutos[ind].estoque == Number(pesquisa)
            ) {

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

function limparCampos() {

    inNome.value = "";
    sltTipo.selectedIndex = 0;
    sltSabor.selectedIndex = 0;
    inPreco.value = "";
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

        info.appendChild(titulo);
        info.appendChild(tipo);
        info.appendChild(sabor);
        info.appendChild(preco);
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

function filtrarDisponibilidade() {

    var disponibilidadeSelecionada = inFiltroEstoque.value;
    outFiltro.textContent = "";

    var continuar = true;

    if (vetProdutos.length == 0) {
        outFiltro.textContent = "Nenhum produto cadastrado.";
        continuar = false;
    }

    if (continuar == true) {

        if (disponibilidadeSelecionada == "todos") {

            for (var ind = 0; ind < vetProdutos.length; ind++) {
                outFiltro.textContent += "Nome: " + vetProdutos[ind].nome + "\n";
                outFiltro.textContent += "Tipo: " + vetProdutos[ind].tipo + "\n";
                outFiltro.textContent += "Sabor: " + vetProdutos[ind].sabor + "\n";
                outFiltro.textContent += "Preço: R$ " + vetProdutos[ind].preco.toFixed(2) + "\n";
                outFiltro.textContent += "Estoque: " + vetProdutos[ind].estoque + "\n\n";
            }

        } else {

            var produtosFiltrados = [];

            for (var ind = 0; ind < vetProdutos.length; ind++) {

                var status = "";

                if (vetProdutos[ind].estoque > 10) {
                    status = "disponivel";
                } else if (vetProdutos[ind].estoque >= 1 && vetProdutos[ind].estoque <= 10) {
                    status = "baixo";
                } else if (vetProdutos[ind].estoque <= 0) {
                    status = "esgotado";
                }

                if (status == disponibilidadeSelecionada) {
                    produtosFiltrados.push(vetProdutos[ind]);
                }
            }

            if (produtosFiltrados.length == 0) {
                outFiltro.textContent = "Nenhum produto encontrado com esta disponibilidade.";
            } else {
                for (var ind = 0; ind < produtosFiltrados.length; ind++) {
                    outFiltro.textContent += "Nome: " + produtosFiltrados[ind].nome + "\n" +
                        "Tipo: " + produtosFiltrados[ind].tipo + "\n";
                    outFiltro.textContent += "Sabor: " + produtosFiltrados[ind].sabor + "\n";
                    outFiltro.textContent += "Preço: R$ " + produtosFiltrados[ind].preco.toFixed(2) + "\n";
                    outFiltro.textContent += "Estoque: " + produtosFiltrados[ind].estoque + "\n\n";
                }
            }
        }
    }
}

if (btEstoqueBaixo) {
    btEstoqueBaixo.addEventListener("click", exibirEstoqueBaixo);
}

function exibirEstoqueBaixo() {
    outFiltro.textContent = "";

    if (vetProdutos.length == 0) {
        alert("cadastre um produto!");
    } else {
        for (let ind = 0; ind < vetProdutos.length; ind++) {
            let produto = vetProdutos[ind];
            if (produto.estoque < 10) {
                outFiltro.textContent += "Nome: " + produto.nome + "\n" +
                    "Tipo: " + produto.tipo + "\n";
                outFiltro.textContent += "Sabor: " + produto.sabor + "\n";
                outFiltro.textContent += "Preço: R$ " + produto.preco.toFixed(2) + "\n";
                outFiltro.textContent += "Estoque: " + produto.estoque + "\n\n";
            }
        }
    }
}
