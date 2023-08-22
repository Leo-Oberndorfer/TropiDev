function InputRegisterEmail(){
    showRegisterForm();
    const email = document.getElementById("register-prompt-email");
    const registerFormEmail = document.getElementById("register-form-email");
    registerFormEmail.value = email.value;
}

function showRegisterForm(){
    const overlay = document.getElementById("register-overlay");
    overlay.classList.remove("hidden");
}

function hideRegisterForm(){
    const overlay = document.getElementById("register-overlay");
    overlay.classList.add("hidden");
}