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
    codeBox.innerText = text;
    Prism.highlightElement(codeBox);
}