import * as PIXI from "pixi.js";

export class PIXOtileSet {
  name;
  #textures = [];

  constructor({name, image, tileHeight, tileWidth, imageHeight, imageWidth}) {
    this.name = name;

    const baseTexture = PIXI.Texture.from(image);

    const columns = imageWidth / tileWidth;
    const rows = imageHeight / tileHeight;

    for(let row = 0; row < rows; row++) {
      for(let column = 0; column < columns; column++) {
        const texture = new PIXI.Texture(baseTexture, {x: column * tileWidth, y: row * tileHeight, width: tileWidth, height: tileHeight});
        this.#textures.push(texture);
      }
    }
  }

  get(gid) {
    // Number is a 1 indexed value
    return new PIXI.Sprite(this.#textures[gid - 1]);
  }

  get count() {
    return this.#textures.length;
  }
}