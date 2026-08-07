/* VARIABLES */
let catcher, fallingObjects = [];
let numStrawberries = 6;
let score = 0;
let tryAgainbutton;
let startButton;
let backgroundImage;
let catcherImage;
let strawberryImage;
let gameStarted = false;



/* PRELOAD LOADS FILES */
function preload(){
   backgroundImage = loadImage("assets/background.jpg");
 strawberryImage =loadImage("assets/strawberry.png");
  catcherImage = loadImage("assets/catcher.png");
}

/* SETUP RUNS ONCE */
function setup() {
  // createCanvas(400,400);
  
  createCanvas(windowWidth, windowHeight);
  //Create catcher 
  catcher = new Sprite(catcherImage,200,330,100,20);
  catcher.h = 60;
  catcher.color = color(95,158,160);
  catcher.collider = "k";
  
  //Create falling objects (strawberries)
  for (let i = 0; i < numStrawberries; i++){
    let fallingObject = new Sprite(strawberryImage , random(width),random(-400,0),10);
    fallingObject.w = 30;
    fallingObject.color = color(0,128,128);
    fallingObject.vel.y = random(1, 5);
    fallingObject.rotationLock= true;
    fallingObjects.push(fallingObject);
  }

  
  tryAgainbutton = new Sprite(width / 2,
    height / 2 + 100);
    tryAgainbutton.w = 150;
    tryAgainbutton.h = 50;
    tryAgainbutton.collider= "k";
    tryAgainbutton.color = "pink";
    
  tryAgainbutton.textColor = "white";
  tryAgainbutton.pos = {x: -200, y: -200};
  
  //Create start button for opening screen
  startButton = new Sprite(width / 2, height / 2 + 100);
  startButton.w = 150;
  startButton.h = 50;
  startButton.collider = "k";
  startButton.color = "pink";
  startButton.textColor = "white";
  startButton.text = "Start!";

  //Hide catcher and strawberries until game starts
  catcher.pos = {x: -200, y: -200};
  for (let i = 0; i < fallingObjects.length; i++){
    fallingObjects[i].pos = {x: -200, y: -200};
  }

}



/* DRAW LOOP REPEATS */
function draw() {

  background(224,224,224);
  image(backgroundImage, 0,0, width, height);

  //If the game hasn't started yet, show the opening screen
  if (!gameStarted){
    openingScreen();
    return;
  }

  // allSprites.debug = mouse.pressing();
  tryAgain();

  //resize images
  catcherImage.resize(120,0);
  strawberryImage.resize(60,0);

  
  // Draw directions to screen
  tryAgainbutton.pos = {x: -200, y: -200};
 
if (score < 5) {
 fill("white");
  stroke(5);
  textAlign(LEFT);
  textSize(15);
  text("Move korilakkuma\n with the \nleft and right \narrow keys to \ncatch the falling \nstrawberries!.", 20, 35);

// fill("teal");
  textSize(25);
  textAlign(RIGHT);
  text( score, width-20, 50);
  
}
   //If a fallingObject reaches the bottom, move it back to a random position at top

  for (let i = 0; i < fallingObjects.length; i++){
    if (fallingObjects[i].y >= height){
      fallingObjects[i].y = 0;
      fallingObjects[i].x = random ( width);
      score= score - 1;
    } 
  }

  
  
  // Move Catcher freely around the window
  if (kb.pressing("left")){
    catcher.vel.x = -3;
  } else if (kb.pressing("right")){
    catcher.vel.x = 3;
  }else{
    catcher.vel.x = 0;
  }


  if (catcher.x < catcher.w/2){
    catcher.x = catcher.w/2;
  } else if (catcher.x > width - catcher.w/2){
    catcher.x = width - catcher.w/2;
  }

  //If a fallingObject collides with catcher, move it back to a random position at top
  for (let i = 0; i < fallingObjects.length; i++){
    if (fallingObjects[i].collides(catcher)){
      fallingObjects[i].y = 0;
      fallingObjects[i].x = random ( width);
      fallingObjects[i].vel.y = random(1, 5);
      fallingObjects[i].direction ="down";
      score+=1;
    }
  }


  if (score>=5){

    catcher.pos = {x: -200, y: -200};
    for (let i = 0; i < fallingObjects.length; i++){
      fallingObjects[i].vel.y = 0;
      fallingObjects[i].pos = {x: -400, y: -400};
    }
    textAlign(CENTER);
    textSize(25);
    stroke(0);
    text("Congrats, You won!", width / 2 ,
    height / 2 );
    
    noStroke();
    tryAgainbutton.text = "Play Again!";
    tryAgainbutton.pos = {x:width / 2,
    y:height / 2 + 100};
    
    } if (score<= -5){

    catcher.pos = {x: -200, y: -200};
    for (let i = 0; i < fallingObjects.length; i++){
      fallingObjects[i].vel.y = 0;
      fallingObjects[i].pos = {x: -400, y: -400};
    }
    textAlign(CENTER);
    textSize(25);
    stroke(0);
    text("Uh oh, you lost!", width / 2 ,
    height / 2 );
    noStroke();
    tryAgainbutton.text = "Try Again!";
    tryAgainbutton.pos = {x:width / 2,
    y:height / 2 + 100};
    
    }
  



}

//Opening screen shown before the game starts
function openingScreen(){
  startButton.pos = {x: width / 2, y: height / 2 + 100};

  fill("white");
  stroke(0);
  textAlign(CENTER);
  textSize(40);
  text("Strawberry Catcher!", width / 2, height / 2 - 80);

  textSize(15);
  text("Move korilakkuma with the\nleft and right arrow keys\nto catch the falling strawberries!", width / 2, height / 2 - 20);
  noStroke();

  if (startButton.mouse.presses()){
    gameStarted = true;
    score = 0;
    startButton.pos = {x: -200, y: -200};
    catcher.pos = {x: width/2 , y: 330 };
    for (let i = 0; i < fallingObjects.length; i++){
      fallingObjects[i].pos = { x: random(width), y: random(-400,0) };
      fallingObjects[i].vel.y = random(1, 5);
      fallingObjects[i].direction = "down";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function tryAgain() {
   if (tryAgainbutton.mouse.presses()){
      score= 0;
     catcher.pos ={x:width/2 , y:330 };
    for (let i = 0; i < fallingObjects.length; i++){
      fallingObjects[i].pos = { x: random(width), y: random(-400,0) };
      fallingObjects[i].vel.y = random(1, 5);
      fallingObjects[i].direction = "down";
    }
    
    tryAgainbutton.pos = { x: -500, y: -500 };
   }
}
