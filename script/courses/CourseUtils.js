function loadCourse(){
    const course = getCourse();
    if(course != null) {
        loadCourseComponents(course);
        return;
    }
    courseNotFound();
}

function getCourse(){
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('course');

    if(param != null) return param.toLowerCase();
    return null;
}

function loadCodeInputs(){
    const codeAreas = document.querySelectorAll(".outer-code-box");
    Prism.highlightAll();
    reloadLineNumbers();
    for(const codeArea of codeAreas){
        resizeBox(codeArea);
    }
}

function formatInput(parent) {
    const codeBox = parent.querySelector(".display-code-box");
    let text = parent.querySelector(".input-code-box").value;

    if(text[text.length-1] === "\n" || text[text.length-1] === "\t" || text[text.length-1] === " "){
        text += "‎";
    }
    codeBox.innerHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    Prism.highlightElement(codeBox);
    resizeBox(parent);
}

function reloadLineNumbers(){
    const ln = document.querySelector(".line-numbers-rows");
    if(ln === null) return;
    for(const line of ln.children){
        line.style.height = "24px";
    }
}

function resizeBox(parent) {
    const codeBox = parent.querySelector(".input-code-box");
    const displayBox = parent.querySelector(".display-code-box");
    const height = displayBox.offsetHeight;
    codeBox.style.height = (height >= 26 ? height : 26) +"px";
}

function handelKeyPress(event, ref){
    matchBrackets(event, ref);
    formatLines(event, ref);
    formatInput(ref.parentNode);
}

function formatLines(event, textarea) {
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const beforeCursor = textarea.value.slice(0, selectionStart);
    const afterCursor = textarea.value.slice(selectionEnd);

    if(event.key === "Tab") {
        event.preventDefault();
        if(selectionStart === selectionEnd) {
            textarea.value = beforeCursor + "\t" + afterCursor;
            textarea.selectionStart = selectionEnd + 1;
            textarea.selectionEnd = selectionEnd + 1;
        } else {
            let text = textarea.value;
            let before = text.substring(0, selectionStart);
            let selection = text.substring(selectionStart, selectionEnd);
            let after = text.substring(selectionEnd, text.length);
            let newSelection = selection.replace(/\n/g, "\n\t");
            textarea.value = before + "\t" + newSelection + after;
            textarea.selectionStart = selectionStart;
            textarea.selectionEnd = selectionEnd + newSelection.length - selection.length + 1;
        }
    }

    if (event.key === 'Enter') {
        const match = beforeCursor.match(/[([{>]\s*$/g);
        const prevLine = beforeCursor.split('\n').pop();
        const tabs = prevLine.match(/^\t*/)[0];
        let newLine = '\n' + tabs;
        let newFollowing = afterCursor;
        if (match && afterCursor.match(/^\s*[)\]}]/g)) {
            newLine += '\t';
            newFollowing = '\n' + tabs + afterCursor.replace(/^\s*/, '');
        }
        textarea.value = beforeCursor + newLine + newFollowing;
        textarea.selectionStart = selectionStart + newLine.length;
        textarea.selectionEnd = selectionStart + newLine.length;
        event.preventDefault();
    }
}

function matchBrackets(event, ref) {
    const selectionStart = ref.selectionStart;
    const selectionEnd = ref.selectionEnd;

    const beforeCursor = ref.value.slice(0, selectionStart);
    const betweenCursor = ref.value.slice(selectionStart, selectionEnd);
    const afterCursor = ref.value.slice(selectionEnd);

    if (event.key === '(' || event.key === '[' || event.key === '{' || event.key === '<') {
        ref.value = beforeCursor + event.key + betweenCursor + event.key.replace(/[{(\[<]/, function (match) {
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
        ref.selectionStart = selectionEnd + 1;
        ref.selectionEnd = selectionEnd + 1;
        event.preventDefault();
    }

    if(event.key === 'Backspace'){
        if(beforeCursor[beforeCursor.length-1] === '(' || beforeCursor[beforeCursor.length-1] === '[' || beforeCursor[beforeCursor.length-1] === '{' || beforeCursor[beforeCursor.length-1] === '<') {
            if (ref.value[selectionStart] === ')' || ref.value[selectionStart] === ']' || ref.value[selectionStart] === '}' || ref.value[selectionStart] === '>') {
                ref.value = beforeCursor + afterCursor.slice(1);
                ref.selectionStart = selectionStart;
                ref.selectionEnd = selectionStart;
            }
        }
    }
}

/* Currently specialised for the HTML course, not finished */
function runCode(ref){
    const parent = ref.parentNode.parentNode;
    const preview = parent.querySelector(".console");
    const code = parent.querySelector(".input-code-box").value;
    preview.srcdoc = code;
}

function clearConsole(ref){
    const parent = ref.parentNode.parentNode;
    const preview = parent.querySelector(".console");
    preview.srcdoc = "";
}