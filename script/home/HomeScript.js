function parallaxRun(){
    const scene = document.getElementById("test");
    const parallaxInstance = new Parallax(scene, {
        relativeInput: true,
        pointerEvents: true,
    });
}