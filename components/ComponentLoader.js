function loadComponents() {
    let z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /* search for elements with a certain atrribute: */
        file = elmnt.getAttribute("import");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status === 404) {
                        elmnt.innerHTML = "Unable to load this component";
                        elmnt.style.color = "white";
                        elmnt.style.textAlign = "center";
                        elmnt.style.padding = "20px";
                        elmnt.style.fontSize = "30px";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("import");
                    loadComponents();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            break;
        }
    }
    setTimeout(() => {
        requestLoginStatus();
    }, 100);
}