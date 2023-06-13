class Food {
    constructor(position) {
        this.position = position;
    }
    spawn(){
        const block = document.getElementById(this.position.y + "," + this.position.x);
        block.style.backgroundImage = "url('assets/coconut.png')";
        block.style.backgroundSize = "cover";
        block.style.backgroundRepeat = "no-repeat";
        block.style.backgroundPosition = "center";
    }
}