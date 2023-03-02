
function registerCourseEvents() {
    getElement("course-start-btn").addEventListener('click', () => {
        removeComponents();
        moveProgressBar();
        showCourseContainer();
    });
}

function removeComponents(){
    let $introContainer = $("#course-intro-container");
    let $infoContainer = $("#course-utility-container");
    let $infoList = $("#course-info-list");

    $infoList.addClass("fade-out");
    $infoContainer.css("height", $infoList.height());
    $introContainer.addClass("slide-out fade-out");

    $introContainer.on("transitionend", () => {
        $introContainer.remove();
        $infoList.remove();
    });
}

function showCourseContainer(){
    let $courseContainer = $("#course-container");
    let offset = $("#course-intro-container").offset();

    $courseContainer.removeClass("hidden");
    $courseContainer.addClass("fade-in");

    //TODO: Fix this animation
    $courseContainer.animate( {"transform": `translateY(${$courseContainer.offset().top - offset.top})`}, 1500, function(){
        $courseContainer.removeClass("fade-in");
    });
}

function moveProgressBar() {
    let $progressBarElement = $("#course-progress-bar");
    let $cardFooter = $(".card-footer");
    $cardFooter.css("height", $cardFooter.height());
    $progressBarElement.children("small").removeClass("text-muted");
    let $newProgressBar = $progressBarElement.clone().prependTo("#course-utility-container");
    let $temp = $progressBarElement.clone().appendTo("body");

    let newOffset = $newProgressBar.offset();
    let oldOffset = $progressBarElement.offset();
    let newWidth = $newProgressBar.width();
    let oldWidth = $progressBarElement.width();

    $temp
        .css('position', 'absolute')
        .css('width', oldWidth)
        .css('left', oldOffset.left)
        .css('top', oldOffset.top)
        .css('zIndex', 1000);
    $newProgressBar.hide();
    $progressBarElement.hide();
    $temp.animate( {"top": newOffset.top + 20, "left":newOffset.left, "width":newWidth}, 1700, function(){
        $newProgressBar.show();
        $progressBarElement.remove();
        $temp.remove();
    });
    $newProgressBar.css("padding", "20px 0 0");
}