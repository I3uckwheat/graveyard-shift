import * as PIXI from "pixi.js";

export class PIXOtiledMap {
  #spriteSheetSet;
  #layers = [];
  #layerIndexes = [];
  #collidorObjects = [];
  height;
  width;

  constructor({mapJSON, spriteSheetSet, layerIndexes=[], colliderTileLayers=[]}) {
    this.height = mapJSON.height;
    this.width = mapJSON.width;
    this.#spriteSheetSet = spriteSheetSet;
    this.#layerIndexes = layerIndexes;

    mapJSON.layers.forEach((layer) => {
      const sprites = this.createLayerSprites(layer);
      this.#layers.push({...layer, sprites});
    });

    this.setMapIndexes();
    this.#collidorObjects = this.gatherCollidorObjects(colliderTileLayers, mapJSON);
  }

  createLayerSprites(layer) {
    const layerSprites = new PIXI.Container();

    let column = 0;
    let row = 0;
    for(let tileGid of layer.data) {
      const sprite = this.#spriteSheetSet.get(tileGid);
      sprite.x = (column * sprite.width);
      sprite.y = (row * sprite.height);
      layerSprites.addChild(sprite);

      column++;
      if(column >= this.width) {
        row++;
        column = 0;
      }
    }

    return layerSprites;
  }

  setMapIndexes() {
    this.#layers.forEach(layer => {
      const indexInformation = this.#layerIndexes.find(layerIndexData => layerIndexData.name === layer.name);
      if(indexInformation) {
        layer.sprites.zIndex = indexInformation.index;
      }
    });
  }

  gatherCollidorObjects(collidorLayers) {
    const collidorObjects = [];
    collidorLayers.forEach(collidorLayer => {
      const layer = this.#layers.find(layer => layer.name === collidorLayer.name);
      layer.sprites.children.forEach(child => {
        const collidorObject = {
          x: child.x,
          y: child.y,
          width: child.width,
          height: child.height
        }

        collidorObjects.push(collidorObject);
      });
    });

    return collidorObjects;
  }

  get layers() {
    return this.#layers.map(layer => layer.sprites);
  }

  get collidorObjects() {
    return this.#collidorObjects;
  }
}