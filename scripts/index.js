

document.addEventListener("DOMContentLoaded",()=>{
    const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

const paddleWidth = 3;
const paddleHeight = 40;
const ballSize = 2;

let xPaddle1 = 10;
let yPaddle1 = canvas.height / 2 - paddleHeight / 2;
let xPaddle2 = canvas.width - 20;
let yPaddle2 = canvas.height / 2 - paddleHeight / 2;

let xBall = canvas.width / 2;
let yBall = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 4;

let playerScore = 0;
let computerScore = 0;

const winningScore = 5;

function draw() {
    // Очищаємо поле
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Малюємо платформи
    context.fillStyle = "white";
    context.fillRect(xPaddle1, yPaddle1, paddleWidth, paddleHeight);
    context.fillRect(xPaddle2, yPaddle2, paddleWidth, paddleHeight);

    // Малюємо м'яч
    context.beginPath();
    context.arc(xBall, yBall, ballSize, 0, Math.PI * 2);
    context.fill();

    // Оновлюємо позицію м'яча
    xBall += ballSpeedX;
    yBall += ballSpeedY;

    // Відбивання м'яча від платформ
    if (xBall < xPaddle1 + paddleWidth && yBall > yPaddle1 && yBall < yPaddle1 + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (xBall > xPaddle2 && yBall > yPaddle2 && yBall < yPaddle2 + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Перевірка на виход за межі ігрового поля
    if (xBall < 0) {
        computerScore++;
        if (computerScore >= winningScore) {
            alert("Комп'ютер виграв! Гра завершена.");
            document.location.reload();
        }
        resetBall();
    }

    if (xBall > canvas.width) {
        playerScore++;
        if (playerScore >= winningScore) {
            alert("Ви виграли! Гра завершена.");
            document.location.reload();
        }
        resetBall();
    }

    if (yBall < 0 || yBall > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Рух платформи гравця
    if (yPaddle1 > 0 && (yPaddle1 + paddleHeight < canvas.height)) {
        console.log(yPaddle1)
        if (wPressed && !sPressed) {
            yPaddle1 -= 2;
        } else if (sPressed && !wPressed) {
            yPaddle1 += 2;
        }
    } else if (yPaddle1 > 0 && (yPaddle1 + paddleHeight >= canvas.height)) {
        if (wPressed && !sPressed) {
            yPaddle1 -= 2;
        }
    }else if (yPaddle1 <= 0 && (yPaddle1 + paddleHeight < canvas.height)) {
        if (!wPressed && sPressed) {
            yPaddle1 += 2;
        }
    }

    // Рух платформи комп'ютера
    if (yBall > (yPaddle2 + paddleHeight / 2)) {
        yPaddle2 += 2;
    } else {
        yPaddle2 -= 2;
    }


    // Анімація
    requestAnimationFrame(draw);
}

function resetBall() {
    xBall = canvas.width / 2;
    yBall = canvas.height / 2;
    ballSpeedX = 2;
    ballSpeedY = 4;
}

let wPressed = false;
let sPressed = false;

document.addEventListener("keydown", function (e) {
    if (e.key === "w" || e.key === "W") {
        wPressed = true;
    }
    if (e.key === "s" || e.key === "S") {
        sPressed = true;
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key === "w" || e.key === "W") {
        wPressed = false;
    }
    if (e.key === "s" || e.key === "S") {
        sPressed = false;
    }
});

draw(); // Запускаємо гру
})