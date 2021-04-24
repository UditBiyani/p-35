var balloon,balloonImage1,balloonImage2;
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {

  createCanvas(1500,700);
  database=firebase.database();
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var locOfC = database.ref('Balloon/Position');
  locOfC.on("value",readOp);
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,-10);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,10);
    balloon.scale = balloon.scale + 0.01;
  }

  drawSprites();

}
function changePosition(x,y){
  database.ref("Balloon/Position").set({
  x : balloon.x + x,
  y : balloon.y + y
  })
}
function readOp(data){
  position = data.val();
  balloon.x = position.x ;
  balloon.y = position.y ;
}
