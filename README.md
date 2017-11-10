# Perfect Beeing 

#Code

This is written in Node.JS and requires quite a few modules

var story;
var init = ['', './1-act', './2-ava', './3-txt', './4-map']
init = init.concat(['./5-web', './6-bot', './7-vew', './8-dat'])
init = init.concat(['./9-src', './6-bot/display/'])

var awake = () => {
    global.SIGH = require('./0-bee/0_int/0-sigh')();
    story = require('./0_story')();
    init.forEach((i, x) => FS.ensureDirSync(i))
    SIGH.emit(E.BUILD_STORY);
}

awake();
//trace( miles/texas);

#The most recent simulation can be found by touching the link below.

<a href="https://perfectbeeing.neocities.org/">Perfect Beeing : A Sim Story </a>


#What the Critics Said


#ROBERTA SMITH: 
It displays a roughness around the edges. There is a mystery to it [:punct:][:digit:]' | Will it come together or will it not.

#JERRY SLATZ: 
Wishes to be about progress but is not


