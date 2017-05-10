var context = canvas.getContext("2d");
var board;
var score = 0;
var gameStatus; // start ,running ,gameOver ,win ,timeOver
var time_elapsed;
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
var song = new Audio('opening_song.mp3');



var pacman = {
    row: 0,
    col: 0,
    centerX: 0,
    centerY: 0,
    mouthPos: 0,
    draw: function () {


        if (this.mouthPos == "right") {
            // An arc which goes from 36 degrees to 324 degrees to draw Pacman's head
            context.beginPath();
            context.arc(this.centerX, this.centerY, cnt / 2.5, 0.2 * Math.PI, 1.8 * Math.PI);
            context.lineWidth = "2";
            // The line leading back to the center and then closing the path to finish the
            // open mouth
            context.lineTo(this.centerX, this.centerY);
            context.closePath();
        } else if (this.mouthPos == "left") {
            // An arc which goes from 36 degrees to 324 degrees to draw Pacman's head
            context.beginPath();
            context.arc(this.centerX, this.centerY, cnt / 2.5, 1.2 * Math.PI, 0.8 * Math.PI);
            context.lineWidth = "2";
            // The line leading back to the center and then closing the path to finish the
            // open mouth
            context.lineTo(this.centerX, this.centerY);
            context.closePath();

        } else if (this.mouthPos == "down") {
            // An arc which goes from 36 degrees to 324 degrees to draw Pacman's head
            context.beginPath();
            context.arc(this.centerX, this.centerY, cnt / 2.5, 0.75 * Math.PI, 0.25 * Math.PI);
            context.lineWidth = "2";
            // The line leading back to the center and then closing the path to finish the
            // open mouth
            context.lineTo(this.centerX, this.centerY);
            context.closePath();

        } else if (this.mouthPos == "up") {
            // An arc which goes from 36 degrees to 324 degrees to draw Pacman's head
            context.beginPath();
            context.arc(this.centerX, this.centerY, cnt / 2.5, 1.66 * Math.PI, 1.33 * Math.PI);
            context.lineWidth = "2";
            // The line leading back to the center and then closing the path to finish the
            // open mouth
            context.lineTo(this.centerX, this.centerY);
            context.closePath();
        }



        // Fill pacman's head yellow
        context.fillStyle = "yellow";
        context.fill();
        // Outline the head
        context.strokeStyle = '#000';
        context.stroke();

    }
}
var numberOfGhost = 3;
var life = 3;

var numberOfFood = 90;

var ghostArray = [];

var endTime = 5; //in Min

var cnt = context.canvas.width / 45;

var green_img = new Image();
green_img.src = 'green_monster.jpg';

var red_img = new Image();
red_img.src = 'red_monster.png';

var orenge_img = new Image();
orenge_img.src = 'Ghosts_orange.png';

var sick_img = new Image();
sick_img.src = 'sick_monster.jpg';

var heart_img = new Image();
heart_img.src = 'heart.png'

var super_img = new Image();
super_img.src = 'super_monster.png';

var sick_ghost;

var super_ghost;



function loadGame() {
    setInterval(function () {
        if (document.getElementById("startInput").value != 1) {
            document.getElementById("startInput").value = 1;
            Start();
        }
    }, 200);

}


loadGame();

function Start() {
    var name = document.getElementById("username2").value;
    document.getElementById("gameName").innerHTML = name;
    song.loop=true;
    song.play();
    gameStatus = "start"
    score = 0;
    life = 3;
    initBoard();
    initWalls();
    initFood();
    initPacman();
    initGhost(); //numberofghost
    initSickGhost();
    initHeart();
    initSuperGhost();
    gameStatus = "running"
    start_time = new Date();
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    interval = setInterval(updatePosition, 200);

}

function initSuperGhost() {

    super_ghost = new ghost("super_ghost", 0, 0, super_img);
    var go = true;
    var xPos;
    var yPos;

    while (go) {
        xPos = Math.floor(Math.random() * 21) + 1;
        yPos = Math.floor(Math.random() * 19) + 1;
        if (board[xPos][yPos] == 2) {
            go = false;
            sick_ghost.row = xPos;
            sick_ghost.col = yPos;
            drawGhost(super_ghost.image, sick_ghost.row, sick_ghost.col);

        }
    }


}

