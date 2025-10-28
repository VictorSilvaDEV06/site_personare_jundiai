// Alternar entre login e cadastro
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const goRegister = document.getElementById("go-register");
const goLogin = document.getElementById("go-login");

// Verifica se os elementos existem antes de adicionar eventos
if (goRegister && loginForm && registerForm) {
    goRegister.addEventListener("click", () => {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    });
}

if (goLogin && loginForm && registerForm) {
    goLogin.addEventListener("click", () => {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });
}

// Função para criar/mostrar mensagens de erro abaixo dos campos
function mostrarErro(campo, mensagem) {
    let erro = campo.parentNode.querySelector(".erro-mensagem");

    if (!erro) {
        erro = document.createElement("div");
        erro.classList.add("erro-mensagem");
        campo.parentNode.appendChild(erro);
    }

    erro.textContent = mensagem;
    campo.style.borderColor = "red";
}

// Função para limpar erro de um campo
function limparErro(campo) {
    const erro = campo.parentNode.querySelector(".erro-mensagem");
    if (erro) erro.remove();
    campo.style.borderColor = "#ccc";
}

// Validação de campos obrigatórios
function validarCamposObrigatorios(form) {
    const inputs = form.querySelectorAll("input[required], select[required]");
    let valido = true;

    inputs.forEach(campo => {
        limparErro(campo);
        if (!campo.value.trim()) {
            mostrarErro(campo, "Este campo é obrigatório.");
            valido = false;
        }
    });

    return valido;
}

// Validação de senhas
function validarSenhas(password, confirm) {
    limparErro(password);
    limparErro(confirm);

    if (password.value.trim() !== confirm.value.trim()) {
        mostrarErro(confirm, "As senhas não coincidem.");
        password.style.borderColor = "red";
        confirm.style.borderColor = "red";
        return false;
    }
    return true;
}

// Cadastro
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = document.getElementById("register-id");
        const password = document.getElementById("register-password");
        const confirm = document.getElementById("confirm-password");

        // Validação de obrigatórios
        const camposValidos = validarCamposObrigatorios(registerForm);
        const senhasValidas = validarSenhas(password, confirm);

        if (!camposValidos || !senhasValidas) return;

        // Verifica se o usuário já existe
        if (localStorage.getItem(id.value.trim())) {
            mostrarErro(id, "Usuário já cadastrado! Faça login.");
            return;
        }

        // Armazena o usuário e senha
        localStorage.setItem(id.value.trim(), password.value.trim());

        // Mensagem de sucesso
        const sucessoMsg = document.createElement("div");
        sucessoMsg.classList.add("sucesso-mensagem");
        sucessoMsg.textContent = "Cadastro realizado com sucesso!";
        registerForm.appendChild(sucessoMsg);

        registerForm.reset();

        setTimeout(() => {
            sucessoMsg.remove();
            if (goLogin) goLogin.click();
        }, 1500);
    });
}

// Login 
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = document.getElementById("login-id");
        const password = document.getElementById("senha");
        const savedPassword = localStorage.getItem(id.value.trim());

        limparErro(id);
        limparErro(password);

        if (savedPassword && savedPassword === password.value.trim()) {
            localStorage.setItem("loggedUser", id.value.trim());
            window.location.href = "perfil.html";
        } else {
            mostrarErro(password, "Usuário ou senha incorretos.");
        }
    });
}

// LÓGICA DO OLHINHO (mostrar/ocultar senha)
document.addEventListener("DOMContentLoaded", function () {
    const passwordInputs = document.querySelectorAll(".password-input");
    passwordInputs.forEach(input => {
        const toggleId = input.dataset.toggle;
        const toggleIcon = document.getElementById(toggleId);

        if (toggleIcon) {
            toggleIcon.addEventListener("click", () => {
                const type = input.getAttribute("type") === "password" ? "text" : "password";
                input.setAttribute("type", type);
                toggleIcon.classList.toggle("fa-eye-slash");
            });
        }
    });
});