function loadChapters(chapters){
    let chaptersList = getElement("course-chapter-list");
    getElement("course-chapters").innerHTML = Object.keys(chapters).length.toString();
    let idx = 0;
    for (let chapter in chapters) {
        chaptersList.innerHTML +=
            "<div class=\"accordion-item\">" +
            "   <h2 class=\"accordion-header\" id=\"flush-heading-" + idx + "\">" +
            "       <button class=\"accordion-button collapsed\" onclick=\"loadCodeInputs();\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse" + idx + "\" aria-expanded=\"false\" aria-controls=\"flush-collapse-" + idx + "\">" +
            "           <div class=\"task-circle\" id=\"task-circle-" + idx + "\"></div>" +
            "           <b>" +
            chapters[chapter]["chapter-title"] +
            "           </b>" +
            "       </button>" +
            "   </h2>" +
            "   <div id=\"flush-collapse" + idx + "\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-heading-" + idx + "\" data-bs-parent=\"#course-chapter-list\">" +
            "       <div class=\"accordion-body\" id=\"chapter-body-" + idx + "\">" +
            "       <p>" + chapters[chapter]["chapter-description"] + "</p>" +
            "       </div>" +
            "   </div>" +
            "</div>"
        ;
        loadChapterBody(chapters, chapter, idx);
        idx++;
    }
}

function loadChapterBody(chapters, chapter, idx){
    let chapterBody = getElement("chapter-body-" + idx);
    let i = 0;
    let headings = chapters[chapter]["chapter-paragraph-headings"];
    while(i < headings.length){
        let heading = headings[i];
        let paragraph = chapters[chapter]["chapter-paragraphs"][i];
        let img = chapters[chapter]["chapter-paragraph-images"][i];
        let codeExample = chapters[chapter]["chapter-paragraph-code-examples"][i];

        if(img !== "" && img !== undefined){
            let float = i % 2 !== 0 ? "left" : "right";
            img = "<img src=\"" + img + "\" alt=\"course-asset\" style=\"height: 115px; float: "+ float +";\">";
        } else {
            img = "";
        }

        chapterBody.innerHTML +=
            (heading !== "" ? "<h4>" + headings[i] + "</h4>" : "") +
            "<p>" + img + paragraph + "</p>" +
            ((codeExample !== undefined && codeExample !== "") ? "<pre><code class='language-" + selectedCourseLower + " line-numbers'>" + codeExample + "</code></pre>" : "")
        ;
        i++;
    }
    chapterBody.innerHTML += loadTasks(chapters, chapter);
}

function loadTasks(chapters, chapter){
    let html =
        "<div class=\"tasks\">" +
        "<h4 id='task-heading'>Complete the tasks below:</h4>";

    let i = 0;
    while(i < chapters[chapter]["chapter-tasks"].length){
        html +=
            "<p class='chapter-task'>" + chapters[chapter]["chapter-tasks"][i] + "</p>" +
            loadInput(chapters[chapter]["chapter-task-input-types"][i], chapters[chapter]["chapter-task-answers"][i], chapters[chapter]["chapter-task-prefills"][i], i)
        i++;
    }

    html += "</div>";

    return html;
}

function loadInput(type, answer, prefill, id){
    let html = "";

    prefill = prefill === "" ? answer.replace(/\S/gi, '*') : prefill;

    if(type === "text") {
        html +=
            "<form class='flex input-form'>" +
            "<input type='text' class='input' id='input-" + id + "' placeholder='" + prefill + "'>" +
            "<input type='button' class='button hint' id='hint-" + id + "' value='Hint' onclick=''>" +
            "<input type='button' class='button submit' id='submit-" + id + "' value='Submit' onclick=''>" +
            "</form>"
    } else if(type === "code"){
        html +=
            "<div class='code-area'>" +
                "<pre id='outer-code-box'>" +
                "<textarea oninput='format(this.value)' onkeydown='handelKeyPress(event, this)' id='input-code-box' spellcheck='false'>" + prefill + "</textarea>" +
                    "<code id='display-code-box' class='language-" + selectedCourseLower + " line-numbers'>" +
                    prefill +
                    "</code>" +
                "</pre>" +
                "<form class='flex input-form'>" +
                    "<input type='button' class='button hint' id='hint-" + id + "' value='Hint' onclick=''>" +
                    "<input type='button' class='button submit' id='submit-" + id + "' value='Submit' onclick=''>" +
                "</form>" +
            "</div>";
    }

    return html;
}

