const inNome = document.getElementById("inNome");
const tipoDeProduto = document.getElementById("tipoDeProduto");
const tipoDeEspeciaisDaCasa = document.getElementById("tipoDeEspeciaisDaCasa");
const sabor = document.getElementById("sabor");
const endereco = document.getElementById("endereco");
const observacoes = document.getElementById("Observarcoes");
const divEspecial = document.getElementById("divEspecial");

const granulado = document.getElementById("granulado");
const leiteCondensado = document.getElementById("leiteCondensado");
const nutella = document.getElementById("nutella");
const caldaDeChocolate = document.getElementById("caldaDeChocolate");
const leiteEmPo = document.getElementById("leiteEmPo");
const banana = document.getElementById("banana");
const pacoca = document.getElementById("pacoca");
const confetes = document.getElementById("confetes");

const vetTamanho = document.getElementsByName("tamanho");

const btPedido = document.getElementById("btPedido");

let pedidos = [];

carregarPedidos();

btPedido.addEventListener("click", fazerPedido);
tipoDeProduto.addEventListener("change", mostrarEspecial);

function fazerPedido() {

    let tamanho = "";

    for (let ind = 0; ind < vetTamanho.length; ind++) {

        if (vetTamanho[ind].checked == true) {
            tamanho = vetTamanho[ind].value;
        }

    }

    let complementos = "";

    if (granulado.checked == true) {
        complementos += "Granulado ";
    }
    if (leiteCondensado.checked == true) {
        complementos += "Leite Condensado ";
    }
    if (nutella.checked == true) {
        complementos += "Nutella ";
    }
    if (caldaDeChocolate.checked == true) {
        complementos += "Calda de Chocolate ";
    }
    if (leiteEmPo.checked == true) {
        complementos += "Leite em Pó ";
    }
    if (banana.checked == true) {
        complementos += "Banana ";
    }
    if (pacoca.checked == true) {
        complementos += "Paçoca ";
    }
    if (confetes.checked == true) {
        complementos += "Confetes ";
    }

    if (inNome.value == "") {

        alert("Informe seu nome.");

    } else if (tipoDeProduto.value == "") {

        alert("Selecione um tipo de produto.");

    } else if (sabor.value == "") {

        alert("Selecione um sabor.");

    } else if (tamanho == "") {

        alert("Selecione um tamanho.");

    } else if (endereco.value == "") {

        alert("Informe o endereço.");

    } else if (observacoes.value == "") {

        alert("Informe as observações.");

    } else {

        let pedido = {

            nome: inNome.value,
            tipo: tipoDeProduto.value,
            especial: tipoDeEspeciaisDaCasa.value,
            sabor: sabor.value,
            tamanho: tamanho,
            complementos: complementos,
            endereco: endereco.value,
            observacoes: observacoes.value

        };

        pedidos.push(pedido);

        salvarPedidos();

        console.log("Pedido cadastrado:");
        console.log(pedido);

        console.log("Todos os pedidos:");
        console.log(pedidos);

        alert("Pedido realizado com sucesso!");

        limparCampos();

    }

}

function mostrarEspecial() {

    if (tipoDeProduto.value == "especiaisDaCasa") {

        divEspecial.removeAttribute("hidden");

    } else {

        divEspecial.setAttribute("hidden", true);

    }

}

function salvarPedidos() {

    let jsonPedidos = JSON.stringify(pedidos);

    localStorage.setItem("listaPedidos", jsonPedidos);

}

function carregarPedidos() {

    let jsonPedidos = localStorage.getItem("listaPedidos");

    if (jsonPedidos != null) {

        pedidos = JSON.parse(jsonPedidos);

    }

    console.log(pedidos);

}

function limparCampos() {

    inNome.value = "";
    tipoDeProduto.selectedIndex = 0;
    tipoDeEspeciaisDaCasa.selectedIndex = 0;
    sabor.selectedIndex = 0;
    endereco.value = "";
    observacoes.value = "";

    for (let ind = 0; ind < vetTamanho.length; ind++) {
        vetTamanho[ind].checked = false;
    }

    granulado.checked = false;
    leiteCondensado.checked = false;
    nutella.checked = false;
    caldaDeChocolate.checked = false;
    leiteEmPo.checked = false;
    banana.checked = false;
    pacoca.checked = false;
    confetes.checked = false;

    divEspecial.setAttribute("hidden", true);

}