function updateSuperGhost() {
    //random move

    var go = true;

    var dir = ["up", "down", "right", "left"];
    var dirWeights = [0, 0, 0, 0];

    if (super_ghost.row - pacman.row > 0) {
        dirWeights[0]++;
    }
    if (super_ghost.row - pacman.row < 0) {
        dirWeights[1]++;
    }
    if (super_ghost.col - pacman.col > 0) {
        dirWeights[3]++;
    }
    if (super_ghost.col - pacman.col < 0) {
        dirWeights[2]++;
    }

    for (var z = 0; z < 4; z++) {

        if (dirWeights[z] == 0) {


            var bounos = 0.1;
            bounos += Math.random();
            dirWeights[z] += bounos;
        }


    }

    if (!(super_ghost.row - 1 > 0)) {
        dirWeights[0] = 0;
    }
    if (!(super_ghost.row + 1 < 22)) {
        dirWeights[1] = 0;
    }
    if (!(super_ghost.col + 1 < 19)) {
        dirWeights[2] = 0;
    }
    if (!(super_ghost.col - 1 > 0)) {
        dirWeights[3] = 0;
    }

    var up = dirWeights[0];
    var down = dirWeights[1];
    var right = dirWeights[2];
    var left = dirWeights[3];

    dirWeights.sort();
    var choseen = dirWeights[3];


    if (up == choseen) {
        super_ghost.row--;
    } else if (down == choseen) {
        super_ghost.row++;
    } else if (right == choseen) {
        super_ghost.col++;
    } else if (left == choseen) {
        super_ghost.col--;
    }


}

function drawSuperGhost() {

    drawGhost(super_ghost.image, super_ghost.row, super_ghost.col);

}

function portal() {
    if (pacman.row == 10 && pacman.col == 0) {
        pacman.col = 18;
    } else if (pacman.row == 10 && pacman.col == 18) {
        pacman.col = 0;
    }
}

function initHeart() {
    var go = true;
    var xPos;
    var yPos;
    var h = 2;

    while (go || h > 0) {
        xPos = Math.floor(Math.random() * 21) + 1;
        yPos = Math.floor(Math.random() * 19) + 1;
        if (board[xPos][yPos] == 2) {
            go = false;
            board[xPos][yPos] = 6;
            context.drawImage(heart_img, yPos * cnt, xPos * cnt, cnt, cnt);
            h--;

        }
    }

}


