const canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
// cssでサイズ指定するとぼやけるのでこちらで指定する
canvas.setAttribute("width" , "480");
canvas.setAttribute("height" , "320");
const ctx = canvas.getContext("2d");
const paddleHeight:number = 10;
const paddleWidth:number = 75;
const ballRadius:number = 10;
let paddleX:number = (canvas.width - paddleWidth) / 2;
let rightPressed:boolean = false;
let leftPressed:boolean = false; 
let x:number = canvas.width/2;
let y:number = canvas.height-30;
let b_x:number = 2;
let b_y:number = -2;

document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

setInterval(draw, 10)

function keyDownHandler(e: { key: string; }) {
    console.log(e.key);
    
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }

}

function keyUpHandler(e: { key: string; }) {
    console.log(e.key)
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (y + b_y < ballRadius || y + b_y > canvas.height - ballRadius) {
        b_y = -b_y;
    }

    if (x + b_x < ballRadius || x + b_x > canvas.width - ballRadius) {
        b_x = -b_x;
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
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

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD"
    ctx.fill();
    ctx.closePath();
}