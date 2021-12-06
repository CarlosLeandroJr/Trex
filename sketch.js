var trex, trex_running, trex_collided;
var ground, invisible_ground, ground_image;
var cloud, cloud_image;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;
var obstaclesGroup, clouds;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
obstacle = loadImage ("obstacle1.png");
obstacle1 = loadImage ("obstacle2.png");
obstacle2 = loadImage ("obstacle3.png");
obstacle3 = loadImage ("obstacle4.png");
obstacle4 = loadImage ("obstacle5.png");
obstacle5 = loadImage ("obstacle6.png");
trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");
trex_collided = loadImage ("trex_collided.png");
ground_image = loadImage ("ground2.png");
cloud_image =loadImage ("cloud.png");

}

function setup() {
createCanvas(400,200);
ground = createSprite (200,180,400,20);
invisible_ground = createSprite (200,190,400,10);
invisible_ground.visible = false;
ground.addAnimation("moving",ground_image);
trex.addAnimation("running",trex_running);
trex = createSprite(50,180,20,50);
trex.scale = 0.5;
trex.x = 50;
clouds = createGroup()
obstaclesGroup = createGroup()

}

function draw() {
  background("white");
  trex.collide(invisible_ground);
 
  if (gameState == PLAY) {

   ground.velocityX = -10;
   create_Cloud();
   create_Obstacles();

  if (keyDown("space") && trex.y >= 145) { 
   trex.velocityY = -10;
  }
  if (ground.x <0) {
   ground.x = ground.width/2;        
  }

  trex.velocityY = trex.velocityY + 0.8;
}

 if (obstaclesGroup.isTouching(trex)) {
  gameState = END;
 }

 if (gameState == END) {
  ground.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
  clouds.setVelocityXEach(0);
 }
 
drawSprites();

}

function create_Cloud() {
  if (frameCount % 60 === 0) {
  
  cloud = createSprite (600, 100, 40, 10);
  cloud.velocityX = -2.5;
  cloud.addImage (cloud_image);
  cloud.scale = 0.5;
  cloud.y = Math.round(random(10,100));
  trex.depth = cloud.depth;
  trex.depth = trex.depth + 1;
  cloud.lifetime = 250;
  clouds.add(cloud);
  }
}

function create_Obstacles() {
  if (frameCount % 60 === 0) {

    var obstacles = createSprite (400, 165, 10, 40);
    obstacles.velocityX = -10;

    var cactus = Math.round(random(1,6)); 
    switch(cactus) { 
    case 1: obstacles.addImage(obstacle); 
            break; 
    case 2: obstacles.addImage(obstacle1); 
            break; 
    case 3: obstacles.addImage(obstacle2);
            break; 
    case 4: obstacles.addImage(obstacle3); 
            break; 
    case 5: obstacles.addImage(obstacle4);
            break; 
    case 6: obstacles.addImage(obstacle5); 
            break; 
    default: break;
    } 

    obstacles.scale = 0.5;
    obstacles.lifetime = 250;
    obstaclesGroup.add(obstacles);
  }
}