// Referências dos campos do formulário.
const inNome = document.getElementById("inNome");
const sltTipo = document.getElementById("sltTipo");
const sltSabor = document.getElementById("sltSabor");
const inPreco = document.getElementById("inPreco");
const inEstoque = document.getElementById("inEstoque");
const sltFaixaPreco = document.getElementById("sltFaixaPreco");
const grupoFaixaPreco = document.getElementById("grupoFaixaPreco");

// Referências dos botões de ação.
const btCadastrar = document.getElementById("btCadastrar");
const btMostrar = document.getElementById("btMostrar");
const btConsultar = document.getElementById("btConsultar");
const btConsultarFaixaPreco = document.getElementById("btConsultarFaixaPreco");

// Área onde os cards são renderizados.
const outCadastro = document.getElementById("outCadastro");

// Liga cada botão à sua respectiva função.
btCadastrar.addEventListener("click", cadastrarProduto);
btMostrar.addEventListener("click", mostrarProdutos);
btConsultar.addEventListener("click", consultarProduto);
btConsultarFaixaPreco.addEventListener("click", consultarFaixaPreco);
outCadastro.addEventListener("click", gerenciarCliqueProduto);

// Vetor principal dos produtos e controle de edição.
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

        // Salva no localStorage para não perder ao recarregar a página
        salvarProdutosLocalStorage();

        // Reseta todos os campos para o estado inicial
        limparCampos();
    }
}

function mostrarProdutos() {

    // Recarrega os dados antes de mostrar, para garantir sincronização com o localStorage.
    pegarDados();

    if (vetProdutos.length == 0) {
        outCadastro.innerHTML = '<p class="mensagem-vazia">Nenhum produto cadastrado.</p>';
    } else {
        renderizarCardsProdutos(vetProdutos);
    }
}

// Garante que os dados do localStorage sejam carregados ao abrir a página
pegarDados();

function pegarDados() {

    const produtos = JSON.parse(localStorage.getItem("listaprodutos"));
    console.log(produtos);

    // Se não houver dados salvos, o vetor recebe um array vazio.

    //vetProdutos = produtos || [];
    /*if (produtos == null){ //indica que não há listaprodutos no localStorage
        vetProdutos = [];
    } else {
        vetProdutos = produtos;
    }
    */
    vetProdutos = (produtos == null) ? [] : produtos;
}

function consultarProduto() {

    // A consulta usa o próprio campo "Nome do Sorvete".
    var pesquisa = inNome.value.trim().toUpperCase(); // Remove os espaços nas extremidades e comverte o nome em maiúsculo.

    if (pesquisa == "") {
        inNome.focus();
    } else {
        var encontrou = false;
        var vetProdutosEncontrados = [];
        var vetIndicesEncontrados = [];

        for (var ind = 0; ind < vetProdutos.length; ind++) {

            if (vetProdutos[ind].nome.toUpperCase().includes(pesquisa)) {

                vetProdutosEncontrados.push(vetProdutos[ind]);
                vetIndicesEncontrados.push(ind);

                encontrou = true;
            }
        }

        if (encontrou == false) {
            outCadastro.innerHTML = '<p class="mensagem-vazia">Produto não encontrado.</p>';
        } else {
            renderizarCardsProdutos(vetProdutosEncontrados, vetIndicesEncontrados);
        }

        limparCampos();
        cancelarEdicao();
    }
}

function exibirFiltroFaixaPreco() {

    grupoFaixaPreco.hidden = false;
}

function esconderFiltroFaixaPreco() {

    grupoFaixaPreco.hidden = true;
}

function consultarFaixaPreco() {

    // No primeiro clique, apenas exibe o select da faixa.
    var filtroFaixaEstavaOculto = grupoFaixaPreco.hidden;

    exibirFiltroFaixaPreco();

    if (filtroFaixaEstavaOculto == true) {
        sltFaixaPreco.focus();
    } else {

        // Se nada for escolhido, considera "todos".
        var faixaSelecionada = sltFaixaPreco.value;

        if (faixaSelecionada == "1") {
            faixaSelecionada = "todos";
        }

        var encontrou = false;
        var vetProdutosEncontrados = [];
        var vetIndicesEncontrados = [];

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

                vetProdutosEncontrados.push(vetProdutos[ind]);
                vetIndicesEncontrados.push(ind);

                encontrou = true;
            }
        }

        if (encontrou == false) {

            outCadastro.innerHTML = '<p class="mensagem-vazia">Não há produtos nessa faixa de preço.</p>';
        } else {
            renderizarCardsProdutos(vetProdutosEncontrados, vetIndicesEncontrados);
        }

        limparCampos();
        esconderFiltroFaixaPreco();
        cancelarEdicao();
    }
}

