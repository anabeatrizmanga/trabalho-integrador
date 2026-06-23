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
const inTipo = document.getElementById("inTipo");
const inSabor = document.getElementById("inSabor");
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

    var produto = {
        nome: inNome.value,
        tipo: inTipo.value,
        sabor: inSabor.value,
        preco: Number(inPreco.value),
        estoque: Number(inEstoque.value)
    };

    vetProdutos.push(produto);

    console.log(vetProdutos);

    alert("Produto cadastrado!");

    limparCampos();
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
    inTipo.selectedIndex = 0;
    inSabor.selectedIndex = 0;
    inPreco.value = "";
    inEstoque.value = "";
}