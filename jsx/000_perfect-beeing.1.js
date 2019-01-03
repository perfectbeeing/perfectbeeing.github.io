var local = true;
var initDat = require("./dat/000_init.json");
if (typeof initDat == "string"){
  initDat = JSON.parse(initDat);
  local = false;
}


global.SIGH = require("../0-bee/999_int/0-sigh")();
global.SPIN = require("../0-bee/999_int/1-spin")(
  initDat.yrs,
  initDat.mon,
  initDat.day,
  initDat.hrs,
  initDat.min,
  initDat.sec
);
global.E = require("../0-bee/EVENT")();
global.BEEING = require("../0-bee/BEEING")();

//bell on the creature
var imgDat = require("./dat/000_img.json");
if (typeof imgDat == "string") imgDat = JSON.parse(imgDat);

imgDat.list.forEach((i, x) => (imgDat[x] = decodeURI(i)));

trace("you got any imgDat " + JSON.stringify( imgDat ) ); 

var narrative = require("../0-bee/000_nar/00_perfect-beeing")();

var BODY, SURFACE, dis000, btn000;
var app, stage, renderer;
var resetBtn;
var KEY = "PERFECT_BEEING-SHEILDED-LAKE";

var WIDTH = 1080;
var HEIGHT = 720;

var mc;

var awake = () => {
  trace("awaken");

  setTimeout(() => localforage.getItem(KEY, firstLoad), 1333);

  SIGH.removeListener(E.AWAKE, awake);
  setTimeout(() => SIGH.emit(E.AWAKE_NAR), 333);
  BODY = document.getElementById("body");
  dis000 = document.getElementById("dis000");

  SURFACE = document.getElementById("surface");

  btn000 = document.getElementById("btn000");
  resetBtn = document.getElementById("resetBtn");
  if (resetBtn != null) resetBtn.onclick = resetStorage;

  window.addEventListener("resize", () => setTimeout(resize, 111));

  //dis000.remove();
  //setTimeout( ()=> BODY.addChild( dis000 ) , 1111 )

  var hmr000 = new Hammer( SURFACE, {
    time: 111
  });
  hmr000.on("press", touchDown);
  hmr000.on("pressup", touchUp);

  SIGH.on(E.SPIN, spin);

  //roland thriston

  app = new PIXI.Application(WIDTH, HEIGHT, {
    forceCanvas: true,
    backgroundColor: 0x1099bb
  });

  SURFACE.appendChild(app.view);

  // create a new Sprite from an image path

  let alienImages = imgDat.list;
  let textureArray = [];

  alienImages.forEach(a => {
    var texture;
    if ( local == false ) texture =  PIXI.Texture.fromImage( a );
    if ( local == true ) texture =  PIXI.Texture.fromImage('../beeing/' + a);
  
    textureArray.push(texture);
  });

  mc = new PIXI.extras.AnimatedSprite(textureArray);
  mc.stop();
  mc.animationSpeed = 0.5;
  var bunny = mc;

  // center the sprite's anchor point
  bunny.anchor.set(0.5);

  // move the sprite to the center of the screen
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  stage = app.stage;
  renderer = app.renderer;
  stage.addChild(bunny);

  // Listen for animate update
  app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    // bunny.rotation -= 0.1 * delta;
  });

  resize();
};

var pixels = 0;
var pixelMax = 10000;

var spin = val => {
  // trace("val " + val);
  dis000.innerText = FORMAT(val);
  
  pixels += 100;
  if ( pixels > pixelMax){
     mc.gotoAndStop( mc.currentFrame + 1 )
     pixels = 0;
  }


  if ( mc.currentFrame >= mc.totalFrames ) return
 
};

var resize = () => {
  trace("you are resize ");

  var W = WIDTH,
    H = HEIGHT;

  var outerWidth = parent.innerWidth;
  trace(" outer width " + outerWidth);

  renderer.resize(parent.innerWidth, HEIGHT);

  var ratio = Math.min(parent.innerWidth / WIDTH, parent.innerHeight / HEIGHT);

  stage.position.set(renderer.width / 2, renderer.height / 2);
  stage.scale.set(ratio * 2, ratio * 2);
  stage.pivot.set(W / 2, H / 2);
};

var resetStorage = () => {
  trace("reset the storage ");
  localforage.setItem(KEY, null, resetStorageComplete);
};

var resetStorageComplete = () => {
  setTimeout(() => location.reload(), 333);
};

var firstLoad = (err, val) => {
  if (err) return errorSave(err);
  if (val == null) {
    SIGH.on(E.RECORD, firstSave);
    SIGH.emit(E.FETCH_RECORD);
    return;
  }

  trace("first load " + val);
};

var errorSave = err => {
  trace("ERRR:: " + err);
};

var firstSave = dat => {
  trace("time for a first save ");
  SIGH.removeListener(E.RECORD, firstSave);
  var value = JSON.stringify(dat);
  localforage.setItem(KEY, value, firstSaveComplete);
};

var firstSaveComplete = (err, dat) => {
  trace("your first save is complete " + err + ":" + dat);
};

var touchDown = () => {
  trace("touch down");
  SIGH.emit(E.MAGIC_ON);
};

var touchUp = () => {
  trace("touch up");
  SIGH.emit(E.MAGIC_NO);
};

SIGH.on(E.AWAKE, awake);
setTimeout(() => SIGH.emit(E.AWAKE), 333);

//var img000 = "{{=it.imgDat}}";
//var img001 = JSON.parse( img000 )
//can these people hack someone
//var list = img000.split('\n');
