function getUserByToken(token){
    if(token === "") return null;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let response = xhr.responseText;
            if (response !== "User not found!") {
                return JSON.parse(response);
            } else {
                return null;
            }
        }
    }
    xhr.open('POST', 'http://68.183.209.122:81/api/users/token', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({token}));
}

function getToken(){
    return document.cookie !== "" ? document.cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1] : "";
}

function registerLoginForm(){
    const loginForm = document.getElementById('login-form');
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const body = JSON.stringify(Object.fromEntries(formData.entries()));
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                let response = xhr.responseText;
                if (response !== "User not found!") {
                    handleResponse(JSON.parse(response));
                } else {
                    alert("Invalid credentials!");
                }
            }
        }
        xhr.open('POST', 'http://68.183.209.122:81/api/users/credentials', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);
    };
}

function logOut(){
    document.cookie = "token=";
    setPortalType("");
}

function handleResponse(response){
    document.cookie = `token=${response.id}`;
    setPortalType(response.id);
}

function setPortalType(token){
    const portalTemplate = document.getElementById('portalTemplate');
    const portal = document.getElementById('portal');

    if (token === "") {
        portal.replaceChild(portalTemplate.content.getElementById("loggedOut").cloneNode(true), portal.childNodes[0]);
        registerLoginForm();
    } else {
        portal.replaceChild(portalTemplate.content.getElementById("loggedIn").cloneNode(true), portal.childNodes[0]);
    }
}