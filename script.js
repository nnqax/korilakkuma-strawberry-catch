//Move the catcher with the left and right arrow keys to catch the falling objects.
/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let tryAgainbutton;
let backgroundImage;
let catcherImage;
let strawberryImage;
let startButton;
let leftButton, rightButton;
/* PRELOAD LOADS FILES */
function preload() {
  backgroundImage = loadImage("assets/background.jpg");
  strawberryImage = loadImage("assets/strawberry.png");
  catcherImage = loadImage("assets/catcher.png");
}
/* SETUP RUNS ONCE */
function setup() {
  let cnv = createCanvas(400, 400);
  cnv.style('position', 'absolute');
  cnv.style('left', '50%');
  cnv.style('top', '50%');
  cnv.style('transform', 'translate(-50%, -50%)');
  cnv.style('touch-action', 'none'); // stops the browser from scrolling/zooming while dragging on the canvas

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
  fallingObject.vel.y = random(15, 21);
  fallingObject.rotationLock = true;

  //Create start
   startButton = new Sprite(width / 2, height / 2 + 100);
  startButton.w = 150;
  startButton.h = 50;
  startButton.collider = "k";
  startButton.color = "pink";
  startButton.textColor = "white";
  startButton.text = "Start";

  //Try again/play again button
  tryAgainbutton = new Sprite(width / 2, height / 2 + 100);
  tryAgainbutton.w = 150;
  tryAgainbutton.h = 50;
  tryAgainbutton.collider = "k";
  tryAgainbutton.color = "pink";
  tryAgainbutton.textColor = "white";
   tryAgainbutton.pos = { x: -200, y: -200 };

  //On-screen touch controls — solid circles, hidden until the game starts
  leftButton = new Sprite(60, height - 60, 60);
  leftButton.shape = "circle";
  leftButton.collider = "k";
  leftButton.color = "pink";
  leftButton.textColor = "white";
  leftButton.text = "◀";
  leftButton.pos = { x: -200, y: -200 };

  rightButton = new Sprite(width - 60, height - 60, 60);
  rightButton.shape = "circle";
  rightButton.collider = "k";
  rightButton.color = "pink";
  rightButton.textColor = "white";
  rightButton.text = "▶";
  rightButton.pos = { x: -200, y: -200 };

  // Register these as an "overlap" pair instead of a "collide" pair so the
  // falling strawberry passes through the buttons instead of bumping off them,
  // while keeping their colliders (and therefore touch detection) intact.
  fallingObject.overlaps(leftButton);
  fallingObject.overlaps(rightButton);

  // startButton.pos = { x: -200, y: -200 };
  fallingObject.pos = { x: -200, y: -200 };
  catcher.pos = { x: -200, y: -200 };
}
/* DRAW LOOP REPEATS */
function draw() {
  tryAgain(); 
  background(224, 224, 224); 
  image(backgroundImage, 0, 0, width, height); 

  if (startButton.pos.x > 0){
    
    textSize(25);
    textAlign(CENTER);
    stroke(10);
    fill("white");
    text("Korilakkuma Strawberry Catch🍓", width / 2, height / 3);
    textSize(15);
    text("Help Korilakkuma collect sweet \nstrawberries! Use your Left and Right \narrow keys (or the on-screen buttons) to move.\n Click Start to play!", width / 2, height/ 2.1);
    
  }
noStroke();
  // 1. When start button is clicked, setup the round and give fallingObject speed
  
  if (startButton.mouse.presses()) {
    startButton.pos = { x: -200, y: -200 }; 
    catcher.pos = { x: width / 2, y: 330 }; 
    fallingObject.pos = { x: random(30, width - 30), y: 0 }; 
     fallingObject.vel.y = random(5, 10); // Give the object initial speed to start falling!
    leftButton.pos = { x: 60, y: height - 60 };
    rightButton.pos = { x: width - 60, y: height - 60 };
  }

  // 2. Run gamePlay() EVERY frame if the game has started (startButton is moved away)
  if (startButton.pos.x < 0) {
    gamePlay();
  }
}

function gamePlay(){
    if (score > -15 && score < 15) {
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
  // Move Catcher — keyboard OR on-screen touch buttons
  if (kb.pressing("left") || leftButton.mouse.pressing()) {
    catcher.vel.x = -4;
  } else if (kb.pressing("right") || rightButton.mouse.pressing()) {
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
  if (score >= 15) {
    catcher.pos = { x: -200, y: -200 };
    fallingObject.vel.y = 0;
    fallingObject.pos = { x: -400, y: -400 };
    leftButton.pos = { x: -200, y: -200 };
    rightButton.pos = { x: -200, y: -200 };
    textSize(25);
    stroke(0);
    text("Congrats, You won!", width / 2, height / 2);
    noStroke();
    tryAgainbutton.text = "Play Again!";
    tryAgainbutton.pos = { x: width / 2, y: height / 2 + 100 };
  }
  if (score <= -15) {
    catcher.pos = { x: -200, y: -200 };
    fallingObject.vel.y = 0;
    fallingObject.pos = { x: -400, y: -400 };
    leftButton.pos = { x: -200, y: -200 };
    rightButton.pos = { x: -200, y: -200 };
    textSize(25);
    stroke(0);
    text("Uh oh, you lost!", width / 2, height / 2);
    noStroke();
    tryAgainbutton.text = "Try Again!";
    tryAgainbutton.pos = { x: width / 2, y: height / 2 + 100 };
  }
}

//function of try again
function tryAgain() {
  if (tryAgainbutton.mouse.presses()) {
    score = 0;
    catcher.pos = { x: width / 2, y: 330 };
    fallingObject.pos = { x: random(30, width - 30), y: 0 };
        fallingObject.vel.y = random(18, 21);
    fallingObject.direction = "down";
    tryAgainbutton.pos = { x: -500, y: -500 };
    leftButton.pos = { x: 60, y: height - 60 };
    rightButton.pos = { x: width - 60, y: height - 60 };
  }
}


