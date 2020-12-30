var towerImage, tower;
var doorImage, door, doorGroup;
var climber, climberImage, climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup
var gameState="play" 
var spookySound;


function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,50,50)
  ghost.addImage(ghostImage);
  ghost.scale=0.3
  
  spookySound.loop();
  
  
 
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}


function draw() {
  background(0);

  if(gameState==="play"){
    
  

    if (tower.y > 400) {
      tower.y = 300;
    }

    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }

     if(keyDown("right_arrow")){
      ghost.x=ghost.x +3;
    }

     if(keyDown("space")){
      ghost.velocityY=-5
    }

    ghost.velocityY=ghost.velocityY+0.8;

    if(climberGroup.isTouching(ghost)){
      ghost.velocityY=0
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
       ghost.destroy();
      gameState="end"
       }



    spawnDoors();
  
    drawSprites();
    
    
  }
  if(gameState==="end"){
    textSize(40)
    fill("yellow")
    text("Game Over ",230,250)
    
  }
}


function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    door.addImage(doorImage);

    climber = createSprite(200, 10)
    climber.addImage(climberImage)
    
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2

    door.x = Math.round(random(120, 400))
    climber.x = door.x
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1
    invisibleBlockGroup.add(invisibleBlock);

    door.velocityY = 1
    climber.velocityY = 1
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1


    climber.lifetime = 800
    door.lifetime = 800

    
    climberGroup.add(climber)
    doorGroup.add(door);
  }
}