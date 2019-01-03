(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
var EventEmitter = require("events").EventEmitter;
global.SIGH = new EventEmitter();

global.trace = msg => console.log(msg);
global.E = require("../EVENT-VEW.js")();
global.GLOP ='0';

global.DAT = {"toon":[["./lup/000-call-sigh/1523472408203-018-arizona-ize-tee.png","./lup/000-call-sigh/1523472994974-017-sunflowers.png"],["./lup/001-load-loop/2016-12-17 23_25_26-Perfect Beeing _ An American Alligator Fantasy.png","./lup/001-load-loop/2016-12-17 23_25_30-Perfect Beeing _ An American Alligator Fantasy.png","./lup/001-load-loop/2016-12-17 23_25_34-Perfect Beeing _ An American Alligator Fantasy.png","./lup/001-load-loop/2016-12-17 23_25_37-Perfect Beeing _ An American Alligator Fantasy.png","./lup/001-load-loop/2016-12-17 23_25_39-Perfect Beeing _ An American Alligator Fantasy.png","./lup/001-load-loop/2016-12-17 23_25_42-Perfect Beeing _ An American Alligator Fantasy.png","./lup/001-load-loop/2016-12-17 23_25_44-Perfect Beeing _ An American Alligator Fantasy.png","./lup/001-load-loop/2016-12-17 23_25_47-Perfect Beeing _ An American Alligator Fantasy.png","./lup/001-load-loop/2016-12-17 23_25_49-Perfect Beeing _ An American Alligator Fantasy.png"],["./lup/002-pattern/1523471230812-018-arizona-ize-tee.png","./lup/002-pattern/1523471683861-018-arizona-ize-tee.png","./lup/002-pattern/1523472022515-018-arizona-ize-tee.png"],["./lup/003-beetriot-street/1523086211593.png","./lup/003-beetriot-street/1523086378758.png"],["./lup/003-heaven-control/1523059900215.png","./lup/003-heaven-control/1523060142373.png","./lup/003-heaven-control/1523060345066.png"],["./lup/004-kbar/1523073354493.png","./lup/004-kbar/1523073504371.png","./lup/004-kbar/1523074112785.png","./lup/004-kbar/1523074283584.png"],["./lup/005-panda/1523386921966-002-david-bowie.png","./lup/005-panda/1523387062335-019-skittles.png","./lup/005-panda/1523387200199-006-hope.png"],["./lup/006-farm/1523386921966-002-david-bowie.png","./lup/006-farm/1523387062335-019-skittles.png","./lup/006-farm/1523387200199-006-hope.png"]],"vido":["./vid/000-dream.mp4","./vid/001_the-glitch-mob-drink-the-sea-full-album.mp4"]}

var Bot = function(src) {
  var self = {};

  var socket, canvas, title, sign;

  var sceneList = [];
  var sceneDex = 0;
  var scene;

  var phase0 = ()=> { return require('./03_title')() }
  var phase1 = ()=> { return require('./04_call-sigh')() }
  var phase2 = ()=> { return require('./05_equiniti')() }

  var awake = () => {
    
    sceneList = [ phase0, phase1, phase2 ]
    
    SIGH.removeListener(E.AWAKE, awake);  
    
    socket = require('./01_access-socket')()
    canvas = require('./02_access-canvas')()
    window.addEventListener('resize', resize )
    SIGH.emit( E.AWAKE )
    
    SIGH.on ( E.SPIN, spin )
    spin();

    setTimeout( ()=> SIGH.emit( E.RESIZE, 1111 ))
  };

  var resize = ( e ) =>{
    e.preventDefault();
    SIGH.emit( E.RESIZE )
  }

  var spin = () => {
    if ( sceneDex > sceneList.length ) return 
    if ( scene != null ) scene = null
    SIGH.emit( E.REMOVE_ALL )
    
    scene = sceneList[ sceneDex ]
    sceneDex += 1;
    title = scene()
    trace("show me title " + title )
    if ( title.init == null ) return trace("NO INIT PRESENT for scene")
    title.init()
    SIGH.emit( E.AWAKE )
  };

  
  SIGH.on(E.AWAKE, awake);
  return self;
};

var botView = Bot();
SIGH.emit(E.AWAKE);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../EVENT-VEW.js":7,"./01_access-socket":2,"./02_access-canvas":3,"./03_title":4,"./04_call-sigh":5,"./05_equiniti":6,"events":8}],2:[function(require,module,exports){
var Bot = function(src) {
  var self = {};

  var host;
  var ws

  var awake = () => {
    SIGH.removeListener(E.AWAKE, awake);
    host = location.origin.replace(/^http/, "ws");
    if (host == "file://") host = "ws://localhost:5000";
    setTimeout(spin, 1111);
    SIGH.on(E.READY, spin);
  };

  var spin = () => {
    try {
      ws = new WebSocket(host);
      ws.onmessage = handshake;
      ws.onerror = error;
    } catch (e) { error }
  };

  var handshake = (eve, dat) => {
    if (eve.data == null) return;
    var data = JSON.parse(event.data);
    trace("IN DATA " + JSON.stringify( data ))
    GLOP = data;
    GLOP.loc = window.location.pathname;
    ws.send( JSON.stringify(GLOP))
    SIGH.removeListener(E.READY, spin);
    setTimeout( connected, 13111 )
  };

  var connected = () => {
    trace("you have connected ")
    //location.href = GLOP.loc +'?ava=' + GLOP.idx;
  };

  var error = (eve, dat) => document.location = "./11_socket-error.html"
   
  SIGH.on(E.AWAKE, awake);
  return self;
};

exports = module.exports = Bot;

},{}],3:[function(require,module,exports){

var Bot = function(src) {
  var self = {};

  var app;
  var width = 1080;
  var height = 720;
  var intro;
  var display;

  var resizeID;

  var awake = () => {
    SIGH.removeListener(E.AWAKE, awake);

    app = new PIXI.Application({ width: width, height: height });
    document.body.appendChild(app.view);
    app.stage.interactive = true;

    app.renderer.backgroundColor = 0x000000;

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    display = new PIXI.Container();
    app.stage.addChild(display);
    display.alpha = 0;

    SIGH.on(E.ADD_CHILD, addChild);
    SIGH.on(E.REMOVE_ALL, removeAll );

    SIGH.on(E.RESIZE, size);
    spin();

    resizeID = setInterval( size, 333);

    TweenLite.to(display, 3, {
      alpha: 1,
      ease: Power1.easeInOut,
      delay: 0.15,
      onComplete: ready
    });
  };

  var addChild = (img ) => {
    
    img.width = app.screen.width;
    img.height = app.screen.height;
    
    display.addChild(img);
    size();
  };

  var removeAll = () =>{
    display.removeChildren()
  }

  var ready = () => {
    clearInterval(resizeID);
    SIGH.emit(E.READY);
  };

  var size = () => {
   
    var width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    var height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    app.renderer.resize(width, height);

    display.x = width * 0.5 - app.screen.width / 2;
    display.y = height * 0.5 - app.screen.height / 2;

    var scale = Math.max(app.renderer.width / 1080, app.renderer.height / 720);
    display.scale.set(scale);
    display.position.set(
      app.renderer.width / 2 - display.width / 2,
      app.renderer.height / 2 - display.height / 2
    );
  };

  var spin = () => {
    window.requestAnimationFrame(spin);
  };

  SIGH.on(E.AWAKE, awake);
  return self;
};

exports = module.exports = Bot;

},{}],4:[function(require,module,exports){
var Bot = function(src) {
  var self = {};

  var intro;

  var awake = () => {
    SIGH.removeListener(E.AWAKE, awake);

    intro = new PIXI.Text("Access", {
      fontFamily: "Arial",
      fontSize: 100,
      fontWeight: "bold",
      fill: "yellow"
    });

    SIGH.emit(E.ADD_CHILD, intro);
    setTimeout(spin, 4111);
  };

  var spin = () => {
    TweenLite.to(intro, 1, {
      alpha: 0,
      ease: Power1.easeInOut,
      delay: 0.15,
      onComplete: over
    });
  };

  var over = () => SIGH.emit(E.SPIN);
  
  self.init = () => SIGH.on(E.AWAKE, awake);
  return self;
};

exports = module.exports = Bot;

},{}],5:[function(require,module,exports){
var Bot = function(src) {
  var self = {};

  var mc, videoSprite, textureVID;

  var awake = () => {

    SIGH.removeListener(E.AWAKE, awake);

    textureVID = PIXI.Texture.fromVideo(DAT.vido[0]);

    // create a new Sprite using the video texture (yes it's that easy)
    videoSprite = new PIXI.Sprite( textureVID );
    videoSprite.alpha = 0;
    SIGH.emit(E.ADD_CHILD, videoSprite);

    mc = PIXI.extras.AnimatedSprite.fromImages(DAT.toon[6]);
    mc.animationSpeed = 0.55;
    mc.loop = true;
    mc.play();
    SIGH.emit(E.ADD_CHILD, mc);
    setTimeout(spin, 6111);
  };

  var spin = () => {
    TweenLite.to( mc, 1, {
      alpha: 0,
      ease: Power1.easeInOut,
      delay: 0.15,
      onComplete: over
    });
  };

  var over = () => {
    trace("the title is over ");
    textureVID.baseTexture.source.pause();
    setTimeout(() => SIGH.emit(E.SPIN), 1111);
    videoSprite = null;
    textureVID = null;
  };

  self.init = () => SIGH.on(E.AWAKE, awake);
  
  return self;
};

exports = module.exports = Bot;

},{}],6:[function(require,module,exports){
var Bot = function(src) {
  var self = {};

  var mc, videoSprite, textureVID, sound;

  var size = 16111;
  var delay = 1111;

  var awake = () => {
    SIGH.removeListener(E.AWAKE, awake);
    textureVID = PIXI.Texture.fromVideo(DAT.vido[0]);
    videoSprite = new PIXI.Sprite( textureVID );
    videoSprite.alpha = 0;
    sound = textureVID.baseTexture.source;
    sound.loop = tu
    SIGH.emit(E.ADD_CHILD, videoSprite);

    mc = PIXI.extras.AnimatedSprite.fromImages(DAT.toon[1]);
    mc.animationSpeed = 0.55;
    mc.loop = true;
    mc.play();
    SIGH.emit(E.ADD_CHILD, mc);
    setTimeout(spin, size );
  };

  var spin = () => {
    TweenLite.to( mc, 1, {
      alpha: 0,
      ease: Power1.easeInOut,
      delay: 0.15,
      onComplete: over
    });
  };

  var over = () => {
    trace("the title is over ");
    sound.pause();
    setTimeout(() => SIGH.emit(E.SPIN), delay);
    videoSprite = null;
    textureVID = null;
  };

  self.init = () => SIGH.on(E.AWAKE, awake);
  
  return self;
};

exports = module.exports = Bot;

},{}],7:[function(require,module,exports){
"use strict";

var EventID = function () {

	var self = {};
	
	self.RESIZE = '201805091250';
	self.SPIN = '201805091015';
	self.REMOVE_ALL = '201805091028';
	self.ADD_CHILD = '201805090946';
	self.READY = '201805090945';
	self.AWAKE = '201805090944';
	self.INIT = '201802131119';
	
	return self;
}


exports = module.exports = EventID;
},{}],8:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }

  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}]},{},[1]);
