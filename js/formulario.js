let vetPedidos = [];

const btPedido = document.getElementById("btPedido");

btPedido.addEventListener("click", fazerPedido);

carregarPedidos();

function fazerPedido() {

    const nome = document.getElementById("inNome").value;
    const tipo = document.getElementById("tipoDeProduto").value;
    const especial = document.getElementById("tipoDeEspeciaisDaCasa").value;
    const sabor = document.getElementById("sabor").value;
    const endereco = document.getElementById("endereco").value;
    const observacoes = document.getElementById("Observarções").value;

    let tamanho = "";

    const tamanhos = document.getElementsByName("tamanho");

    for (let i = 0; i < tamanhos.length; i++) {
        if (tamanhos[i].checked) {
            tamanho = tamanhos[i].value;
        }
    }

    let complementos = [];

    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach(function (item) {
        if (item.checked) {
            complementos.push(item.value);
        }
    });

    const pedido = {
        nome,
        tipo,
        especial,
        sabor,
        tamanho,
        complementos,
        endereco,
        observacoes
    };

    vetPedidos.push(pedido);

    localStorage.setItem("listaPedidos", JSON.stringify(vetPedidos));

    console.log("Pedido salvo:");
    console.log(pedido);

    console.log("Local Storage:");
    console.log(JSON.parse(localStorage.getItem("listaPedidos")));
}

function carregarPedidos() {

    const dados = localStorage.getItem("listaPedidos");

    if (dados != null) {
        vetPedidos = JSON.parse(dados);
    }

    console.log("Pedidos carregados:");
    console.log(vetPedidos);
}
