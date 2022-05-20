var canvas = document.getElementById("gameCanvas");
// cssでサイズ指定するとぼやけるのでこちらで指定する
canvas.setAttribute("width", "480");
canvas.setAttribute("height", "320");
var ctx = canvas.getContext("2d");
var paddleHeight = 10;
var paddleWidth = 75;
var ballRadius = 10;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var x = canvas.width / 2;
var y = canvas.height - 30;
var b_x = 2;
var b_y = -2;
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
var interval = setInterval(draw, 10);
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    if (y + b_y < ballRadius) {
        b_y = -b_y;
    }
    else if (y + b_y > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            b_y = -b_y;
        }
        else {
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
    }
    else if (leftPressed && paddleX > 0) {
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
    ctx.fillStyle = "#00ff00";
    ctx.fill();
    ctx.closePath();
}
