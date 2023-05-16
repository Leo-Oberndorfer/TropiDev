function getUserFromToken(){
    let result = null;
    console.log(document.cookie);
    if(document.cookie === "") return result;
    const token = document.cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1];
    console.log(token);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let response = JSON.parse(xhr.responseText);
            if (response) {
                console.log(response);
                result = response;
            }
        }
    }
    xhr.open('GET', 'http://68.183.209.122:81/api/users', true);
    xhr.send(JSON.stringify({token}));
    if(result === null){
        setTimeout(() => {
            return result;
        }, 100);
    }
    return result;
}

function requestLoginStatus(){
    const portalTemplate = document.getElementById('portalTemplate');
    const portal = document.getElementById('portal');

    if (getUserFromToken() !== null) {
        portal.replaceChild(portalTemplate.content.getElementById("loggedIn").cloneNode(true), portal.childNodes[0]);
    } else {
        portal.replaceChild(portalTemplate.content.getElementById("loggedOut").cloneNode(true), portal.childNodes[0]);
    }
}