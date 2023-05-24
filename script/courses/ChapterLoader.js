function loadChapters(chapters){
    const template = getElement(`c${getCourse()}1`);
    const chaptersList = getElement("course-chapter-list");
    getElement("course-chapters").innerHTML = Object.keys(chapters).length.toString();
    let idx = 0;
    for (let chapter in chapters) {
        const accordionItem = template.content.querySelector(".accordion-item").cloneNode(true);
        accordionItem.querySelector(".chapter-title").innerHTML = chapters[chapter]["chapter-title"];
        accordionItem.querySelector(".chapter-description").innerHTML = chapters[chapter]["chapter-description"];
        loadBody(accordionItem, template, chapters, chapter);
        loadTasks(accordionItem, template, chapters, chapter);
        accordionItem.innerHTML = accordionItem.innerHTML.replaceAll("{%id%}", idx);
        chaptersList.appendChild(accordionItem);
        idx++;
    }
}

function loadBody(accordionItem, template, chapters, chapter){
    const headings = chapters[chapter]["chapter-paragraph-headings"];
    let i = 0;
    while (i < headings.length) {
        const paragraph = template.content.querySelector(".paragraph").cloneNode(true);
        const paragraphText = paragraph.querySelector(".paragraph-text")
        const chapterImage = chapters[chapter]["chapter-paragraph-images"][i];
        const codeExample = chapters[chapter]["chapter-paragraph-code-examples"][i];
        const float = i % 2 !== 0 ? "left" : "right";
        const img = chapterImage !== "" && chapterImage !== undefined ? "<img src='" + chapterImage + "' alt='course-asset' style='height: 115px; float: " + float + ";'>" : "";
        paragraph.querySelector(".paragraph-title").innerHTML = headings[i];
        paragraphText.innerHTML = img + chapters[chapter]["chapter-paragraphs"][i];
        if(codeExample !== undefined && codeExample !== "") paragraph.innerHTML += "<pre data-src=" + codeExample + " class='line-numbers'></pre><a href='" + codeExample + "' target='_blank'>Open in new tab</a>";
        accordionItem.querySelector(".chapter-paragraphs").appendChild(paragraph);
        i++;
    }
}

function loadTasks(accordionItem, template, chapters, chapter){
    let i = 0;
    while (i < chapters[chapter]["chapter-tasks"].length) {
        const taskType = chapters[chapter]["chapter-task-input-types"][i];
        const task = template.content.querySelector("." + taskType + "-input-task").cloneNode(true);
        const answer = chapters[chapter]["chapter-task-answers"][i];
        const prefill = chapters[chapter]["chapter-task-prefills"][i];
        const placeholder = prefill === "" ? answer.replace(/\S/gi, '*') : prefill;
        task.querySelector(".task-description").innerHTML = chapters[chapter]["chapter-tasks"][i];
        if(taskType === "text") {
            task.querySelector(".input").placeholder = placeholder;
        } else if(taskType === "code") {
            const displayCodeBox = task.querySelector(".display-code-box");
            displayCodeBox.classList.add("language-" + getCourse());
            task.querySelector(".input-code-box").innerHTML = displayCodeBox.innerHTML = prefill.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        accordionItem.querySelector(".chapter-tasks").appendChild(task);
        i++;
    }
}