function initBoard() {
    board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ///wall=0   greyFood=1  yellowFood=4   orangeFood=5   emptey=2   start=3
            [0, 3, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 3, 0], //
            [0, 4, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 4, 0], //y=19 x=21  //heart =6
            [0, 2, 2, 2, 2, 0, 0, 2, 2, 0, 2, 2, 0, 0, 2, 2, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2],
            [0, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0],
            [0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 0],
            [0, 4, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 4, 0],
            [0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0],
            [0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
}

function initSickGhost() {
    sick_ghost = new ghost("sick_ghost", 0, 0, sick_img);
    var go = true;
    var xPos;
    var yPos;

    while (go) {
        xPos = Math.floor(Math.random() * 21) + 1;
        yPos = Math.floor(Math.random() * 19) + 1;
        if (board[xPos][yPos] == 2) {
            go = false;
            sick_ghost.row = xPos;
            sick_ghost.col = yPos;
            drawGhost(sick_ghost.image, sick_ghost.row, sick_ghost.col);

        }
    }




}

function updateSickGhost() {
    //random move

    var go = true;
    var dir = ["up", "down", "right", "left"];
    while (go) {
        var chosenDir = Math.floor(Math.random() * 3) + 1;

        if (isClear(sick_ghost.row, sick_ghost.col, dir[chosenDir])) {
            if (chosenDir == 0) {
                sick_ghost.row--;
            } else if (chosenDir == 1) {
                sick_ghost.row++;
            } else if (chosenDir == 2) {
                sick_ghost.col++;
            } else if (chosenDir == 3) {
                sick_ghost.col--;
            }

            go = false;
            drawSick();
        }
    }



}

function drawSick() {
    drawGhost(sick_ghost.image, sick_ghost.row, sick_ghost.col);
}

function initGhost() {


    var green_ghost = new ghost("green_ghost", 0, 0, green_img);
    var red_ghost = new ghost("red_ghost", 0, 0, red_img);
    var orenge_ghost = new ghost("orenge_ghost", 0, 0, orenge_img);

    if (numberOfGhost == 1) {
        ghostArray[0] = green_ghost;;
    } else if (numberOfGhost == 2) {
        ghostArray[0] = green_ghost;
        ghostArray[1] = red_ghost;

    } else if (numberOfGhost == 3) {

        ghostArray[0] = green_ghost;
        ghostArray[1] = red_ghost;
        ghostArray[2] = orenge_ghost;

    }
    var z = 0;


    for (var x = 0; x < board.length && z < 3; x++) {
        for (var y = 0; y < board[x].length && z < 3; y++) {
            if (board[x][y] == 3 && z < 3) {
                ghostArray[z].row = x;
                ghostArray[z].col = y;
                drawGhost(ghostArray[z].image, ghostArray[z].row, ghostArray[z].col);
                z++;


            }
        }


    }
}

function initWalls() {
    for (var x = 0; x < board.length; x++) {
        for (var y = 0; y < board[x].length; y++) {
            if (board[x][y] == 0) {
                drawWall(x, y);

            }
        }

    }
}

function ghost(name, row, col, image) {
    this.name = name;
    this.row = row;
    this.col = col;
    this.image = image;
}

function drawGhost(image, x, y) {

    context.drawImage(image, y * cnt, x * cnt, cnt, cnt);

}

function drawGhosts() {
    for (var i = 0; i < numberOfGhost; i++) {
        drawGhost(ghostArray[i].image, ghostArray[i].row, ghostArray[i].col);
    }
}

function updateGhosts() {

    for (var i = 0; i < numberOfGhost; i++) {
        var dir = ["up", "down", "right", "left"];
        var dirWeights = [0, 0, 0, 0];
        if (ghostArray[i].row - pacman.row > 0) {
            dirWeights[0]++;
        }
        if (ghostArray[i].row - pacman.row < 0) {
            dirWeights[1]++;
        }
        if (ghostArray[i].col - pacman.col > 0) {
            dirWeights[3]++;
        }
        if (ghostArray[i].col - pacman.col < 0) {
            dirWeights[2]++;
        }

        for (var z = 0; z < 4; z++) {

            if (dirWeights[z] == 0) {
                var bounos = 0.2;
                bounos += Math.random();
                dirWeights[z] += bounos;
            }

        }

        if (!isClear(ghostArray[i].row, ghostArray[i].col, "up")) {
            dirWeights[0] = 0;
        }
        if (!isClear(ghostArray[i].row, ghostArray[i].col, "down")) {
            dirWeights[1] = 0;
        }
        if (!isClear(ghostArray[i].row, ghostArray[i].col, "right")) {
            dirWeights[2] = 0;
        }
        if (!isClear(ghostArray[i].row, ghostArray[i].col, "left")) {
            dirWeights[3] = 0;
        }

        var up = dirWeights[0];
        var down = dirWeights[1];
        var right = dirWeights[2];
        var left = dirWeights[3];

        dirWeights.sort();
        var choseen = dirWeights[3];


        if (up == choseen) {
            ghostArray[i].row--;
        } else if (down == choseen) {
            ghostArray[i].row++;
        } else if (right == choseen) {
            ghostArray[i].col++;
        } else if (left == choseen) {
            ghostArray[i].col--;
        }


    }

}

function drawWall(x, y) {
    context.beginPath();
    context.lineWidth = "6";
    context.strokeStyle = "#4286f4";
    context.fillStyle = "#4286f4";
    context.fillRect(y * cnt, x * cnt, cnt, cnt);

    context.stroke();
}

function initFood() {
    //  greyFood=1 yellowFood=4 orangeFood=5
    var xPos;
    var yPos;
    var greyFood = Math.floor(0.6 * numberOfFood);
    var yellowFood = Math.floor(0.3 * numberOfFood);
    var orangeFood = Math.floor(0.1 * numberOfFood);

    while (greyFood > 0) {
        xPos = Math.floor(Math.random() * 21) + 1;
        yPos = Math.floor(Math.random() * 19) + 1;
        if (board[xPos][yPos] == 2) {
            drawFood(xPos, yPos, "#f2efef");
            board[xPos][yPos] = 1;
            greyFood--;
        }
    }

    while (yellowFood > 0) {
        xPos = Math.floor(Math.random() * 21) + 1;
        yPos = Math.floor(Math.random() * 19) + 1;
        if (board[xPos][yPos] == 2) {
            drawFood(xPos, yPos, "#fbfb08");
            board[xPos][yPos] = 4;
            yellowFood--;

        }
    }

    while (orangeFood > 0) {
        xPos = Math.floor(Math.random() * 21) + 1;
        yPos = Math.floor(Math.random() * 19) + 1;
        if (board[xPos][yPos] == 2) {
            drawFood(xPos, yPos, "#ff3300");
            board[xPos][yPos] = 5;
            orangeFood--;
        }
    }


}

function drawFood(x, y, color) {
    context.beginPath();
    var centerX = (y * cnt) + cnt / 2;
    var centerY = (x * cnt) + cnt / 2;
    context.fillStyle = color + "";
    context.beginPath();
    context.arc(centerX, centerY, cnt / 8, 0, 2 * Math.PI);
    context.closePath();
    context.fill();

}

function drawFoodsAndHeart() {
    //  greyFood=1 yellowFood=4 orangeFood=5
    for (var x = 0; x < board.length; x++) {
        for (var y = 0; y < board[x].length; y++) {
            if (board[x][y] == 1) {
                drawFood(x, y, "#f2efef");

            } else if (board[x][y] == 4) {
                drawFood(x, y, "#fbfb08");
            } else if (board[x][y] == 5) {
                drawFood(x, y, "#f99d33");
            } else if (board[x][y] == 6) {
                context.drawImage(heart_img, y * cnt, x * cnt, cnt, cnt);

            }


        }
    }
}

function drawPacman(x, y) {
    pacman.row = x;
    pacman.col = y;
    pacman.centerX = (y * cnt) + cnt / 2;
    pacman.centerY = (x * cnt) + cnt / 2;
    if (gameStatus == "start") {
        pacman.mouthPos = "right";
    }
    pacman.draw();
}

function initPacman() {
    var go = true;
    var xPos;
    var yPos;

    while (go) {
        xPos = Math.floor(Math.random() * 21) + 1;
        yPos = Math.floor(Math.random() * 19) + 1;
        if (board[xPos][yPos] == 2) {
            go = false;
            drawPacman(xPos, yPos);
        }
    }
}

function GetKeyPressed() {
    if (keysDown[38]) {
        return "up";
    }
    if (keysDown[40]) {
        return "down";
    }
    if (keysDown[37]) {
        return "left";
    }
    if (keysDown[39]) {
        return "right";
    }
}

function isClear(row, col, dir) {
    if (dir == "up") {
        row--;
    } else if (dir == "down") {
        row++;
    } else if (dir == "right") {
        col++;
    } else if (dir == "left") {
        col--;
    }

    if (row < 0 || row > 21 || col < 0 || col > 18 || board[row][col] == 0) {
        return false;
    } else {
        return true;
    }
}

function foodEnded() {
    var result = true;
    for (var x = 0; x < board.length && result; x++) {
        for (var y = 0; y < board[x].length && result; y++) {
            if (board[x][y] == 1 || board[x][y] == 4 || board[x][y] == 5) {
                result = false;

            }
        }
        return result;
    }
}

function checkClash() {
    //check sickGhost
    if (pacman.row == sick_ghost.row && pacman.col == sick_ghost.col) {
        score += 50;
        initSickGhost();
    }
    //check ghosts
    for (var i = 0; i < 3; i++) {
        if (ghostArray[i].row == pacman.row && ghostArray[i].col == pacman.col) {
            if (life == 1) {
                gameStatus = "gameOver";


                life = 0;
            } else {
                life = life - 1;
                initPacman();
            }
        }
    }

    //check heart
    if (board[pacman.row][pacman.col] == 6) {
        board[pacman.row][pacman.col] = 2;
        life += 1;
    }

    //check super
    if (pacman.row == super_ghost.row && pacman.col == super_ghost.col) {
        if (life == 1) {
            gameStatus = "gameOver";


            life = 0;
        } else {
            life = life - 1;
            initPacman();
        }
    }

}


function eatFood() {
    //  greyFood=1 yellowFood=4 orangeFood=5


    if (board[pacman.row][pacman.col] == 1) {
        score += 5;
        board[pacman.row][pacman.col] = 2;
    } else if (board[pacman.row][pacman.col] == 4) {
        score += 15;
        board[pacman.row][pacman.col] = 2;
    } else if (board[pacman.row][pacman.col] == 5) {
        score += 25;
        board[pacman.row][pacman.col] = 2;
    }
}

function timeEnd() {
    if (endTime * 60 - time_elapsed <= 0) {
        gameStatus = "timeOver";
    }
}



function checkStatus() {
    var s = score.toString();
    if (gameStatus == "timeOver") {
        if (score < 150) {
            song.pause();
            document.getElementById("endGameLbl").innerHTML = "You can do better , you score: : " + s;
            clearInterval(interval);
            document.getElementById("game").style.display = "none";
            document.getElementById("endGame").style.display = "block";
        } else {

                       song.pause();
 document.getElementById("endGameLbl").innerHTML = "We have a Winner!!!  <br /> you score : " + s;
            clearInterval(interval);
            document.getElementById("game").style.display = "none";
            document.getElementById("endGame").style.display = "block";
        }
    } else if (gameStatus == "gameOver") {
                            song.pause();

        document.getElementById("endGameLbl").innerHTML = "You Lost!  <br /> you score : " + score;
        clearInterval(interval);
        document.getElementById("game").style.display = "none";
        document.getElementById("endGame").style.display = "block";
    } else if (gameStatus == "win") {

            song.pause();

        document.getElementById("endGameLbl").innerHTML = "We have a Winner!!!  <br /> you //score : " + score;
        clearInterval(interval);
        document.getElementById("game").style.display = "none";
        document.getElementById("endGame").style.display = "block";
    }

}



function updatePosition() {
    //update pos
    var x = GetKeyPressed();
    if (x == "up") {
        if (isClear(pacman.row, pacman.col, "up")) {
            pacman.row--;
        }
        pacman.mouthPos = "up";
    } else if (x == "down") {
        if (isClear(pacman.row, pacman.col, "down")) {
            pacman.row++;
        }
        pacman.mouthPos = "down";
    } else if (x == "right") {
        if (isClear(pacman.row, pacman.col, "right")) {
            pacman.col++;
        }
        pacman.mouthPos = "right";
    } else if (x == "left") {
        if (isClear(pacman.row, pacman.col, "left")) {
            pacman.col--;
        }
        pacman.mouthPos = "left";
    }

    portal();
    //eat food
    eatFood();

    //update time
    var currentTimr = new Date();
    time_elapsed = (currentTimr - start_time) / 1000;

    //time end?
    timeEnd();

    //update ghosts
    updateGhosts();
    //update sickGhost
    updateSickGhost();

    //update super ghost
    updateSuperGhost();

    //cheackGamestatus

    checkClash();

    //check status
    checkStatus()

    //drow all the new board
    draw();

}

function draw() {
    //clear the bord;
    canvas.width = canvas.width;
    //update stats
    lblScore.value = score;
    lblTime.value = time_elapsed;
    lbllife.value = life;
    initWalls();
    drawFoodsAndHeart();
    drawPacman(pacman.row, pacman.col);
    drawGhosts();
    drawSick();
    drawSuperGhost();




}



function startOver() {
    clearInterval(interval);
    Start();

}

function numberOfBallsInput(vol) {
    document.querySelector('#volume1').value = vol;
    var size = Math.floor(vol / 3);
    size = size + "px";
    document.getElementById("volume1").style.fontSize = size;

    numberOfFood = vol;
}

function timeSelectInput(vol) {
    document.querySelector('#volume2').value = vol;
    var size = 20;
    if (vol > 3) {

        size = Math.floor(vol * 8);
    }

    size = size + "px";
    document.getElementById("volume2").style.fontSize = size;
    endTime = vol;
}

function ghostSelectInput(vol) {
    document.querySelector('#volume3').value = vol;
    var size = Math.floor(vol * 10);
    size = size + "px";
    document.getElementById("volume3").style.fontSize = size;
    numberOfGhost = vol;
}

function startOverGO() {
    document.getElementById("endGame").style.display = "none";
    document.getElementById("gameProperties").style.display = "block";

}

function goToWelcomeGO() {
    document.getElementById("endGame").style.display = "none";
    document.getElementById("welcome").style.display = "block";

}
