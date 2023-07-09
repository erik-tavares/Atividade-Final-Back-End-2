const togglePassword = document.getElementById("shadow-password");
const senhaInput = document.getElementById("senha");

togglePassword.addEventListener("click", function () {
  if (senhaInput.type === "password") {
    senhaInput.type = "text";
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  } else {
    senhaInput.type = "password";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  limparAvisos();

  if (nome === "" || email === "" || senha === "") {
    exibirAviso("Por favor, preencha todos os campos.");
    return;
  }

  if (senha.length < 8) {
    exibirAviso("A senha deve ter no mínimo 8 caracteres.");
    return;
  }

  const usuarios = obterUsuariosDoLocalStorage();
  const usuarioExistente = usuarios.find((usuario) => usuario.email === email);
  if (usuarioExistente) {
    exibirAviso("Este E-mail já existe!");
    return;
  }

  const novoUsuario = {
    nome: nome,
    email: email,
    senha: senha,
  };

  usuarios.push(novoUsuario);
  salvarUsuariosNoLocalStorage(usuarios);

  exibirAviso("Criando conta...");
  setTimeout(function () {
    window.location.href = "login.html";
  }, 5000);
});

function exibirAviso(mensagem) {
  avisos.textContent = mensagem;
  form.appendChild(avisos);
}

function limparAvisos() {
  avisos.textContent = "";
}

function obterUsuariosDoLocalStorage() {
  const usuariosJSON = localStorage.getItem("usuarios");
  if (usuariosJSON) {
    return JSON.parse(usuariosJSON);
  } else {
    return [];
  }
}

function salvarUsuariosNoLocalStorage(usuarios) {
  const usuariosJSON = JSON.stringify(usuarios);
  localStorage.setItem("usuarios", usuariosJSON);
}
