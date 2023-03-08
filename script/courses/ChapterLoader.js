function loadChapters(chapters){
    let chaptersList = getElement("course-chapter-list");
    getElement("course-chapters").innerHTML = Object.keys(chapters).length.toString();
    let idx = 0;
    for (let chapter in chapters) {
        chaptersList.innerHTML +=
            "<div class=\"accordion-item\">" +
            "   <h2 class=\"accordion-header\" id=\"flush-heading-" + idx + "\">" +
            "       <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse" + idx + "\" aria-expanded=\"false\" aria-controls=\"flush-collapse-" + idx + "\">" +
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
        let paragraph = chapters[chapter]["chapter-paragraphs"][i];
        let img = chapters[chapter]["chapter-paragraph-images"][i];

        if(img !== ""){
            let float = i % 2 !== 0 ? "left" : "right";
            img = "<img src=\"" + img + "\" alt=\"course-asset\" style=\"height: 115px; float: "+ float +";\">";
        }

        chapterBody.innerHTML +=
            "<h4>" + headings[i] + "</h4>" +
            "<p>" + img + paragraph + "</p>"
        ;
        i++;
    }
    chapterBody.innerHTML += loadTasks(chapters, chapter);
}

function loadTasks(chapters, chapter){
    let html =
        "<div class=\"tasks\">" +
        "<h4 id='task-heading'>Answer the following questions:</h4>";

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
            "<input type='button' class='button' id='hint' value='Hint' onclick=''>" +
            "<input type='button' class='button' id='submit' value='Submit' onclick=''>" +
            "</form>"
    }

    return html;
}
