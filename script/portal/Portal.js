function getUserByToken(token){
    if(token === "") return Promise.reject("No token provided!");

    return fetch('http://68.183.209.122:81/api/users/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    }).then(response => {
        if(response.ok) return response.json();
        else throw new Error("User not found!");
    });
}

function getToken(){
    return document.cookie !== "" ? document.cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1] : "";
}

function registerLoginForm(){
    const loginForm = getElement('login-form');
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify(Object.fromEntries(new FormData(loginForm).entries()));

        fetch("http://68.183.209.122:81/api/users/credentials", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(response => {
            if (response.ok) {
                response.text().then(token => {
                    handleResponse(JSON.parse(token));
                });
            } else {
                getElement("invalid-password").classList.remove("hidden");
                const pwinput = getElement("passwordInput");
                pwinput.value = "";
                pwinput.focus();
                pwinput.style.outline = "3px solid red";
            }
        });
    };
}

function logOut(){
    document.cookie = "token=";
}

function handleResponse(response){
    document.cookie = `token=${response.id}`;
    setPortalType(response.id);
}

function setPortalType(token) {
    const portalTemplate = getElement('portalTemplate');
    const portal = getElement('portal');

    getUserByToken(token).then(user => {
        portal.replaceChild(portalTemplate.content.getElementById("loggedIn").cloneNode(true), portal.childNodes[0]);
        getElement("username").innerHTML = user.username;
    }).catch(err => {
        console.log(err);
        portal.replaceChild(portalTemplate.content.getElementById("loggedOut").cloneNode(true), portal.childNodes[0]);
        registerLoginForm();
    });
}