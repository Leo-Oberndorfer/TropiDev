function loadCourse(){
    let course = getCourse();
    if(course != null) {
        setHomeAppearance(course);
        return;
    }
    courseNotFound();
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

function loadCodeInputs(){
    Prism.highlightAll();
    growBox();
    reloadLineNumbers();
}

function format(text) {
    let codeBox = document.querySelector("#display-code-box");
    growBox();

    if(text[text.length-1] === "\n" || text[text.length-1] === "\t" || text[text.length-1] === " "){
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

function handelKeyPress(event, ref){
    matchBrackets(event, ref);
    formatLines(event);
    format(ref.value);
}

function formatLines(event) {
    const textarea = document.querySelector("#input-code-box");
    const cursorPos = textarea.selectionStart;
    const beforeCursor = textarea.value.slice(0, cursorPos);
    const afterCursor = textarea.value.slice(cursorPos);

    if(event.key === "Tab") {
        event.preventDefault();
        let cursor_pos = textarea.selectionEnd + 1;
        textarea.value = beforeCursor + "\t" + afterCursor;
        textarea.selectionStart = cursor_pos;
        textarea.selectionEnd = cursor_pos;
    }

    if (event.key === 'Enter') {
        const match = beforeCursor.match(/[([{>]\s*$/g);
        const prevLine = beforeCursor.split('\n').pop();
        const tabs = prevLine.match(/^\t*/)[0];
        let newLine = '\n' + tabs;
        let newFollowing = afterCursor;
        if (match && afterCursor.match(/^\s*[)\]}]/g)){
            newLine += '\t';
            newFollowing = '\n' + tabs + afterCursor.replace(/^\s*/, '');
        }
        const newContent = beforeCursor + newLine + newFollowing;
        textarea.value = newContent;
        textarea.selectionStart = cursorPos + newLine.length;
        textarea.selectionEnd = cursorPos + newLine.length;
        event.preventDefault();
    }
}

function matchBrackets(event, ref) {
    const cursorPos = ref.selectionStart;
    const beforeCursor = ref.value.slice(0, cursorPos);
    const afterCursor = ref.value.slice(cursorPos);

    if (event.key === '(' || event.key === '[' || event.key === '{' || event.key === '<') {
        ref.value = beforeCursor + event.key + event.key.replace(/[{(\[<]/, function (match) {
            if (match === '(') {
                return ')';
            } else if (match === '{') {
                return '}';
            } else if (match === '[') {
                return ']';
            } else if (match === '<') {
                return '>';
            }
        }) + afterCursor;
        ref.selectionStart = cursorPos + 1;
        ref.selectionEnd = cursorPos + 1;
        event.preventDefault();
    }

    if(event.key === 'Backspace'){
        if(beforeCursor[beforeCursor.length-1] === '(' || beforeCursor[beforeCursor.length-1] === '[' || beforeCursor[beforeCursor.length-1] === '{' || beforeCursor[beforeCursor.length-1] === '<') {
            if (ref.value[cursorPos] === ')' || ref.value[cursorPos] === ']' || ref.value[cursorPos] === '}' || ref.value[cursorPos] === '>') {
                ref.value = beforeCursor + afterCursor.slice(1);
                ref.selectionStart = cursorPos;
                ref.selectionEnd = cursorPos;
            }
        }
    }
}