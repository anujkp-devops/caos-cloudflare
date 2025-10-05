const canvas = document.getElementById("dino-canvas");
const ctx = canvas.getContext("2d");
const statusLine = document.getElementById("dino-status");

// Make canvas responsive
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.style.width = rect.width + 'px';
  canvas.style.height = (rect.width / 3) + 'px';
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const groundY = canvas.height - 30;
const dino = {
  x: 60,
  y: groundY - 40,
  width: 40,
  height: 40,
  vy: 0,
  jumping: false,
};

const cactus = {
  x: canvas.width + 80,
  y: groundY - 40,
  width: 30,
  height: 40,
  speed: 6,
};

let playing = false;
let score = 0;
let collidedThisRun = false;

const gravity = 0.7;
const jumpForce = 12;

const drawGround = () => {
  ctx.strokeStyle = "#111";
  ctx.beginPath();
  ctx.moveTo(0, groundY + dino.height);
  ctx.lineTo(canvas.width, groundY + dino.height);
  ctx.stroke();
};

const drawDino = () => {
  ctx.fillStyle = "#0ff";
  const bodyHeight = dino.height * 0.55;
  const headHeight = dino.height - bodyHeight;

  // body (sitting)
  ctx.fillRect(dino.x, dino.y + headHeight, dino.width, bodyHeight);
  // head/torso leaning forward
  ctx.fillRect(
    dino.x + dino.width * 0.4,
    dino.y,
    dino.width * 0.6,
    headHeight
  );
  // tail nub
  ctx.fillRect(dino.x - dino.width * 0.15, dino.y + headHeight + bodyHeight * 0.6, dino.width * 0.2, bodyHeight * 0.4);
};

const drawCactus = () => {
  ctx.fillStyle = collidedThisRun ? "#f00" : "#ff0";
  ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
};

const updatePhysics = () => {
  dino.vy += gravity;
  dino.y += dino.vy;

  if (dino.y >= groundY - dino.height) {
    dino.y = groundY - dino.height;
    dino.vy = 0;
    dino.jumping = false;
  }
};

const resetCactus = () => {
  cactus.x = canvas.width + Math.random() * 200 + 200;
  cactus.y = groundY - cactus.height;
  collidedThisRun = false;
};

const endGame = (message) => {
  playing = false;
  statusLine.textContent = `${message} Final agony score: ${score}`;
};

const checkCollision = () => {
  if (
    dino.x < cactus.x + cactus.width &&
    dino.x + dino.width > cactus.x &&
    dino.y < cactus.y + cactus.height &&
    dino.y + dino.height > cactus.y
  ) {
    if (!collidedThisRun) {
      collidedThisRun = true;
      score += 10;
      statusLine.textContent = `Glorious collision! Score: ${score}`;
      resetCactus();
    }
  }
};

const update = () => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawGround();
  drawDino();
  drawCactus();

  if (!playing) {
    requestAnimationFrame(update);
    return;
  }

  updatePhysics();
  cactus.x -= cactus.speed;

  checkCollision();

  if (cactus.x + cactus.width < 0) {
    if (!collidedThisRun) {
      endGame("You leapt like a sensible hero. Game over.");
      requestAnimationFrame(update);
      return;
    }
    resetCactus();
  }

  requestAnimationFrame(update);
};

const startGame = () => {
  if (!playing) {
    score = 0;
    collidedThisRun = false;
    resetCactus();
    playing = true;
    statusLine.textContent = "Run toward the danger. Score only grows on pain.";
  }
  if (!dino.jumping) {
    dino.vy = -jumpForce;
    dino.jumping = true;
  }
};

// Keyboard controls
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.key === " ") {
    event.preventDefault();
    startGame();
  }
});

// Touch/Click controls for mobile
canvas.addEventListener("click", (event) => {
  event.preventDefault();
  startGame();
});

canvas.addEventListener("touchstart", (event) => {
  event.preventDefault();
  startGame();
});

update();
