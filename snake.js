const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const snakeSpeed = 100;

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = 0;
let dy = 0;

const snakeHeadImg = new Image();
snakeHeadImg.src = "snek_head.png";

const snakeBodyImg = new Image();
snakeBodyImg.src = "snek_body.png";

const apple = new Image();
apple.src = "apple.jpeg";

function main() {
  setTimeout(() => {
    moveSnake();
    checkCollision();
    clearCanvas();
    drawSnake();
    drawFood();
    main();
  }, snakeSpeed);
}

function moveSnake() {
  const newHead = {
    x: snake[0].x + dx * gridSize,
    y: snake[0].y + dy * gridSize,
  };

  snake.unshift(newHead);
  if (newHead.x === food.x && newHead.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height
  ) {
    snake = [{ x: 200, y: 200 }];
    dx = dy = 0;
    console.log("Game Over... Try Again!");
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      snake = [{ x: 200, y: 200 }];
      dx = dy = 0;
    }
  }
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    const segment = snake[i];
    ctx.save();
    ctx.translate(segment.x + gridSize / 2, segment.y + gridSize / 2);
    if (i === 0) {
      ctx.rotate(getSnakeHeadRotation());
      ctx.drawImage(
        snakeHeadImg,
        -gridSize / 2,
        -gridSize / 2,
        gridSize,
        gridSize
      );
    } else {
      ctx.drawImage(
        snakeBodyImg,
        -gridSize / 2,
        -gridSize / 2,
        gridSize,
        gridSize
      );
    }
    ctx.restore();
  }
}

//rotates snake head according to input direction
function getSnakeHeadRotation() {
  if (dx === 1 && dy === 0) return (3 * Math.PI) / 2; // Right
  if (dx === -1 && dy === 0) return Math.PI / 2; // Left
  if (dx === 0 && dy === 1) return 0; // Down
  if (dx === 0 && dy === -1) return Math.PI; // Up
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
  ctx.drawImage(apple, food.x, food.y, gridSize, gridSize);
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
  };
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && dy === 0) {
    dy = -1;
    dx = 0;
  } else if (event.key === "ArrowDown" && dy === 0) {
    dy = 1;
    dx = 0;
  } else if (event.key === "ArrowLeft" && dx === 0) {
    dx = -1;
    dy = 0;
  } else if (event.key === "ArrowRight" && dx === 0) {
    dx = 1;
    dy = 0;
  }
});

generateFood();
main();
