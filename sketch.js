var trex, trex_running, trex_collided,gameState, PLAY, END;
var ground, invisibleGround,  groundImage;
var cloudimage, cloudsgroup;
var obstacleimage, obstaclegroup,  obstacle1, obstacle2, obstacle3,obstacle4, obstacle5, obstacle6 ;
var score;
var gameoverimage, restartimage;
var gameover, restart,jumpSound,dieSound,checkpointSound;

localStorage["HighestScore"]=0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudimage= loadImage("cloud.png");
   obstacle1= loadImage("obstacle1.png");
   obstacle2= loadImage("obstacle2.png");
   obstacle3= loadImage("obstacle3.png");
   obstacle4= loadImage("obstacle4.png");
   obstacle5= loadImage("obstacle5.png");
   obstacle6= loadImage("obstacle6.png");
  restartimage=loadImage("restart.png");
  gameoverimage=loadImage("gameOver.png");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  
  restart = createSprite(300,120);
  restart.addImage(restartimage);
  restart.scale=0.5;
  restart.visible=false;
  
   gameover = createSprite(300,80);
  gameover.addImage(gameoverimage);
  gameover.scale=0.5;
  gameover.visible=false;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
   ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10); 
  invisibleGround.visible = false;
  cloudsgroup = new Group();
  obstaclegroup = new Group();
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  score=0;
}

function draw() {
  background("brown ");
  console.log(trex.y);
  text("score:"+score,380,60 );
  if(score>0 && score%100===0)
  {
   checkpointSound.play(); 
    
  }
  
  if(gameState===PLAY){
    
    ground.velocityX = -(6 + 3*score/100);
 score=score+Math.round(getFrameRate()/60);
    if(keyDown("space")&&trex.y>=161) {
    trex.velocityY = -10;
      jumpSound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.5
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
    if(trex.isTouching(obstaclegroup)){
      gameState=END;
      dieSound.play();
    }
     
  }
  
  else if(gameState===END){
    ground.velocityX = 0;
    trex.velocityY = 0;
      trex.changeAnimation("collided",trex_collided);
    obstaclegroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    
    gameover.visible=true;
    restart.visible=true;
    
    if(mousePressedOver(restart)){
     reset();
    }
    
  
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    
    
    
    
  }
  
  
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120)) ;
    cloud.addImage(cloudimage );
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsgroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6+score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand)
    {
        case 1:obstacle.addImage(obstacle1);
        break;
        case 2:obstacle.addImage(obstacle2);
        break;
        case 3:obstacle.addImage(obstacle3);
        break;
        case 4:obstacle.addImage(obstacle4);
        break;
        case 5:obstacle.addImage(obstacle5);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;
    }
      
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclegroup.add(obstacle);
  }
} 


function reset(){
gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclegroup.destroyEach();
  cloudsgroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
  if( localStorage["HighestScore"]<score)
      {
      
      locaStorage["HighestScore"]=score;
      }
  
  
}