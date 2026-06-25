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
const sltFaixaPreco = document.getElementById("sltFaixaPreco")

const btCadastrar = document.getElementById("btCadastrar");
const btMostrar = document.getElementById("btMostrar");
const btConsultar = document.getElementById("btConsultar");
const btConsultarFaixaPreco = document.getElementById("btConsultarFaixaPreco");
const btEstoqueBaixo = document.getElementById("btEstoqueBaixo");

const outCadastro = document.getElementById("outCadastro");

btCadastrar.addEventListener("click", cadastrarProduto);
btMostrar.addEventListener("click", mostrarProdutos);
btConsultar.addEventListener("click", consultarProduto);
btConsultarFaixaPreco.addEventListener("click", consultarFaixaPreco);


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
        vetProdutos.push(produto);

        const jsonVetProdutos = JSON.stringify(vetProdutos);
        console.log(jsonVetProdutos);

        localStorage.setItem("listaprodutos", jsonVetProdutos);

        alert("Produto cadastrado!");

        limparCampos();
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

        outCadastro.textContent = "";

        for (var ind = 0; ind < vetProdutos.length; ind++) {

            if (
                vetProdutos[ind].nome.toUpperCase() == pesquisa.toUpperCase() ||
                vetProdutos[ind].tipo.toUpperCase() == pesquisa.toUpperCase() ||
                vetProdutos[ind].sabor.toUpperCase() == pesquisa.toUpperCase() ||
                vetProdutos[ind].preco == Number(pesquisa) ||
                vetProdutos[ind].estoque == Number(pesquisa)
            ) {

                outCadastro.textContent +=
                    "Nome: " + vetProdutos[ind].nome +
                    "\nTipo: " + vetProdutos[ind].tipo +
                    "\nSabor: " + vetProdutos[ind].sabor +
                    "\nPreço: R$ " + vetProdutos[ind].preco.toFixed(2) +
                    "\nEstoque: " + vetProdutos[ind].estoque +
                    "\n\n";

                encontrou = true;
            }
        }

        if (encontrou == false) {
            outCadastro.textContent = "Produto não encontrado.";
        }

        limparCampos();
    }
}

function consultarFaixaPreco() {

    if (sltFaixaPreco.value == "1") {

        alert("Selecione uma faixa de preço!");
        sltFaixaPreco.focus();

    } else {

        var faixaSelecionada = sltFaixaPreco.value;

        var encontrou = false;

        outCadastro.textContent = "";

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

                outCadastro.textContent +=
                    "Nome: " + vetProdutos[ind].nome +
                    "\nTipo: " + vetProdutos[ind].tipo +
                    "\nSabor: " + vetProdutos[ind].sabor +
                    "\nPreço: R$ " + vetProdutos[ind].preco.toFixed(2) +
                    "\nEstoque: " + vetProdutos[ind].estoque +
                    "\n\n";

                encontrou = true;
            }
        }

        if (encontrou == false) {

            outCadastro.textContent =
                "Não há produtos nessa faixa de preço.";
        }
    } limparCampos();
}

function limparCampos() {

    inNome.value = "";
    sltTipo.selectedIndex = 0;
    sltSabor.selectedIndex = 0;
    inPreco.value = "";
    sltFaixaPreco.selectedIndex = 0;
    inEstoque.value = "";
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

btEstoqueBaixo.addEventListener("click", exibirEstoqueBaixo);

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