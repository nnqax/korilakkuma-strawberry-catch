/* VARIABLES */
let catcher;
let strawberries = [];
let numStrawberries = 6; // more strawberries falling at once
let score = 0;
let tryAgainbutton;
let startButton;
let backgroundImage;
let catcherImage;
let strawberryImage;

// "start" -> "playing" -> "won" / "lost"
let gameState = "start";

/* PRELOAD LOADS FILES */
function preload() {
  backgroundImage = loadImage("assets/background.jpg");
  strawberryImage = loadImage("assets/strawberry.png");
  catcherImage = loadImage("assets/catcher.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Resize images once instead of every frame
  catcherImage.resize(120, 0);
  strawberryImage.resize(60, 0);

  // Create catcher
  catcher = new Sprite(catcherImage, width / 2, height - 70, 100, 20);
  catcher.h = 60;
  catcher.color = color(95, 158, 160);
  catcher.collider = "k";

  // Create multiple falling strawberries
  for (let i = 0; i < numStrawberries; i++) {
    let s = new Sprite(strawberryImage, random(width), random(-400, 0), 10);
    s.w = 30;
    s.color = color(0, 128, 128);
    s.vel.y = random(1, 5);
    s.rotationLock = true;
    strawberries.push(s);
  }

  // Try again / play again button
  tryAgainbutton = new Sprite(width / 2, height / 2 + 100);
  tryAgainbutton.w = 150;
  tryAgainbutton.h = 50;
  tryAgainbutton.collider = "k";
  tryAgainbutton.color = "pink";
  tryAgainbutton.textColor = "white";
  tryAgainbutton.pos = { x: -500, y: -500 };

  // Start button on the opening screen
  startButton = new Sprite(width / 2, height / 2 + 100);
  startButton.w = 150;
  startButton.h = 50;
  startButton.collider = "k";
  startButton.color = "pink";
  startButton.textColor = "white";
  startButton.text = "Start!";

  // Hide gameplay sprites until the game actually starts
  catcher.pos = { x: -500, y: -500 };
  for (let s of strawberries) {
    s.pos = { x: -500, y: -500 };
  }
}

/* DRAW LOOP REPEATS */
function draw() {
  background(224, 224, 224);

  // Full-screen background image
  image(backgroundImage, 0, 0, width, height);

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else {
    // won / lost screen
    tryAgain();
  }
}

function drawStartScreen() {
  startButton.pos = { x: width / 2, y: height / 2 + 100 };

  fill("white");
  stroke(0);
  strokeWeight(3);
  textAlign(CENTER);
  textSize(40);
  text("Strawberry Catcher!", width / 2, height / 2 - 80);

  textSize(18);
  text(
    "Move korilakkuma with the\nleft and right arrow keys\nto catch the falling strawberries!",
    width / 2,
    height / 2 - 20
  );
  noStroke();

  if (startButton.mouse.presses()) {
    beginGame();
  }
}

function beginGame() {
  gameState = "playing";
  score = 0;

  startButton.pos = { x: -500, y: -500 };

  catcher.pos = { x: width / 2, y: height - 70 };

  for (let s of strawberries) {
    s.pos = { x: random(width), y: random(-400, 0) };
    s.vel.y = random(1, 5);
  }
}

function playGame() {
  // Instructions on the LEFT
  if (score < 5) {
    fill("white");
    stroke(5);
    textAlign(LEFT);
    textSize(15);
    text(
      "Move korilakkuma\nwith the\nleft and right\narrow keys to\ncatch the falling\nstrawberries!",
      20,
      35
    );
  }

  // Score on the RIGHT
  fill("white");
  stroke(5);
  textAlign(RIGHT);
  textSize(25);
  text(score, width - 30, 50);
  noStroke();

  // Move catcher freely across the whole window width
  if (kb.pressing("left")) {
    catcher.vel.x = -5;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 5;
  } else {
    catcher.vel.x = 0;
  }

  // Keep catcher within the full window instead of a narrow strip
  if (catcher.x < catcher.w / 2) {
    catcher.x = catcher.w / 2;
  } else if (catcher.x > width - catcher.w / 2) {
    catcher.x = width - catcher.w / 2;
  }
  catcher.y = height - 70;

  // Handle each strawberry
  for (let s of strawberries) {
    // If it reaches the bottom, reset it and lose a point
    if (s.y >= height) {
      resetStrawberry(s);
      score -= 1;
    }

    // If it collides with the catcher, reset it and gain a point
    if (s.collides(catcher)) {
      resetStrawberry(s);
      score += 1;
    }
  }

  if (score >= 5) {
    endGame("won");
  } else if (score <= -5) {
    endGame("lost");
  }
}

function resetStrawberry(s) {
  s.y = 0;
  s.x = random(width);
  s.vel.y = random(1, 5);
  s.direction = "down";
}

function endGame(result) {
  gameState = result;

  catcher.pos = { x: -500, y: -500 };
  for (let s of strawberries) {
    s.vel.y = 0;
    s.pos = { x: -500, y: -500 };
  }

  tryAgainbutton.text = result === "won" ? "Play Again!" : "Try Again!";
  tryAgainbutton.pos = { x: width / 2, y: height / 2 + 100 };
}

function tryAgain() {
  textAlign(CENTER);
  fill("white");
  stroke(0);
  strokeWeight(3);
  textSize(25);
  text(
    gameState === "won" ? "Congrats, You won!" : "Uh oh, you lost!",
    width / 2,
    height / 2
  );
  noStroke();

  tryAgainbutton.pos = { x: width / 2, y: height / 2 + 100 };

  if (tryAgainbutton.mouse.presses()) {
    beginGame();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
