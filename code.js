var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
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

//Aqui se crean los Sprites del ladrón, los laseres, y el diamante, junto con su ubicación y color
var thief;
var laser1;
var laser2;
var diamondBox;
function setup() {

  thief = createSprite(10,390,30,30);

  laser1 = createSprite(100,0,200,5);
  laser1.shapeColor = "red";
  laser1.velocityY = 3;

  laser2 = createSprite(300,400,200,5);
  laser2.shapeColor = "red";
  laser2.velocityY=-3;

  diamondBox = createSprite(390,10,30,30);
  diamondBox.shapeColor="blue";
}

//aqui se crea la configuración de lo que pasa cuando el ladrón es tocado por los laseres
function checkwin(){
  if(laser1.isTouching(thief)|| laser2.isTouching(thief)){
  stroke("black");
  fill(8);
  textSize(24);
  text("El ladrón ha sido atrapado",70,200);
  laser1.velocityY=0;
  laser2.velocityY=0;
  thief.velocityY=0;
  thief.velocityX=0;
  }
  
  //aqui se crea la configuración de lo que pasa cuando el ladrón consigue el diamante
  if(thief.isTouching(diamondBox)){
    stroke ("black");
    fill(8);
    textSize(24);
    text ("El ladrón consiguio el diamante",40,200)
    laser1.velocityY=0;
    laser2.velocityY=0;
    thief.velocityY=0;
    thief.velocityX=0;
  }
}
function draw() {
  background(220);
  
  //aqui se crea la configuración para que el ladrón pueda moverse
  fill("white");
  if(keyDown(RIGHT_ARROW)){
  thief.velocityX=2;
  thief.velocityY=0;
  }

  if(keyDown(LEFT_ARROW)){
    thief.velocityX=-2;
    thief.velocityY=0;  
  }

  if(keyDown(UP_ARROW)){
    thief.velocityX=0;
    thief.velocityY=-2;
  }

  if(keyDown(DOWN_ARROW)){
    thief.velocityX=0;
    thief.velocityY=2;
  }
  //aqui se crean los bordes y la configuración para que el ladrón y los laseres reboten con estos
  edges = createEdgeSprites();
  thief.bounceOff(edges);
  laser1.bounceOff(edges);
  laser2.bounceOff(edges);
  drawSprites();
  checkwin();
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
