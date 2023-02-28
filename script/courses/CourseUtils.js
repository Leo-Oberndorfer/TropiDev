function loadCourse(){
    let urlParams = new URLSearchParams(window.location.search);
    let param = urlParams.get('course');

    if(param != null){
        setHomeAppearance(param.toLowerCase());
        registerCourseEvents();
    } else {
        courseNotFound();
    }
}