const togglePassword = document.getElementById("toggle-password");
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

  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  if (email === "" || senha === "") {
    exibirAviso("Por favor, preencha todos os campos vazios!");
    return;
  }

  const usuarios = obterUsuariosDoLocalStorage();
  const usuario = usuarios.find(
    (usuario) => usuario.email === email && usuario.senha === senha
  );

  if (!usuario) {
    exibirAviso("Email ou Senha inválidos!");
    return;
  }

  exibirAviso("Entrando no Sistema...");
  setTimeout(function () {
    window.location.href = "recados.html";
  }, 5000);
});

function obterUsuariosDoLocalStorage() {
  const usuariosJSON = localStorage.getItem("usuarios");
  if (usuariosJSON) {
    return JSON.parse(usuariosJSON);
  } else {
    return [];
  }
}

function exibirAviso(mensagem) {
  const avisos = document.getElementById("avisos");
  avisos.textContent = mensagem;
}
