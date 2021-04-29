var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var CloudImage;
var Cloud;
var obstacle;
var obstacleGroup;
var CloudGroup;
var Play = 1;
var End = 0;
var State = Play;
var GameOverImage;
var RestartImage;
var GameOver,Restart;
var DieSound,JumpSound,CheckpointSound;

var score = 0;



function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  CloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  
  groundImage = loadImage("ground2.png");
  
  GameOverImage = loadImage("gameOver.png")
  RestartImage = loadImage("restart.png")
  
  DieSound = loadSound("die.mp3")
  JumpSound = loadSound("jump.mp3")
  CheckpointSound = loadSound("checkPoint.mp3")
  
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Collided", trex_collided);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //create game over and restart
  GameOver = createSprite(300,100,100,100);
  Restart = createSprite(300,140,50,50);
  GameOver.addImage(GameOverImage);
  Restart.addImage(RestartImage);
  Restart.scale = 0.5;
  GameOver.scale = 2;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  CloudGroup = new Group();
  obstacleGroup = new Group();
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  
  trex.debug=false
  trex.setCollider("circle",0,0,50)
  
  


}

function draw() {
  //set background color
  background(180);
   text("score:" + score ,500,50)
 
  console.log(trex.y)
  
  if(State == Play){
      // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 120) {
    trex.velocityY = -10;
    JumpSound.play();
  }
    
    ground.velocityX = -(8+score/1000);
  
  trex.velocityY = trex.velocityY + 0.8 
    
    if (ground.x < 0){
    ground.x = ground.width/2;
      
  }
GameOver.visible= false
Restart.visible = false
  score= score+Math.round(frameCount/60)
    
    //Spawn Clouds
  spawnClouds();
  spawnObstacles();
    if(obstacleGroup.isTouching(trex)){
      State = End
      DieSound.play();
       
    }
          if(score>0&&score%1000===0){
        CheckpointSound.play();
      }
      
  }
  else if(State == End){
  ground.velocityX = 0;
  obstacleGroup.setVelocityXEach(0);
  CloudGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  CloudGroup.setLifetimeEach(-1);
  GameOver.visible= true
  Restart.visible = true
  trex.changeAnimation("Collided",trex_collided)
  if(mousePressedOver(Restart)){
    reset();
  }
    
  }


  //stop trex from falling down
    trex.collide(invisibleGround);

  drawSprites();
  

}

//function to spawn the clouds
function spawnClouds(){

 // write your code here 
if(frameCount %60==0){
  Cloud= createSprite(600,80,50,25)
  Cloud.addImage("cloud", CloudImage)
  Cloud.scale = 0.4
  Cloud.y = Math.round(random (0,50))
  Cloud.velocityX = (-5)
  Cloud.depth=trex.depth
  Cloud.lifetime = 120
  trex.depth = trex.depth+1
  CloudGroup.add(Cloud);
}

}

function spawnObstacles(){
  if(frameCount %90==0){
  obstacle = createSprite(600,170,50,50)
  obstacle.velocityX = -(4+score/1000)
  obstacle.scale = 0.4
  var Random1 = Math.round(random(1,6));
  console.log(Random1);
    switch(Random1){
        case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6);
        break;
        default: break;
        
    }
    obstacleGroup.add(obstacle);
  }
  
    
} 

function reset(){
  State=Play
  GameOver.visible= false;
  Restart.visible = false;
  obstacleGroup.destroyEach();
  CloudGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score = 0;
  
}




