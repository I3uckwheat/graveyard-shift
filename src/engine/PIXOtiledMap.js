import * as PIXI from "pixi.js";

export class PIXOtiledMap {
  #layersData = {};
  #spriteSheetSet;
  #collidorObjects;
  height;
  width;

  constructor({mapJSON, spriteSheetSet, layerIndexes=[], collidorData=[]}) {
    this.height = mapJSON.height;
    this.width = mapJSON.width;
    this.#spriteSheetSet = spriteSheetSet;

    this.parseLayerMetaData({mapJSON, layerIndexes, collidorData});

    for(const layerDataName in this.#layersData) {
      const layerData = this.#layersData[layerDataName];
      layerData.container = this.createLayerSprites(layerData);
    }
  }

  parseLayerMetaData({mapJSON, layerIndexes, collidorData}) {
    for(const layerData of mapJSON.layers) {
      const collidorMetaData = (() => {
        if(collidorData[layerData.name]) return { adjust: collidorData[layerData.name] };
      })()

      const data = {
        ...layerData,
        renderIndex: layerIndexes[layerData.name],
        container: undefined,
        collidorMetaData
      }

      this.#layersData[layerData.name] = data;
    }
  }

  createLayerSprites(layer) {
    const layerSprites = new PIXI.Container();
    layerSprites.zIndex = layer.renderIndex;

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

  get collidors() {
    if(this.#collidorObjects) return this.#collidorObjects;
    const collidorObjects = [];

    for(const layerName in this.#layersData) {
      const layerData = this.#layersData[layerName];
      if(!layerData.collidorMetaData) continue;

      let column = 0;
      let row = 0;
      for(const tileGid of layerData.data) {
        // TODO, make rectangles of contigous squares instead of many rectangles
        if(tileGid > 0) {
          const {width, height} = this.#spriteSheetSet.getSize(tileGid);
          const x = (column * width);
          const y = (row * height);
          collidorObjects.push({x, y, width, height});

        }

        column++;
        if(column >= this.width) {
          row++;
          column = 0;
        }
      }
    }

    this.#collidorObjects = collidorObjects;
    return this.#collidorObjects;
  }

  get layers() {
    return Object.values(this.#layersData).map(layer => layer.container);
  }

  get collidorObjects() {
    return this.#collidorObjects;
  }
}