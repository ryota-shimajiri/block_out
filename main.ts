const canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ballRadius:number = 10;

let x:number = canvas.width/2;
let y:number = canvas.height-30;
let b_x:number = 2;
let b_y:number = -2;

setInterval(draw, 10);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (y + b_y < ballRadius || y + b_y > canvas.height - ballRadius) {
        b_y = -b_y;
    }

    if (x + b_x < ballRadius || x + b_x > canvas.width - ballRadius) {
        b_x = -b_x; 
    }

    x += b_x;
    y += b_y;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();    
}