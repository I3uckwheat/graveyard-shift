import * as PIXI from "pixi.js";

import { PIXOtaur, PIXOinput, PIXOtileSet, PIXOtiledMap, PIXOspriteSheetSet, PIXOcollidorSpace } from "./engine/PIXOtaur.js";

import tileset from "./assets/spritesheets/16x16_tileset.png";
import walls from "./assets/spritesheets/16x16_walls.png";

import level1 from "./levels/level1";

import music from "url:./assets/music.mp3";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const game = new PIXOtaur({width: 400 * 2, height: 400 * 2, spriteScale: {x: 2, y: 2}});

const audio = new Audio(music);
audio.loop = true;

const mute = document.createElement('button');
mute.innerText = "toggle audio";
mute.id = "mute-button";
let muted = false;
mute.addEventListener('click', () => {
  if(muted) {
    audio.play();
  } else {
    audio.pause();
  }
  muted = !muted;
});

document.body.appendChild(mute);

const timer = document.createElement('p');
timer.id = 'timer';
timer.innerText = "Time Played: ";
document.body.appendChild(timer);

let startedDate;
let currentDate;
game.onStart = () => {
  audio.play();
  startedDate = new Date();
  currentDate = startedDate;
};

game.onUpdate = (dt, elapsed) => {
  currentDate = new Date();
  const elapsedTime = new Date(currentDate - startedDate);
  const elapsedMins = String(elapsedTime.getSeconds());
  timer.innerText = `Time Played: ${elapsedTime.getMinutes()}:${elapsedMins.padStart(2, '0')}`;
}


const tilesetSheet = new PIXOtileSet({
  gidStart: 1,
  name: "16x16_tileset",
  image: tileset,
  tileHeight: 16,
  tileWidth: 16,
  imageHeight: 16 * 16,
  imageWidth: 16 * 16,
});

const wallSheet = new PIXOtileSet({
  gidStart: 257,
  name: "16x16_walls",
  image: walls,
  tileHeight: 16,
  tileWidth: 16,
  imageHeight: 16 * 16,
  imageWidth: 16 * 16,
});

const spriteSheetSet = new PIXOspriteSheetSet([
  {gidRange: [1, 256], sheet: tilesetSheet}, 
  {gidRange: [257, 513], sheet: wallSheet}, 
]);

level1.load(game, spriteSheetSet);
// level2.load(game, spriteSheetSet);