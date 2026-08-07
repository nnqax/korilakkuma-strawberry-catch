//Move the catcher with the left and right arrow keys to catch the falling objects.
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
  let cnv = createCanvas(800, 400);
  cnv.style('width', '800px');
  cnv.style('height', '400px');
  cnv.style('position', 'absolute');
  cnv.style('left', '50%');
  cnv.style('top', '50%');
  cnv.style('transform', 'translate(-50%, -50%)');
  // Resize images once in setup for performance
  catcherImage.resize(120, 0);
  strawberryImage.resize(60, 0);
  // Center catcher on the 800px canvas
  catcher = new Sprite(catcherImage, width / 2, 330, 100, 20);
  catcher.h = 60;
  catcher.color = color(95, 158, 160);
  catcher.collider = "k";
  // Create falling object across full width
  fallingObject = new Sprite(strawberryImage, random(30, width - 30), 0, 10);
  fallingObject.w = 30;
  fallingObject.color = color(0, 128, 128);
  fallingObject.vel.y = random(1, 5);
  fallingObject.rotationLock = true;
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
  image(backgroundImage, 0, 0, width, height);
  tryAgainbutton.pos = { x: -200, y: -200 };
  if (score < 5) {
    fill("white");
    stroke(5);
    textAlign(CENTER);
    textSize(15);
    text("Move korilakkuma\n with the \nleft and right \narrow keys to \ncatch the falling \nstrawberries!", width - 100, 35);
    textSize(25);
    text("Score: " + score, 80, 50);
  }
  // If fallingObject reaches bottom
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(30, width - 30);
    score = score - 1;
  }
  // Move Catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -4;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 4;
  } else {
    catcher.vel.x = 0;
  }
  // Allow catcher to move up to the new right margin (width - 50 = 750)
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > width - 50) {
    catcher.x = width - 50;
  }
  // Collision with catcher
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(30, width - 30);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    score += 1;
  }
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
function tryAgain() {
  if (tryAgainbutton.mouse.presses()) {
    score = 0;
    catcher.pos = { x: width / 2, y: 330 };
    fallingObject.pos = { x: random(30, width - 30), y: 0 };
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    tryAgainbutton.pos = { x: -500, y: -500 };
  }
}

// Defining this (even empty) stops p5play from auto-resizing
// the canvas to fill the browser window on load/resize,
// which was overriding the 800x400 size set in setup().
function windowResized() {
}
