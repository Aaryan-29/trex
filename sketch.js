var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsImage
var cloudsGroup
var obstacle1, obstacle2, obstacle3
var obstacle4, obstacle5, obstacle6
var ObstacleGroup
var PLAY=1
var END=0
var gameState=PLAY;
var restart
var gameOver
var gameOverImg
var restartImg
var score=0

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudsImage=loadImage("cloud.png")
  groundImage = loadImage("ground2.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameOverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = createGroup()
  ObstacleGroup = createGroup()
  
  gameOver=createSprite(300,80,50,50)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.5
  gameOver.visible= false;
  restart=createSprite(300,120,50,50)
  restart.addImage(restartImg)
  restart.scale=0.5
  restart.visible= false;
}

function draw() {
  background(255);
  text("score: "+score,520,50)
  
  if(gameState===PLAY){
    
     spawnClouds();
  spawnObstacle();
    
    ground.velocity.x=-4;
    score=score+ Math.round(getFrameRate()/60)
    
     if(keyDown("space")&& trex.y>161) {
    trex.velocityY = -10;
     }
    
       trex.velocityY = trex.velocityY + 0.8
    
         if (ground.x < 0){
    ground.x = ground.width/2;        
  
  }
    
    if(ObstacleGroup.isTouching(trex)){
       gameState=END
       }
     }
else if(gameState===END){
        ground.velocity.x=0;
  ObstacleGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  
  ObstacleGroup.setLifetimeEach(-1)
  cloudsGroup.setLifetimeEach(-1)
  
  trex.changeAnimation("collided",trex_collided)
  trex.veloctiyY=0
  
  gameOver.visible= true;
  restart.visible=true;
    }

  if(mousePressedOver(restart)) {
    reset();
    
    
  }
  
  
  
 // console.log(trex.y)
  
  
  
  

  
   trex.collide(invisibleGround);
 
  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
ObstacleGroup.destroyEach();
cloudsGroup.destroyEach();
 trex.changeAnimation("running",trex_running)   
 score=0;
}

function spawnClouds(){
    if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,100,40,10);
      cloud.addImage(cloudsImage)
   cloud.y = random(50,100);
      
    
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
    
  }
  

}

function spawnObstacle(){
  
  if(frameCount % 70 === 0){
     var Obstacle = createSprite(600,165,5,5)
     Obstacle.velocityX=-6
 var num = Math.round(random(1,6));
  switch(num){
      case 1 : Obstacle.addImage(obstacle1)
      break ;
       case 2 : Obstacle.addImage(obstacle2)
      break ;
       case 3: Obstacle.addImage(obstacle3)
      break ;
       case 4 : Obstacle.addImage(obstacle4)
      break ;
       case 5 : Obstacle.addImage(obstacle5)
      break ;
       case 6: Obstacle.addImage(obstacle6)
      break ;
      default: break;
  }  
   Obstacle.scale=0.5 
    ObstacleGroup.add(Obstacle)
     }
  
  
  
}


