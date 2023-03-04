function loadChapters(chapters){
    let chaptersList = getElement("course-chapter-list");
    getElement("course-chapters").innerHTML = Object.keys(chapters).length.toString();
    let idx = 0;
    for (let chapter in chapters) {
        chaptersList.innerHTML +=
            "<div class=\"accordion-item\">" +
            "   <h2 class=\"accordion-header\" id=\"flush-heading" + idx + "\">" +
            "       <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse" + idx + "\" aria-expanded=\"false\" aria-controls=\"flush-collapse" + idx + "\">" +
            "           <div class=\"task-circle\" id=\"task-circle-\"" + idx + "></div>" +
            "           <b>" +
            chapters[chapter]["chapter-title"] +
            "           </b>" +
            "       </button>" +
            "   </h2>" +
            "   <div id=\"flush-collapse" + idx + "\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-heading" + idx + "\" data-bs-parent=\"#course-chapter-list\">" +
            "       <div class=\"accordion-body\">" +
            chapters[chapter]["chapter-task-description"] +
            "       </div>" +
            "   </div>" +
            "</div>"
        ;
        idx++;
    }
}