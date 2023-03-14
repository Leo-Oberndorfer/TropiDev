function loadCourse(){
    let course = getCourse();

    if(course != null){
        setHomeAppearance(course);
    } else {
        courseNotFound();
    }
}

function getCourse(){
    let urlParams = new URLSearchParams(window.location.search);
    let param = urlParams.get('course');

    if(param != null){
        return param.toLowerCase();
    } else {
        return null;
    }
}

function format(text) {
    let codeBox = document.querySelector("#display-code-box");
    growBox();

    if(text[text.length-1] === "\n" ||text[text.length-1] === "\t" ||text[text.length-1] === " "){
        text += "‎";
    }
    codeBox.innerHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    Prism.highlightElement(codeBox);
}

function reloadLineNumbers(){
    let ln = document.querySelector(".line-numbers-rows");
    for(let line of ln.children){
        line.style.height = "24px";
    }
}

function growBox() {
    let codeBox = document.querySelector("#input-code-box");
    let ln = document.querySelector(".line-numbers-rows");
    let height = codeBox.scrollHeight;
    if(height === 0) {
        for (let line of ln.children) {
            height += 24;
        }
    }
    codeBox.style.height = height +"px";
}

function checkTab(event) {
    let element = document.querySelector("#input-code-box");
    let code = element.value;
    let before_tab = code.slice(0, element.selectionStart); // text before input
    let after_tab = code.slice(element.selectionEnd, element.value.length); // text after input
    if(event.key === "Tab") {
        /* Tab key pressed */
        event.preventDefault(); // stop normal
        let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        element.value = before_tab + "\t" + after_tab; // add tab char
        // move cursor
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        format(element.value);
    }
}