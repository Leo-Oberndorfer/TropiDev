class Game {
    food = null;
    startTime = 0;
    running = false;
    spawnSnake(length, color){
        const pos = {x: 7, y: 7}
        this.snake = new Snake(length, color, "up", pos);
        this.snake.draw();
    }
    run() {
        this.running = true;
        this.startTime = new Date().getTime();
        this.interval = setInterval(() => {
            if(!this.running) return;
            this.snake.move();
            if(this.snake.isCollided()) {
                this.running = false;
                document.getElementById("gameOver").classList.remove("hidden");
                document.getElementById("finalScore").innerText = this.snake.score.toString();
                return;
            }
            if(this.food === null) this.spawnFood();
            this.snake.draw();
            this.updateStats();
            if(this.snake.isFoodCollided(this.food)) {
                const block = document.getElementById(this.food.position.y + "," + this.food.position.x);
                block.style.backgroundImage = "";
                this.snake.score++;
                this.snake.length++;
                this.spawnFood();
            }
        }, this.speed);
        this.addEvent();
    }

    stop() {
        reloadBoard();
        this.running = false;
        this.snake = null;
        this.food = null;
        this.startTime = 0;
        this.speed = 0;
        clearInterval(this.interval);
        document.getElementById("start").value = "Start";
        document.getElementById("settings").classList.remove("hidden");
        document.getElementById("gameOver").classList.add("hidden");
        document.getElementById("stats").classList.add("hidden");
    }

    addEvent(){
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                case "w":
                    if (this.snake.direction !== "down") this.snake.direction = "up";
                    break;
                case "ArrowDown":
                case "s":
                    if (this.snake.direction !== "up") this.snake.direction = "down";
                    break;
                case "ArrowLeft":
                case "a":
                    if (this.snake.direction !== "right") this.snake.direction = "left";
                    break;
                case "ArrowRight":
                case "d":
                    if (this.snake.direction !== "left") this.snake.direction = "right";
                    break;
            }
        });
    }

    updateStats(){
        document.getElementById("time").innerHTML = "" + Math.round((new Date().getTime() - this.startTime) / 1000);
        document.getElementById("score").innerHTML = "" + this.snake.score;
    }

    spawnFood(){
        let pos = null;
        do {
            let temp = {
                x: Math.floor(Math.random() * 15),
                y: Math.floor(Math.random() * 15)
            }
            this.snake.bodySegments.forEach(segment => {
                if(temp !== null && segment.x === temp.x && segment.y === temp.y) {
                    temp = null;
                }
            });
            if(temp !== null) pos = temp;
        } while(pos === null);
        this.food = new Food(pos);
        this.food.spawn();
    }
}