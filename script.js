//Move the catcher with the left and right arrow keys to catch the falling objects. 




/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let tryAgainbutton;
let backgroundImage;
let catcherImage;
let strawberryImage;



/* PRELOAD LOADS FILES */
function preload(){
   backgroundImage = loadImage("assets/background.jpg");
 strawberryImage =loadImage("assets/strawberry.png");
  catcherImage = loadImage("assets/catcher.png");
}

/* SETUP RUNS ONCE */
function setup() {
  let cnv = createCanvas(400,400);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  
  
  //Create catcher 
  catcher = new Sprite(catcherImage,200,330,100,20);
  catcher.h = 60;
  catcher.color = color(95,158,160);
  catcher.collider = "k";
  
  //Create falling object
  fallingObject = new Sprite(strawberryImage , 100,0,10);
  fallingObject.w = 30;
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = random(1, 5);
  fallingObject.rotationLock= true;

  
  tryAgainbutton = new Sprite(width / 2,
    height / 2 + 100);
    tryAgainbutton.w = 150;
    tryAgainbutton.h = 50;
    tryAgainbutton.collider= "k";
    tryAgainbutton.color = "pink";
    
  tryAgainbutton.textColor = "white";
    

}



/* DRAW LOOP REPEATS */
function draw() {

  // allSprites.debug = mouse.pressing();
  tryAgain();
  
  background(224,224,224);
  image(backgroundImage, 0,0);

  //resize images
  catcherImage.resize(120,0);
  strawberryImage.resize(60,0);

  
  // Draw directions to screen
  tryAgainbutton.pos = {x: -200, y: -200};
 
if (score < 5) {
 fill("white");
  stroke(5);
  textAlign(CENTER);
  textSize(15);
  text("Move korilakkuma\n with the \nleft and right \narrow keys to \ncatch the falling \nstrawberries!.", width-80, 35);

// fill("teal");
  textSize(25);
  text( score, width-360, 50);
  
}
   //If fallingObject reaches bottom, move back to random position at top

  if (fallingObject.y >= height){
    fallingObject.y = 0;
    fallingObject.x = random ( width);
    score= score - 1;
  } 

  
  
  // Move Catcher
  if (kb.pressing("left")){
    catcher.vel.x = -3;
  } else if (kb.pressing("right")){
    catcher.vel.x = 3;
  }else{
    catcher.vel.x = 0;
  }


  if (catcher.x < 50){
    catcher.x = 50;
  } else if (catcher.x > 350){
    catcher.x = 350;
  }

  //If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)){
    fallingObject.y = 0;
    fallingObject.x = random ( width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction ="down";
    score+=1;
  }


  if (score>=5){

    catcher.pos = {x: -200, y: -200};
    fallingObject.vel.y = 0;
    fallingObject.pos = {x: -400, y: -400};
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
    fallingObject.vel.y = 0;
    fallingObject.pos = {x: -400, y: -400};
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
function tryAgain() {
   if (tryAgainbutton.mouse.presses()){
      score= 0;
     catcher.pos ={x:200 , y:330 };
    fallingObject.pos = { x: random(width), y: 0 };
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    
    tryAgainbutton.pos = { x: -500, y: -500 };
   }
}
