let slideCount = 0;
let slideIndex = 0;
function initCarousel(){
    slideCount = document.getElementsByClassName("swiper-slide").length;
    for (let i = 0; i < slideCount; i++) {
        addListener(document.getElementsByClassName("swiper-slide")[i]);
    }
}

function addListener(element){
    element.addEventListener("click", function(){
        if(this.classList.contains("next-slide")){
            // Remove old prev slide
            document.getElementsByClassName("swiper-slide")[(slideIndex - 1) > -1 ? slideIndex - 1 : slideCount - 1].classList.remove("prev-slide");
            document.getElementsByClassName("swiper-slide")[(slideIndex - 1) > -1 ? slideIndex - 1 : slideCount - 1].classList.add("hidden-slide");
            // Set new prev slide
            document.getElementsByClassName("swiper-slide")[slideIndex].classList.remove("active-slide");
            document.getElementsByClassName("swiper-slide")[slideIndex].classList.add("prev-slide");
            // Set active slide
            this.classList.remove("next-slide");
            this.classList.add("active-slide");
            // Update slide index
            slideIndex = (slideIndex + 1) % slideCount;
            // Set next slide
            document.getElementsByClassName("swiper-slide")[(slideIndex + 1) % slideCount].classList.remove("hidden-slide");
            document.getElementsByClassName("swiper-slide")[(slideIndex + 1) % slideCount].classList.add("next-slide");
        } else if(this.classList.contains("prev-slide")){
            // Remove old next slide
            document.getElementsByClassName("swiper-slide")[(slideIndex + 1) % slideCount].classList.remove("next-slide");
            document.getElementsByClassName("swiper-slide")[(slideIndex + 1) % slideCount].classList.add("hidden-slide");
            // Set new next slide
            document.getElementsByClassName("swiper-slide")[slideIndex].classList.remove("active-slide");
            document.getElementsByClassName("swiper-slide")[slideIndex].classList.add("next-slide");
            // Set active slide
            this.classList.remove("prev-slide");
            this.classList.add("active-slide");
            // Update slide index
            slideIndex = (slideIndex - 1) > -1 ? slideIndex - 1 : slideCount - 1;
            // Set prev slide
            document.getElementsByClassName("swiper-slide")[(slideIndex - 1) > -1 ? slideIndex - 1 : slideCount - 1].classList.remove("hidden-slide");
            document.getElementsByClassName("swiper-slide")[(slideIndex - 1) > -1 ? slideIndex - 1 : slideCount - 1].classList.add("prev-slide");
        }
    });
}