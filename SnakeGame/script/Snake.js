class Snake {
    bodySegments = [];
    score = 0;

    rainbowColors = [
        "#96C0FF",
        "#9BFFA2",
        "#BEAAFF",
        "#FF9699",
        "#FFE28E",
        "#FFA3F2",
        "#FF9675",
        "#BAFFF6",
        "#EEFF9B",
        "#FF93A9"
    ];

    constructor(length, color, direction, position) {
        this.length = length;
        this.color = color;
        this.direction = direction;
        this.position = position;
    }
    move() {
        switch (this.direction) {
            case "up": this.position.y--; break;
            case "down": this.position.y++; break;
            case "left": this.position.x--; break;
            case "right": this.position.x++; break;
        }
    }

    draw() {
        let color = this.color;
        if(this.color === "rainbow") {
            color = this.rainbowColors[Math.floor(Math.random() * this.rainbowColors.length)];
        }
        if(this.bodySegments.length >= this.length) {
            document.getElementById(this.bodySegments[this.bodySegments.length - 1].y + "," + this.bodySegments[this.bodySegments.length - 1].x).style.backgroundColor = "white";
            this.bodySegments.pop();
        }
        let currentPosition = {x: this.position.x, y: this.position.y};
        this.bodySegments.unshift(currentPosition);
        this.bodySegments.forEach(segment => {
            if(segment !== null) document.getElementById(segment.y + "," + segment.x).style.backgroundColor = color;
        });
    }

    isCollided() {
        return this.position.x < 0 || this.position.x > 20 || this.position.y < 0 || this.position.y > 20 || this.isBodyCollided();
    }

    isBodyCollided() {
        let isCollided = false;
        this.bodySegments.forEach(segment => {
            if(this.bodySegments.indexOf(segment) !== 0 && segment.x === this.position.x && segment.y === this.position.y) {
                isCollided = true;
            }
        });
        return isCollided;
    }

    isFoodCollided(food) {
        return food.position.x === this.position.x && food.position.y === this.position.y;
    }
}