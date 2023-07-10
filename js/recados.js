function sairConta() {
  var confirmarSaida = confirm("Tem certeza de que deseja sair?");

  if (confirmarSaida) {
    alert("Saindo do Sistema de Recados...");

    var loader = document.createElement("div");
    loader.classList.add("loader");
    document.body.appendChild(loader);

    var recadosHtml = document.querySelector(".recadosHtml");
    recadosHtml.style.display = "none";

    setTimeout(function () {
      loader.remove();
      window.location.href = "login.html";
    }, 5000);
  }
}

const uploadInput = document.getElementById("fotoInput");
const uploadedImage = document.getElementById("uploaded-image");
uploadInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  uploadedImage.src = URL.createObjectURL(file);
});

var sairContaBtn = document.querySelector(".sairdaconta");
var textoOriginal = sairContaBtn.innerHTML;
var iconePortaAberta =
  '<i class="fas fa-door-open" style="margin-left: 5px;"></i>';
var textoPortaAberta = "Sair da Conta";

sairContaBtn.addEventListener("mouseenter", function () {
  sairContaBtn.innerHTML = textoPortaAberta + iconePortaAberta;
});

sairContaBtn.addEventListener("mouseleave", function () {
  sairContaBtn.innerHTML = textoOriginal;
});

function getRecadosTable() {
  return document.getElementById("recadosTable");
}

function getSequenciaID() {
  var sequencia = parseInt(localStorage.getItem("sequenciaID")) || 0;
  return sequencia;
}

function incrementarSequenciaID() {
  var sequencia = getSequenciaID();
  sequencia++;
  localStorage.setItem("sequenciaID", sequencia.toString());
}

function adicionarRecadoTabela(id, titulo, descricao) {
  var table = getRecadosTable();

  var rows = table.rows;
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var idCell = row.cells[0];
    if (idCell.innerHTML === id) {
      return;
    }
  }

  var row = table.insertRow(-1);

  var idCell = row.insertCell(0);
  idCell.innerHTML = id;

  var tituloCell = row.insertCell(1);
  tituloCell.innerHTML = titulo;

  var descricaoCell = row.insertCell(2);
  descricaoCell.innerHTML = descricao;

  var acaoCell = row.insertCell(3);
  var editarBtn = document.createElement("button");
  editarBtn.innerHTML = "Editar";
  editarBtn.addEventListener("click", function () {
    editarRecado(id, titulo, descricao);
  });
  acaoCell.appendChild(editarBtn);

  var excluirBtn = document.createElement("button");
  excluirBtn.innerHTML = "Excluir";
  excluirBtn.addEventListener("click", function () {
    excluirRecado(id);
  });
  acaoCell.appendChild(excluirBtn);

  alert("Recado adicionado com Sucesso");

  adicionarRecadoLocalStorage(id, titulo, descricao);
}

function adicionarRecado() {
  event.preventDefault();

  var tituloInput = document.getElementById("tituloInput");
  var descricaoInput = document.getElementById("descricaoInput");

  var titulo = tituloInput.value.trim();
  var descricao = descricaoInput.value.trim();

  if (titulo === "" || descricao === "") {
    alert("Por favor, preencha todos os campos vazios!");
    return;
  }

  var id = getSequenciaID().toString();
  incrementarSequenciaID();

  adicionarRecadoTabela(id, titulo, descricao);

  tituloInput.value = "";
  descricaoInput.value = "";
}

function adicionarRecadoLocalStorage(id, titulo, descricao) {
  var recados = JSON.parse(localStorage.getItem("recados")) || [];
  var recadoExistente = recados.find(function (recado) {
    return recado.id === id;
  });
  if (!recadoExistente) {
    recados.push({ id: id, titulo: titulo, descricao: descricao });
    localStorage.setItem("recados", JSON.stringify(recados));
  }
}

function removerRecadoLocalStorage(id) {
  var recados = JSON.parse(localStorage.getItem("recados")) || [];
  recados = recados.filter(function (recado) {
    return recado.id !== id;
  });
  localStorage.setItem("recados", JSON.stringify(recados));
}

function editarRecadoLocalStorage(id, novoTitulo, novaDescricao) {
  var recados = JSON.parse(localStorage.getItem("recados")) || [];
  recados.forEach(function (recado) {
    if (recado.id === id) {
      recado.titulo = novoTitulo;
      recado.descricao = novaDescricao;
    }
  });
  localStorage.setItem("recados", JSON.stringify(recados));
}

function carregarRecados() {
  var recados = JSON.parse(localStorage.getItem("recados")) || [];

  var table = getRecadosTable();
  var rowCount = table.rows.length;

  for (var i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }

  recados.forEach(function (recado, index) {
    var novoId = (index + 1).toString();
    adicionarRecadoTabela(novoId, recado.titulo, recado.descricao);
  });
}

function editarRecado(id, tituloAntigo, descricaoAntiga) {
  var novoTitulo = prompt("Digite o novo título:", tituloAntigo);
  var novaDescricao = prompt("Digite a nova descrição:", descricaoAntiga);

  if (novoTitulo === null || novaDescricao === null) {
    return;
  }

  editarRecadoLocalStorage(id, novoTitulo, novaDescricao);

  var table = getRecadosTable();
  var rows = table.rows;
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var idCell = row.cells[0];
    if (idCell.innerHTML === id) {
      var tituloCell = row.cells[1];
      var descricaoCell = row.cells[2];
      tituloCell.innerHTML = novoTitulo;
      descricaoCell.innerHTML = novaDescricao;
      break;
    }
  }
}

function excluirRecado(id) {
  if (confirm("Tem certeza de que deseja excluir este recado?")) {
    removerRecadoLocalStorage(id);

    var table = getRecadosTable();
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var idCell = row.cells[0];
      if (idCell.innerHTML === id) {
        table.deleteRow(i);

        alert("Recado excluído com sucesso!");

        break;
      }
    }
  }
}

function excluirTodosRecados() {
  if (confirm("Tem certeza de que deseja excluir todos os recados?")) {
    localStorage.removeItem("recados");

    var table = getRecadosTable();
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    alert("Todos os recados foram excluídos com sucesso!");

    window.location.reload();
  }
}
window.addEventListener("load", function () {
  carregarRecados();
});

var form = document.getElementById("recadoForm");
form.addEventListener("submit", adicionarRecado);
