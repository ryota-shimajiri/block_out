const canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
// cssでサイズ指定するとぼやけるのでこちらで指定する
canvas.setAttribute("width", "480");
canvas.setAttribute("height", "320");
const ctx = canvas.getContext("2d");
const paddleHeight: number = 10;
const paddleWidth: number = 75;
const ballRadius: number = 10;
let paddleX: number = (canvas.width - paddleWidth) / 2;
let rightPressed: boolean = false;
let leftPressed: boolean = false;
let x: number = canvas.width / 2;
let y: number = canvas.height - 30;
let b_x: number = 2;
let b_y: number = -2;
const brickRowCount:number = 3;
const brickColumnCount:number = 5;
const brickWidth:number = 75;
const brickHeight:number = 20;
const brickPadding:number = 10;
const brickOffsetTop:number = 30;
const brickOffsetLeft:number = 30;

const bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for(let j = 0; j < brickRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0 }
    }
}

document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

const interval: number = setInterval(draw, 10)

function keyDownHandler(e: { key: string; }) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e: { key: string; }) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();

    if (y + b_y < ballRadius) {
        b_y = -b_y;
    } else if (y + b_y > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            b_y = -b_y;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
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
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffa500";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#00ff00"
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let i = 0; i < brickColumnCount; i++) {
        for(let j = 0; j < brickRowCount; j++) {
            const brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
            const brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[i][j].x = brickX;
            bricks[i][j].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }  
    }
} 