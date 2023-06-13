const game = new Game();
let speed = 5; //Blocks per second
let length = 3;
let rainbow = false;

function loadBoard(){
    let board = document.getElementById("board");
    for(let i = 0; i < 20; i++){
        let row = document.createElement("div");
        row.classList.add("row");
        for(let j = 0; j < 20; j++){
            let block = document.createElement("div");
            block.classList.add("block");
            block.id = i + "," + j;
            row.appendChild(block);
        }
        board.appendChild(row);
    }
}

function reloadBoard(){
    let board = document.getElementById("board");
    while(board.firstChild){
        board.removeChild(board.firstChild);
    }
    loadBoard();
}

function loadGame(){
    if(game.running){
        game.stop();
        return;
    }
    game.stop();
    const lengthVal = document.getElementById("length").value;
    const speedVal = document.getElementById("speed").value;
    const rainbowVal = document.getElementById("rainbow").checked;

    speed = speedVal > 0 && speedVal !== "" ? speedVal : speed;
    length = lengthVal <= 30 ? lengthVal : length;                              //&& typeof(lengthVal) === "number"
    rainbow = typeof(rainbowVal) === "boolean" ? rainbowVal : rainbow;

    game.speed = 1000 / speed;
    game.spawnSnake(length, rainbow ? "rainbow" : "green");
    game.run();

    document.getElementById("start").value = "Abort";
    document.getElementById("settings").classList.add("hidden");
    document.getElementById("gameOver").classList.add("hidden");
    document.getElementById("stats").classList.remove("hidden");
    console.log(length);
    console.log(lengthVal);
}