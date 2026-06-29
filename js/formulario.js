const inNome = document.getElementById("inNome");
const tipoDeProduto = document.getElementById("tipoDeProduto");
const tipoDeEspeciaisDaCasa = document.getElementById("tipoDeEspeciaisDaCasa");
const sabor = document.getElementById("sabor");
const endereco = document.getElementById("endereco");
const observacoes = document.getElementById("Observarcoes");
const divEspecial = document.getElementById("divEspecial");

const btPedido = document.getElementById("btPedido");

let pedidos = [];

carregarPedidos();

btPedido.addEventListener("click", fazerPedido);

function fazerPedido() {

    let tamanho = "";

    let vetTamanho = document.getElementsByName("tamanho");

    for (let ind = 0; ind < vetTamanho.length; ind++) {

        if (vetTamanho[ind].checked == true) {
            tamanho = vetTamanho[ind].value;
        }

    }

    let complementos = "";

    if (document.getElementById("granulado").checked == true) {
        complementos += "Granulado ";
    }
    if (document.getElementById("leiteCondensado").checked == true) {
        complementos += "Leite Condensado ";
    }
    if (document.getElementById("nutella").checked == true) {
        complementos += "Nutella ";
    }
    if (document.getElementById("caldaDeChocolate").checked == true) {
        complementos += "Calda de Chocolate ";
    }
    if (document.getElementById("leiteEmPo").checked == true) {
        complementos += "Leite em Pó ";
    }
    if (document.getElementById("banana").checked == true) {
        complementos += "Banana ";
    }
    if (document.getElementById("pacoca").checked == true) {
        complementos += "Paçoca ";
    }
    if (document.getElementById("confetes").checked == true) {
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

    }

}

tipoDeProduto.addEventListener("change", mostrarEspecial);
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