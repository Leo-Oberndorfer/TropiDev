function InputRegisterEmail(){
    showForm();
    const email = document.getElementById("register-prompt-email");
    const registerFormEmail = document.getElementById("register-form-email");
    registerFormEmail.value = email.value;
}

function showForm(){
    const overlay = document.getElementById("register-overlay");
    overlay.classList.remove("hidden");
}