// Move the catcher with the left and right arrow keys to catch the falling objects.

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let tryAgainbutton;
let backgroundImage;
let catcherImage;
let strawberryImage;

/* PRELOAD LOADS FILES */
function preload() {
  backgroundImage = loadImage("assets/background.jpg");
  strawberryImage = loadImage("assets/strawberry.png");
  catcherImage = loadImage("assets/catcher.png");
}

/* SETUP RUNS ONCE */
function setup() {
  // Set canvas size to fit full browser window
  createCanvas(windowWidth, windowHeight);

  // Resize images once here instead of every frame in draw()
  catcherImage.resize(120, 0);
  strawberryImage.resize(60, 0);

  // Create catcher dynamically centered near bottom of screen
  catcher = new Sprite(catcherImage, width / 2, height - 70, 100, 20);
  catcher.h = 60;
  catcher.color = color(95, 158, 160);
  catcher.collider = "k";

  // Create falling object at a random X coordinate across screen width
  fallingObject = new Sprite(strawberryImage, random(30, width - 30), 0, 10);
  fallingObject.w = 30;
  fallingObject.color = color(0, 128, 128);
  fallingObject.vel.y = random(1, 5);
  fallingObject.rotationLock = true;

  // Create reset button centered relative to current screen height/width
  tryAgainbutton = new Sprite(width / 2, height / 2 + 100);
  tryAgainbutton.w = 150;
  tryAgainbutton.h = 50;
  tryAgainbutton.collider = "k";
  tryAgainbutton.color = "pink";
  tryAgainbutton.textColor = "white";
}

/* DRAW LOOP REPEATS */
function draw() {
  tryAgain();

  background(224, 224, 224);

  // Scale background image to cover full canvas width & height
  image(backgroundImage, 0, 0, width, height);

  // Hide button during active gameplay
  tryAgainbutton.pos = { x: -200, y: -200 };

  if (score < 5 && score > -5) {
    fill("white");
    stroke(5);
    textAlign(CENTER);
    textSize(15);
    
    // Position text relative to top-right corner of screen
    text(
      "Move korilakkuma\n with the \nleft and right \narrow keys to \ncatch the falling \nstrawberries!",
      width - 90,
      35
    );

    textSize(25);
    // Position score display relative to top-left corner
    text(score, 50, 50);
  }

  // If fallingObject reaches bottom, reset to top with a random X position
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(30, width - 30);
    score -= 1;
  }

  // Move Catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -5;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 5;
  } else {
    catcher.vel.x = 0;
  }

  // Constrain catcher boundaries dynamically based on current screen width
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > width - 50) {
    catcher.x = width - 50;
  }

  // Collision check with catcher
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(30, width - 30);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    score += 1;
  }

  // Win condition
  if (score >= 5) {
    catcher.pos = { x: -200, y: -200 };
    fallingObject.vel.y = 0;
    fallingObject.pos = { x: -400, y: -400 };

    textSize(25);
    stroke(0);
    text("Congrats, You won!", width / 2, height / 2);

    noStroke();
    tryAgainbutton.text = "Play Again!";
    tryAgainbutton.pos = { x: width / 2, y: height / 2 + 100 };
  }

  // Loss condition
  if (score <= -5) {
    catcher.pos = { x: -200, y: -200 };
    fallingObject.vel.y = 0;
    fallingObject.pos = { x: -400, y: -400 };

    textSize(25);
    stroke(0);
    text("Uh oh, you lost!", width / 2, height / 2);

    noStroke();
    tryAgainbutton.text = "Try Again!";
    tryAgainbutton.pos = { x: width / 2, y: height / 2 + 100 };
  }
}

/* WINDOW RESIZING SUPPORT */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recenter catcher near bottom if screen size changes during game
  if (catcher && score < 5 && score > -5) {
    catcher.y = height - 70;
  }
}

/* RESTART GAME FUNCTION */
function tryAgain() {
  if (tryAgainbutton.mouse.presses()) {
    score = 0;
    catcher.pos = { x: width / 2, y: height - 70 };
    fallingObject.pos = { x: random(30, width - 30), y: 0 };
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";

    tryAgainbutton.pos = { x: -500, y: -500 };
  }
}