function limparCampos() {

    // Restaura o formulário para o estado inicial.
    inNome.value = "";
    sltTipo.selectedIndex = 0;
    sltSabor.selectedIndex = 0;
    inPreco.value = "";
    sltFaixaPreco.selectedIndex = 0;
    inEstoque.value = "";
}

function cancelarEdicao() {

    // Sai do modo de edição e devolve o texto padrão do botão.
    indiceEdicao = -1;
    btCadastrar.textContent = "Cadastrar";
}

function salvarProdutosLocalStorage() {

    // Converte o vetor em texto JSON para salvar no navegador.
    const jsonVetProdutos = JSON.stringify(vetProdutos);
    console.log(jsonVetProdutos);
    localStorage.setItem("listaprodutos", jsonVetProdutos);
}

function renderizarCardsProdutos(produtos, indicesOriginais) {

    // "produtos" é a lista que será mostrada na tela.
    // "indicesOriginais" guarda a posição real desses produtos no vetor vetProdutos.
    // Isso é importante quando a lista veio de uma busca ou filtro.

    // Limpa a área antes de desenhar a lista atual.
    outCadastro.innerHTML = "";

    for (var ind = 0; ind < produtos.length; ind++) {

        // Se a lista veio filtrada, usa o índice original do produto.
        // Se veio da listagem completa, usa o próprio índice do laço.
        var indiceProduto = indicesOriginais ? indicesOriginais[ind] : ind;

        // Pega o produto atual que será transformado em card.
        var produto = produtos[ind];

        // Cria cada elemento HTML do card ainda solto, fora da página.
        // Nesse momento eles existem só no JavaScript, ainda não apareceram no HTML.
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

        // Define as classes usadas pelo CSS para estilizar o card.
        artigo.className = "produto-card";
        info.className = "produto-info";
        acoes.className = "produto-acoes";

        // Preenche os elementos com os dados do produto atual.
        titulo.textContent = produto.nome;
        tipo.innerHTML = "<strong>Tipo:</strong> ";
        sabor.innerHTML = "<strong>Sabor:</strong> ";
        preco.innerHTML = "<strong>Preço:</strong> ";
        estoque.innerHTML = "<strong>Estoque:</strong> ";

        // Acrescenta o valor de cada informação após o rótulo.
        tipo.appendChild(document.createTextNode(produto.tipo));
        sabor.appendChild(document.createTextNode(produto.sabor));
        preco.appendChild(document.createTextNode("R$ " + produto.preco.toFixed(2)));
        estoque.appendChild(document.createTextNode(produto.estoque));

        // Configura os botões e salva neles o índice real do produto.
        // Esse índice será usado depois nas ações de editar e excluir.
        btEditarProduto.type = "button";
        btEditarProduto.className = "bt-editar-produto";
        btEditarProduto.dataset.indice = indiceProduto;
        btEditarProduto.textContent = "Editar";

        btExcluirProduto.type = "button";
        btExcluirProduto.className = "bt-excluir-produto";
        btExcluirProduto.dataset.indice = indiceProduto;
        btExcluirProduto.textContent = "Excluir";

        // Monta o bloco de informações do card.
        // Aqui, cada appendChild coloca um elemento dentro da div "info".
        info.appendChild(titulo);
        info.appendChild(tipo);
        info.appendChild(sabor);
        info.appendChild(preco);
        info.appendChild(estoque);

        // Monta o bloco de ações com os botões editar/excluir.
        // Os dois botões passam a ficar dentro da div "acoes".
        acoes.appendChild(btEditarProduto);
        acoes.appendChild(btExcluirProduto);

        // Junta os dois blocos principais dentro do <article>.
        // O "artigo" vira o card completo do produto.
        artigo.appendChild(info);
        artigo.appendChild(acoes);

        // Por fim, coloca o card pronto dentro da área principal da tela.
        // É aqui que o produto realmente aparece para o usuário.
        outCadastro.appendChild(artigo);
    }
}

function gerenciarCliqueProduto(evento) {

    // Descobre qual botão dentro do card foi clicado.
    var botao = evento.target;

    if (botao.classList.contains("bt-editar-produto")) {
        editarProduto(Number(botao.dataset.indice));
    }

    if (botao.classList.contains("bt-excluir-produto")) {
        excluirProdutoPorIndice(Number(botao.dataset.indice));
    }
}

function editarProduto(indice) {

    // Preenche o formulário com os dados do item escolhido.
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