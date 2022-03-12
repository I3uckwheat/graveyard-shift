import { PIXOtaur, PIXOinput, PIXOtileSet, PIXOtiledMap, PIXOspriteSheetSet, PIXOcollidorSpace } from "../engine/PIXOtaur.js";
import { PlayerCharacter } from "../PlayerCharacter.js";
import { Enemy } from "../Enemy.js";
import { RLBaseScene } from "../RLBaseScene.js";
import { WelcomeScreen } from "../WelcomeScreen.js";

import mapJSON from "../assets/maps/base.json";
import level2 from "./level2.js";;

function load(game, spriteSheetSet) {
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
  game.collidor = collidorSpace;

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

  const rlHandler = new RLBaseScene({player: character, input: input, collidorSpace, game});
  rlHandler.addEnemy(enemy);

  game.addComponent(rlHandler);

  const welcome = new WelcomeScreen(() => game.start());
  game.nextLevelCallback = () => {level2.load(game, spriteSheetSet)};
  welcome.show();
}

export default {load};