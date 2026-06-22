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

const outSaida = document.getElementById("outSaida");

btCadastrar.addEventListener("click", cadastrarProduto);
btMostrar.addEventListener("click", mostrarProdutos);
btConsultar.addEventListener("click", consultarProduto);
btExcluir.addEventListener("click", excluirProduto);
btFiltrar.addEventListener("click", filtrarProdutos);
btEstoqueBaixo.addEventListener("click", estoqueBaixo);