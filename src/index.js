import * as PIXI from "pixi.js";
import { PIXOtaur, PIXOentity, PIXOinput, PIXOtileSet } from "./engine/PIXOtaur.js";

import tileset from "./assets/spritesheets/16x16_tileset.png";


// const texture = PIXI.Texture.from(spriteSheet);
// const player = new PIXI.Texture(texture, {x: 16 * 11, y: 16 * 15, width: 16, height: 16});
// const sprite = new PIXI.Sprite(player);


class PlayerCharacter extends PIXOentity {
  constructor({PIXISprite, x=0, y=0, input}) {
    super({PIXISprite, x, y, input});
  }

  update(dt) {
    const speed = 1
    if(this.components.input.keys["w"]) {
      this.y -= dt * speed;
    }

    if(this.components.input.keys["a"]) {
      this.x -= dt * speed;
    }

    if(this.components.input.keys["s"]) {
      this.y += dt * speed;
    }

    if(this.components.input.keys["d"]) {
      this.x += dt * speed;
    }
  }

  render(dt) {
    this.components.sprite.x = this.x;
    this.components.sprite.y = this.y;
  }
}

const test = new PIXOtaur({});
test.setMap();


const tilesetSheet = new PIXOtileSet({
  name: "16x16_tileset",
  image: tileset,
  tileHeight: 16,
  tileWidth: 16,
  imageHeight: 16 * 16,
  imageWidth: 16 * 16,
});
const sprite = tilesetSheet.get(251);

const characterInput = new PIXOinput();
const character = new PlayerCharacter({PIXISprite: sprite, input: characterInput});
test.addEntity(character);
test.start();
