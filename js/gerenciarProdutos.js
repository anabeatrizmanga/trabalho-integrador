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
const btExcluir = document.getElementById("btExcluir");
const btFiltrar = document.getElementById("btFiltrar");
const btEstoqueBaixo = document.getElementById("btEstoqueBaixo");

const outCadastro = document.getElementById("outCadastro");
const outFiltro = document.getElementById("outFiltro");

btCadastrar.addEventListener("click", cadastrarProduto);
btMostrar.addEventListener("click", mostrarProdutos);
btConsultar.addEventListener("click", consultarProduto);
btExcluir.addEventListener("click", excluirProduto);

function cadastrarProduto() {

    var nomeProduto = inNome.value;
    var tipoProduto = sltTipo.value;
    var saborProduto = sltSabor.value;
    var precoProduto = inPreco.value;
    var estoqueProduto = inEstoque.value;

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
    } else if (estoqueProduto <= 0 || inEstoque.value == "") {
        alert("Campo estoque deve ser > 0 ou deixado vazio!");
        inEstoque.focus();
    } else {
        vetProdutos.push(produto);

        console.log(vetProdutos);

        alert("Produto cadastrado!");

        limparCampos();
    }
}

function mostrarProdutos() {

    outCadastro.textContent = "";

    for (var ind = 0; ind < vetProdutos.length; ind++) {

        outCadastro.textContent += "Nome: " + vetProdutos[ind].nome +
            "\nTipo: " + vetProdutos[ind].tipo +
            "\nSabor: " + vetProdutos[ind].sabor +
            "\nPreço: R$ " + vetProdutos[ind].preco.toFixed(2) +
            "\nEstoque: " + vetProdutos[ind].estoque + "\n\n";
    }
}

function consultarProduto() {

    var nome = inNome.value;

    if (outCadastro.textContent == "") {

        outCadastro.textContent = "Produto não encontrado.";
    }
    for (var ind = 0; ind < vetProdutos.length; ind++) {

        if (vetProdutos[ind].nome.toUpperCase() == nome.toUpperCase()) {

            outCadastro.textContent = "Nome: " + vetProdutos[ind].nome +
                "\nTipo: " + vetProdutos[ind].tipo +
                "\nSabor: " + vetProdutos[ind].sabor +
                "\nPreço: R$ " + vetProdutos[ind].preco.toFixed(2) +
                "\nEstoque: " + vetProdutos[ind].estoque;
        }
    }

    limparCampos();
}

function excluirProduto() {

    var nome = inNome.value;
    var encontrou = false;

    for (var ind = 0; ind < vetProdutos.length; ind++) {

        if (vetProdutos[ind].nome.toUpperCase() == nome.toUpperCase()) {

            vetProdutos.splice(ind, 1);

            encontrou = true;
        }
    }

    if (encontrou == true) {

        mostrarProdutos();

        alert("Produto excluído!");

        limparCampos();

    } else {

        alert("Produto não encontrado!");
    }
}

function limparCampos() {

    inNome.value = "";
    sltTipo.selectedIndex = 0;
    sltSabor.selectedIndex = 0;
    inPreco.value = "";
    inEstoque.value = "";
}