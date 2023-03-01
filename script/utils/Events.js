
function registerCourseEvents() {
    getElement("course-start-btn").addEventListener('click', () => {
        let introContainer = getElement("course-intro-container");
        let courseContainer = getElement("course-container");
        let infoList = getElement("course-info-list");
        let progressBar = getElement("course-progress-bar");
        let courseOverviewContainer = getElement("course-overview-container");

        introContainer.classList.add("fade-out", "slide-out");
        infoList.classList.add("fade-out");
        courseContainer.classList.remove("hidden");
        courseContainer.classList.add("fade-in");

        moveUserProgress(infoList.offsetHeight, progressBar);

        let offsetY = introContainer.offsetHeight;
        courseContainer.style.transform = `translateY(-${offsetY}px)`;

        courseContainer.addEventListener("transitionend", () => {
            introContainer.remove();
            infoList.remove();
            courseOverviewContainer.appendChild(progressBar);
            progressBar.style.position = "static";
            progressBar.style.transform = "translateY(0px)";
            courseContainer.style.transition = "none";
            courseContainer.style.transform = "translateY(0px)";
        });
    });
}

function moveUserProgress(moveTo, progressBarElement){
    progressBarElement.style.width = "90%";
    progressBarElement.style.position = "absolute";
    progressBarElement.style.transform = `translateY(-${moveTo}px)`;
}