import * as PIXI from "pixi.js";
import { Layer } from "@pixi/layers";

import { PIXOtaur, PIXOinput, PIXOtileSet, PIXOtiledMap, PIXOspriteSheetSet } from "./engine/PIXOtaur.js";
import { PlayerCharacter } from "./PlayerCharacter.js";

import tileset from "./assets/spritesheets/16x16_tileset.png";
import walls from "./assets/spritesheets/16x16_walls.png";
import mapJSON from "./assets/maps/base.json";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const test = new PIXOtaur({width: 400 * 2, height: 400 * 2, spriteScale: {x: 2, y: 2}});

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
  layerIndexes: [
    {name: "Above", index: 1},
    {name: "Floor", index: -1},
    {name: "Walls", index: -1}
  ]
});


const characterInput = new PIXOinput();
const player = spriteSheetSet.get(252);
const character = new PlayerCharacter({PIXISprite: player, input: characterInput});
test.addEntity(character);
test.setMap(map);

test.start();
