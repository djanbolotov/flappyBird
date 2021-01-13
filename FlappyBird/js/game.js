let canvas = document.getElementById("canvas");
let contex = canvas.getContext("2d");

let bird = new Image();
let Top = new Image();
let Bottom = new Image();
let Earth = new Image();
let Bg = new Image();

bird.src = "img/flappy_bird_bird.png";
Top.src = "img/flappy_bird_pipeUp.png";
Bottom.src = "img/flappy_bird_pipeBottom.png";
Earth.src = "img/flappy_bird_fg.png";
Bg.src = "img/flappy_bird_bg.png";

let gap = 90;

let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0 
}

document.addEventListener("keydown", moveUp);

function moveUp(){
    yPos -= 20;
}

gravity = 1;

let xPos = 10;
let yPos = 100;

function create(){
    contex.drawImage(Bg, 0, 0);

    for(let i = 0; i< pipe.length; i++){
        contex.drawImage(Top, pipe[i].x, pipe[i].y);
        contex.drawImage(Bottom, pipe[i].x, pipe[i].y + Top.height + gap);
        pipe[i].x -= 1;

        if(pipe[i].x == 130){
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * Top.height) - Top.height
            });
        }

        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + Top.width && (yPos <= pipe[i].y + Top.height || yPos >= pipe[i].y + Top.height + gap) || yPos + bird.height >= 415){
            location.reload();
        }
    }

    contex.drawImage(Earth, 0, canvas.height - Earth.height);
    contex.drawImage(bird, xPos, yPos);
    yPos += gravity;
    requestAnimationFrame(create);
 
}

Bottom.onload = create;
