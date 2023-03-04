let selectedCourseUpper;
let selectedCourseLower;
let file;
const properties = ["course-head-title", "course-head-description", "course-duration", "course-difficulty"];

function setHomeAppearance(course){
    selectedCourseLower = course;
    selectedCourseUpper = course.toUpperCase();
    file = `assets/courses/${selectedCourseLower}/${selectedCourseUpper}CourseProperties.json`;

    fetch(file)
        .then(response => {
            if(response.ok){
                response.json().then(data => {
                    let courseInfo = data["course-info"];
                    let courseChapters = data["course-chapters"];
                    document.title = `Developer Island | ${selectedCourseUpper} Course`;
                    for (let property of properties) {
                        getElement(property).innerHTML = courseInfo[property];
                    }

                    let list = getElement("course-skills");
                    for (let item of courseInfo["course-skills"]) {
                        let li = document.createElement("li");
                        li.innerHTML = item;
                        list.appendChild(li);
                    }

                    setDifficulty();
                    calculateUserProgress(courseInfo);
                    loadChapters(courseChapters);
                    setButton();
                    setStyle(courseInfo);
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

function setStyle(data){
    getElement("course-wrapper-image").src = `assets/courses/${selectedCourseLower}/${selectedCourseLower}.png`;
    getElement("course-body-wrapper").style.backgroundColor = data["bg-color"];
    let listStyle = document.body.appendChild(document.createElement("style"));
    listStyle.innerHTML = `
    #course-skills li::before {
    content: "\\2022"; 
    color: ${data["list-item-dot-color"]}; 
    display: inline-block; 
    font-weight: bold; 
    margin-left: -20px; 
    width: 20px;}`;
    getElement("course-start-btn").style.backgroundColor = data["btn-color"];
}

function setDifficulty(){
    let difficulty = getElement("course-difficulty");
    difficulty.setAttribute("class", `size-16 level-${difficulty.innerHTML.toLowerCase()}`);
}

function setButton(){
    getElement("course-start-btn").innerHTML = "Start learning"; //TODO: Calculate this
}

function calculateUserProgress(data){
    let progress = 50; //TODO: Calculate this - Progress
    getElement("user-progress").innerHTML = progress.toString();
    getElement("progress-bar").style.cssText = `width: ${progress}%; background-color: ${data["btn-color"]};`;
}