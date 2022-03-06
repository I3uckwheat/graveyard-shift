import * as PIXI from "pixi.js";

export class PIXOtiledMap {
  #spriteSheetSet;
  #layers = [];
  height;
  width;

  constructor({mapJSON, spriteSheetSet}) {
    this.height = mapJSON.height;
    this.width = mapJSON.width;
    this.#spriteSheetSet = spriteSheetSet;

    mapJSON.layers.forEach((layer) => {
      const sprites = this.createLayerSprites(layer);
      this.#layers.push({...layer, sprites});
    });
  }

  createLayerSprites(layer) {
    const layerSprites = new PIXI.Container();

    let column = 1;
    let row = 0;
    for(let tileGid of layer.data) {
      const sprite = this.#spriteSheetSet.get(tileGid + 1);
      sprite.x = (column * sprite.width) + sprite.width;
      sprite.y = (row * sprite.height) + sprite.height;
      layerSprites.addChild(sprite);

      column++;
      if(column > this.width) {
        row++;
        column = 1;
      }
    }

    return layerSprites;
  }

  get layers() {
    return this.#layers.map(layer => layer.sprites);
  }
}