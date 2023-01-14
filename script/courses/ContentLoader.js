const urlParams = new URLSearchParams(window.location.search);
const selectedCourseUpper = urlParams.get('course').toUpperCase();
const selectedCourseLower = urlParams.get('course').toLowerCase();
const file = `/script/courses/${selectedCourseUpper}CourseProperties.json`;
let properties = ["course-heading", "course-description", "course-intro", "course-duration", "course-chapters", "course-difficulty"];

function setHomeAppearance(){
    fetch(file)
        .then((response) => {return response.json();})
        .then((data) => {
            for(let property of properties) {
                document.getElementById(property).innerHTML = data[property];
            }

            let difficulty = document.getElementById("course-difficulty");
            difficulty.setAttribute("class", `size-16 level-${difficulty.innerHTML.toLowerCase()}`);

            let list = document.getElementById("course-skills");
            for(let item of data["course-skills"]){
                let li = document.createElement("li");
                li.innerHTML = item;
                list.appendChild(li);
            }

            calculateUserProgress(data);

            //Style
            document.getElementById("course-image").src = `../../assets/courses/${selectedCourseLower}/${selectedCourseLower}.png`;
            document.getElementById("course-start").style.backgroundColor = data["bg-color"];
            let listStyle = document.body.appendChild(document.createElement("style"));
            listStyle.innerHTML = `#course-skills li::before {content: "\\2022"; color: ${data["list-item-dot-color"]}; display: inline-block; font-weight: bold; margin-left: -20px; width: 20px;}`;

            //Button
            document.getElementById("course-start-btn").innerHTML = "Start learning"; //Calculate this
            document.getElementById("course-start-btn").style.cssText = `margin-top: 25px; background-color: ${data["btn-color"]}; border: none; font-size: 18px;`;
        });
}

function calculateUserProgress(data){
    let progress = 50; //Calculate this - Progress
    document.getElementById("user-progress").innerHTML = progress.toString();
    document.getElementById("progress-bar").style.cssText = `width: ${progress}%; background-color: ${data["btn-color"]};`;
}