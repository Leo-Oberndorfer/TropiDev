async function getUserByToken(token){
    if(token === "") throw new Error("No token set!");

    const response = await fetch('http://68.183.209.122:81/api/users/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    });

    if(response.status === 200) return await response.json();
    else throw new Error("User not found!");

    /*const xhr = new XMLHttpRequest();
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
    xhr.send(JSON.stringify({token}));*/
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
                alert("Invalid credentials!");
            }
        });
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