const urlParams = new URLSearchParams(window.location.search);
const selectedCourseUpper = urlParams.get('course').toUpperCase();
const selectedCourseLower = urlParams.get('course').toLowerCase();
const file = `/script/courses/${selectedCourseUpper}CourseProperties.json`;
let properties = ["course-heading", "course-description", "course-intro", "course-duration", "course-chapters", "course-difficulty"];

function setHomeAppearance(){
    fetch(file)
        .then(response => {
            if(response.ok){
                response.json().then(data => {
                    document.title = `Developer Island | ${selectedCourseUpper} Course`;
                    for (let property of properties) {
                        getElement(property).innerHTML = data[property];
                    }

                    let difficulty = getElement("course-difficulty");
                    difficulty.setAttribute("class", `size-16 level-${difficulty.innerHTML.toLowerCase()}`);

                    let list = getElement("course-skills");
                    for (let item of data["course-skills"]) {
                        let li = document.createElement("li");
                        li.innerHTML = item;
                        list.appendChild(li);
                    }

                    calculateUserProgress(data);
                    setStyle(data);

                    //Button
                    getElement("course-start-btn").innerHTML = "Start learning"; //Calculate this
                });
            } else {
                courseNotFound();
            }
        })
}

function loadLayout(){
    const duration = 1500;
    const flyUp = [
        {transform: 'translateY(0)'},
        {transform: 'translateY(-200%)'}
    ];
    const shrink = [
        {height: '100%'},
        {height: '50%'}
    ];
    const fadeOut = [
        {opacity: '1'},
        {opacity: '0'}
    ]
    getElement("info-box").animate(shrink, {duration, fill: "forwards"});

    getElement("cards").animate(flyUp, duration);
    getElement("info").animate(fadeOut, duration)
    getElement("course-description").animate(fadeOut, duration)

    setTimeout(function (){getElement("cards").remove()}, duration);
    setTimeout(function (){getElement("info").remove()}, duration);
    setTimeout(function (){getElement("course-description").remove()}, duration);
}

function getElement(id){
    return document.getElementById(id);
}

function courseNotFound(){
    getElement("course-body").innerHTML =
        "<h1 style='font-size: 64px; font-weight: 750; color: #230d34;'>Course not found</h1>" +
        "<p style='font-size: 18px; font-weight: 500; color: #00172b'>The course you were looking for does not exist (yet)</p>";
    getElement("course-body").style.cssText = "text-align: center; padding: 230px 25px 230px 25px;";
    console.log("File not found, enter a valid course.");
}

function setStyle(data){
    getElement("course-image").src = `../../assets/courses/${selectedCourseLower}/${selectedCourseLower}.png`;
    getElement("course-content").style.backgroundColor = data["bg-color"];
    let listStyle = document.body.appendChild(document.createElement("style"));
    listStyle.innerHTML = `#course-skills li::before {content: "\\2022"; color: ${data["list-item-dot-color"]}; display: inline-block; font-weight: bold; margin-left: -20px; width: 20px;}`;
    getElement("course-start-btn").style.cssText = `margin-top: 25px; background-color: ${data["btn-color"]}; border: none; font-size: 18px;`;
}

function calculateUserProgress(data){
    let progress = 50; //Calculate this - Progress
    getElement("user-progress").innerHTML = progress.toString();
    getElement("progress-bar").style.cssText = `width: ${progress}%; background-color: ${data["btn-color"]};`;
}