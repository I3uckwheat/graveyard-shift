import * as PIXI from "pixi.js";

import { PIXOtaur, PIXOinput, PIXOtileSet, PIXOtiledMap, PIXOspriteSheetSet, PIXOcollidorSpace } from "./engine/PIXOtaur.js";
import { PlayerCharacter } from "./PlayerCharacter.js";
import { Enemy } from "./Enemy.js";
import { RLBaseScene } from "./RLBaseScene.js";
import { WelcomeScreen } from "./WelcomeScreen.js";

import tileset from "./assets/spritesheets/16x16_tileset.png";
import walls from "./assets/spritesheets/16x16_walls.png";
import mapJSON from "./assets/maps/base.json";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const game = new PIXOtaur({width: 400 * 2, height: 400 * 2, spriteScale: {x: 2, y: 2}});

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

const map = new PIXOtiledMap({
  mapJSON: mapJSON,
  spriteSheetSet: spriteSheetSet,
  layerIndexes: {
    "Above": 1,
    "Floor": -1,
    "Walls": -1
  },

  // adjust: x and y are how many pixels to move in either direction, w and h adjust the size from the right, not center
  // So make sure the x and y are properly adjusted
  // colliderTileLayers: [{name: "Walls", adjust: {x: 0, y: 0, w: 0, h: 0}}] // For exporting collision boxes
  collidorData: { // For exporting collision boxes
    "Walls": {x: 0, y: 0, w: 0, h: 0}
  }
});

const collidorSpace = new PIXOcollidorSpace();
game.addComponent(collidorSpace);

collidorSpace.addStaticCollidors(map.collidors);


const input = new PIXOinput();
const playerSprite = spriteSheetSet.get(252);
const character = new PlayerCharacter({PIXISprite: playerSprite, input: input, x: 256, y: 256});
collidorSpace.addDynamicCollidorsFromEntity(character);
game.addComponent(character);

const enemySprite = spriteSheetSet.get(195);
const enemy = new Enemy({PIXISprite: enemySprite, x: 320, y: 320});
collidorSpace.addDynamicCollidorsFromEntity(enemy);
game.addComponent(enemy);

game.setMap(map);

const rlHandler = new RLBaseScene({player: character, input: input, collidorSpace});
rlHandler.addEnemy(enemy);

game.addComponent(rlHandler);

const welcome = new WelcomeScreen(() => game.start());
welcome.show();
