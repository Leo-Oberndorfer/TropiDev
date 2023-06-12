let selectedCourseUpper;
let selectedCourseLower;
let file;

function loadCourseComponents(course){
    const properties = ["course-head-title", "course-head-description", "course-duration", "course-difficulty"];
    selectedCourseLower = course;
    selectedCourseUpper = course.toUpperCase();
    file = `assets/courses/${selectedCourseLower}/${selectedCourseUpper}CourseProperties.json`; // Will be moved to backend later

    fetch(file).then(response => {
        if(response.ok){
            response.json().then(data => {
                let courseInfo = data["course-info"];
                let courseChapters = data["course-chapters"];
                document.title = `Developer Island | ${selectedCourseUpper} Course`;
                for (let property of properties) {
                    getElement(property).innerHTML = courseInfo[property];
                }
                setDifficulty();
                calculateUserProgress(courseInfo);
                loadChapters(courseChapters);
                setButton();
                loadStyle(courseInfo);
            });
        } else {
            courseNotFound();
        }
    })
}

function courseNotFound(){
    getElement("course-body").innerHTML =
        "<h1 style='font-size: 64px; font-weight: 750; color: #230d34;'>Course not found</h1>" +
        "<p style='font-size: 18px; font-weight: 500; color: #00172b'><p>We couldn't find a course associated with this url</p>";
    getElement("course-body").style.cssText = "text-align: center; padding: 250px 25px 250px 25px;";
    console.log("File not found, enter a valid course.");
}

function loadStyle(data){
    getElement("course-body-wrapper").style.backgroundColor = data["bg-color"];
    getElement("course-start-btn").style.backgroundColor = data["btn-color"];
    getElement("course-heading-icon").src = `assets/courses/${selectedCourseLower}/${selectedCourseLower}.png`;
}

function setDifficulty(){
    let difficulty = getElement("course-difficulty");
    difficulty.setAttribute("class", `size-16 level-${difficulty.innerHTML.toLowerCase()}`);
}

function setButton(){
    getElement("course-start-btn").innerHTML = "Start learning"; //Calculate this
}

function calculateUserProgress(data){
    let progress = 0; //Calculate this - Progress
    getElement("user-progress").innerHTML = progress.toString();
    getElement("progress-bar").style.cssText = `width: ${progress}%; background-color: ${data["btn-color"]};`;
}