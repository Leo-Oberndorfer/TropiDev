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
    growBoxes();

    if(text[text.length-1] === "\n") {
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

function growBoxes() {
    let element = document.querySelector("#input-code-box");
    let ln = document.querySelector(".line-numbers-rows");
    let height = element.scrollHeight;
    if(height === 0) {
        for (let line of ln.children) {
            height += 24;
        }
    }
    element.style.height = (height + 4)+"px";
}

function checkTab(event) {
    let element = document.querySelector("#input-code-box");
    let code = element.value;
    if(event.key === "Tab") {
        /* Tab key pressed */
        event.preventDefault(); // stop normal
        let before_tab = code.slice(0, element.selectionStart); // text before tab
        let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
        let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        element.value = before_tab + "\t" + after_tab; // add tab char
        // move cursor
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        format(element.value); // Update text to include indent
    }
}