var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b","a1267749-b4c5-44a0-bff2-344d99f4e2a2","ad45de25-7f3b-453d-89de-fe94a65bfe93"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":9,"looping":true,"frameDelay":12,"version":"CmG1F1zgVjN351OqBCYPjueQ9YRNdi_M","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":null,"frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":12,"version":"BlJYztGTlkOXgzpVlhVZAnrMzjojuvqf","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"QUrjw.d5Z2Ims3cPqjsscbfsCDW9Vvmp","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"},"a1267749-b4c5-44a0-bff2-344d99f4e2a2":{"name":"cloud_1","sourceUrl":null,"frameSize":{"x":260,"y":134},"frameCount":1,"looping":true,"frameDelay":12,"version":"4ma3Kp0nKmNauKAuyp_.6AguQCfVsOt6","loadedFromSource":true,"saved":true,"sourceSize":{"x":260,"y":134},"rootRelativePath":"assets/a1267749-b4c5-44a0-bff2-344d99f4e2a2.png"},"ad45de25-7f3b-453d-89de-fe94a65bfe93":{"name":"textGameOver_1","sourceUrl":"assets/api/v1/animation-library/gamelab/jlwUdmDfQ.Fl8uZni7e_c3sVaNJCXBYL/category_gameplay/textGameOver.png","frameSize":{"x":412,"y":78},"frameCount":1,"looping":true,"frameDelay":2,"version":"jlwUdmDfQ.Fl8uZni7e_c3sVaNJCXBYL","loadedFromSource":true,"saved":true,"sourceSize":{"x":412,"y":78},"rootRelativePath":"assets/api/v1/animation-library/gamelab/jlwUdmDfQ.Fl8uZni7e_c3sVaNJCXBYL/category_gameplay/textGameOver.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

 canvas = createCanvas(displayWidth,displayHeight-150);

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//create a monkey sprite
var monkey = createSprite(100,330,20,20);

//to set animation
monkey.setAnimation("monkey");

//to give scale to monkey
monkey.scale=0.1;

//create a ground sprite
var ground = createSprite(400,350,3200,10);

//give velocity to ground
ground.velocityX=-4;

//to set animation for ground
ground.x=ground.width/2;

//create an invisibleGround sprite
var invisibleGround = createSprite(100,340,800,5);

//to make invisibleGroud sprite invisible
invisibleGround.visible = false;

//to set collider for monkey
monkey.setCollider("circle",0,0,200);

//create banana,obstacle and clouds group
var BananaGroup = createGroup();
var ObstacleGroup = createGroup();
var CloudsGroup = createGroup();

//score
var survivalTime=0;

function draw() {
  
  //set background as 255
  background(255);
   
   //to set text size
   textSize(20);
   
   //give colour to text as black
   fill("black");
   
   //to display score
   text("Survival Time: "+ survivalTime, 220, 30);

   camera.position.x=displayWidth/2;
   
  
   if (gameState===PLAY) {
   //to set velocity for ground
   ground.velocityX = -(9 + 3*survivalTime/100);
   
   //scoring   
   survivalTime = Math.ceil(frameCount/frameRate());
   
   //jump when the space key is pressed    
   if(keyDown("space") && monkey.y >= 310){
    monkey.velocityY = -12 ;
    } 
    
    //to set animation for infinite ground
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
    
    //to add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //if monkey is touching bananaGroup destroy the banana
   // if (monkey.isTouching(BananaGroup)) {
   //   BananaGroup.destroyEach();
   // }

  for (var i = 0; i < BananaGroup.length; i++) {
    if (BananaGroup.get(i).isTouching(monkey)) {
      BananaGroup.get(i).destroy();
      survivalTime= survivalTime+1;
    }
  }   
      //end the game if monkey is touching obstacleGroup
      if (monkey.isTouching(ObstacleGroup)) {
       var gameOver = createSprite(700,150,20,20);
       gameOver.setAnimation("textGameOver_1");
       gameOver.scale=0.5;
       gameState=END;
    }
     
    //to call the food,obstacle and spawClouds function 
    food();
    obstacles();
    spawnClouds();
    
    
      
    } else  if (gameState===END) {
      //set velocity of each game object to 0
      monkey.velocityY=0;
      ground.velocityX=0;
      BananaGroup.setVelocityXEach(0);
      ObstacleGroup.setVelocityXEach(0);
      CloudsGroup.setVelocityXEach(0);
      
      //to set lifetime of each group to 0
      ObstacleGroup.setLifetimeEach(-1);
      BananaGroup.setLifetimeEach(-1);
      CloudsGroup.setLifetimeEach(-1);
    }
    
    //to create edges for sprites
    createEdgeSprites();
    monkey.collide(invisibleGround);
  
    //to display
    drawSprites();
}

function food() {
if (World.frameCount % 80 === 0) {
    //to create sprite for banana
    var banana = createSprite(1200,300,20,20);
    
    //generate random obstacles
    banana.y = randomNumber(200,230);
    
    //to set animation for banana
    banana.setAnimation("Banana");
    
    //ot set scale for banana
    banana.scale = 0.05;
    
    //to set velocity
    banana.velocityX = -(8+(3*survivalTime/100));
    
     //assign lifetime to the variable
    banana.lifetime = 150;
    
    //add each cloud to the group
    BananaGroup.add(banana);
  }
}

function obstacles() {
if (World.frameCount % 100 === 0) {
    //to create sprite for obstacle
    var obstacle = createSprite(1230,330,20,20);
    
     //to set animation for obstacle
    obstacle.setAnimation("Stone");
    
    //to set scale for obstacle
    obstacle.scale = 0.1;
    
    //to set velocity for obstacle
    obstacle.velocityX =  -(8+(3*survivalTime/100));
    
     //assign lifetime to the variable
    obstacle.lifetime = 150;
    
    //add each cloud to the group
    ObstacleGroup.add(obstacle);
  }
}

function spawnClouds() {
  if (World.frameCount % 100 === 0) {
     //to create sprite for cloud
    var cloud = createSprite(1200,200,40,10);
    
    //geeratemrandom clouds
    cloud.y = randomNumber(80,110);
    
    //to set animation for cloud
    cloud.setAnimation("cloud_1");
    
    //to set scale for clouds
    cloud.scale = 0.5;
    
    //to set velocity for cloud
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 400;
  
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

















  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
