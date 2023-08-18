function loadComponents() {
    const components = getElements("site-component");
    for(let i = 0 ; i < components.length ; i++) {
        const component = components[i];
        const file = component.getAttribute("import");
        fetch(file).then(response => {
            if (response.ok) {
                response.text().then(htmlCode => {
                    component.innerHTML = htmlCode;
                    if (component.nodeName === "HEADER") setPortalType(getToken());
                });
            } else {
                component.innerHTML = "Unable to load this component";
                component.style.backgroundColor = "black";
                component.style.color = "white";
                component.style.textAlign = "center";
                component.style.padding = "20px";
                component.style.fontSize = "30px";
            }
        });
    }
}