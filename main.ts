const canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
// cssでサイズ指定するとぼやけるのでこちらで指定する
canvas.setAttribute("width", "480");
canvas.setAttribute("height", "320");
const ctx = canvas.getContext("2d");
const paddleHeight: number = 10;
const paddleWidth: number = 75;
// ボールの大きさ
const ballRadius: number = 8;
// ボールのスピード
let b_x: number = 3;
let b_y: number = -3;

let paddleX: number = (canvas.width - paddleWidth) / 2;
let rightPressed: boolean = false;
let leftPressed: boolean = false;
let x: number = canvas.width / 2;
let y: number = canvas.height - 30;
const brickRowCount:number = 3;
const brickColumnCount:number = 5;
const brickWidth:number = 75;
const brickHeight:number = 20;
const brickPadding:number = 10;
const brickOffsetTop:number = 30;
const brickOffsetLeft:number = 30;
let lives:number = 3;
let score:number = 0;

const bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for(let j = 0; j < brickRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 }
    }
}
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

draw();

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
    drawScore();
    drawLives();
    coollisionDetection();

    if (y + b_y < ballRadius) {
        b_y = -b_y;
    } else if (y + b_y > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            b_y = -b_y;
        } else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();    
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                b_y = 3;
                b_y = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if(x + b_x > canvas.width-ballRadius || x + b_x < ballRadius) {
        b_x = -b_x;
      }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += b_x;
    y += b_y;
    requestAnimationFrame(draw);
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
            if(bricks[i][j].status == 1) {
                const brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#a52a2a";
                ctx.fill();
                ctx.closePath();
            }
        }  
    }
}

function coollisionDetection() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            let b = bricks[i][j];
            if(b.status === 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    b_y = -b_y;
                    b.status = 0;
                    score++;
                    console.log(score);
                    console.log(brickColumnCount);
                    if(score === brickRowCount * brickColumnCount) {
                        alert("GAME CLEAR");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}