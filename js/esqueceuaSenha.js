const togglePassword = document.getElementById("toggle-password");
const togglePassword2 = document.getElementById("toggle-password2");
const senhaInput = document.getElementById("recuperarSenha");
const repitaSenhaInput = document.getElementById("RepitaSenha");
const aviso = document.getElementById("aviso");

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

togglePassword2.addEventListener("click", function () {
  if (repitaSenhaInput.type === "password") {
    repitaSenhaInput.type = "text";
    togglePassword2.classList.remove("fa-eye");
    togglePassword2.classList.add("fa-eye-slash");
  } else {
    repitaSenhaInput.type = "password";
    togglePassword2.classList.remove("fa-eye-slash");
    togglePassword2.classList.add("fa-eye");
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailInput = document.getElementById("recuperarEmail");
  const email = emailInput.value.trim();

  const senhaInput = document.getElementById("recuperarSenha");
  const senha = senhaInput.value.trim();

  const repitaSenhaInput = document.getElementById("RepitaSenha");
  const repitaSenha = repitaSenhaInput.value.trim();

  limparAvisos();

  if (email === "" || senha === "" || repitaSenha === "") {
    exibirAviso("Por favor, preencha todos os campos vazios!");
    return;
  }

  const usuarios = obterUsuariosDoLocalStorage();
  const usuario = usuarios.find((usuario) => usuario.email === email);

  if (!usuario) {
    exibirAviso("Email não Encontrado!");
    return;
  }

  if (senha !== repitaSenha) {
    exibirAviso("As senhas não são iguais!");
    return;
  }

  usuario.senha = senha;
  salvarUsuariosNoLocalStorage(usuarios);

  exibirAviso("Senha alterada com sucesso!");
  setTimeout(function () {
    window.location.href = "login.html";
  }, 5000);
});

function exibirAviso(mensagem) {
  aviso.textContent = mensagem;
}

function limparAvisos() {
  aviso.textContent = "";
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
