import * as PIXI from "pixi.js";

import { PIXOentity } from "./PIXOentity";
import { PIXOcollidorSpace } from "./PIXOcollidorSpace";
import { PIXOinput } from "./PIXOinput";
import { PIXOtiledMap } from "./PIXOtiledMap";
import { PIXOtileSet } from "./PIXOtileSet";
import { PIXOspriteSheetSet } from "./PIXOspriteSheetSet";

export class PIXOtaur {
  #elapsed = 0;
  #entities = [];
  #map;
  #spritesContainer;

  app;
  onStart = () => {};
  nextLevelCallback = () => {};

  constructor({width=400, height=400, spriteScale={x: 1, y: 1}, collidor}) {
    this.app = new PIXI.Application({ width, height });
    this.app.stage.sortableChildren = true;
    this.app.stage.scale.x = spriteScale.x;
    this.app.stage.scale.y = spriteScale.y;
    this.collidor = collidor;

    this.#spritesContainer = new PIXI.Container();
    this.#spritesContainer.zIndex = 0;
    this.app.stage.addChild(this.#spritesContainer);

    document.body.appendChild(this.app.view);
  }

  addComponent(entity) {
    this.#entities.push(entity);
    entity.context = this;
    if(entity.components && entity.components.sprite) {
      this.#spritesContainer.addChild(entity.components.sprite);
    }
  }

  removeComponent(entity) {
    if(entity.components) {
      if(entity.components.sprite) {
        this.#spritesContainer.removeChild(entity.components.sprite);
      }

      if(entity.components.collidor) {
        this.collidor.removeDynamicCollidorFromEntity(entity);
      }
    }
    this.#entities = this.#entities.filter(entityListEntity => entityListEntity !== entity);
  }

  setMap(map) {
    this.#map = map;
    this.app.stage.addChild(...map.layers);
    this.app.stage.sortChildren();
  }

  update(dt, elapsed) {
    this.#entities.forEach(entity => {
      if(entity.dead) {
        return this.removeComponent(entity);
      }
      entity.update(dt, elapsed);
    });
  }

  render(dt, elapsed) {
    this.#entities.forEach(entity => entity.render(dt, elapsed));
  }
  
  clear() {
    this.#entities.forEach(entity => {
      this.removeComponent(entity);
    });
    this.#entities = [];
    this.#map.layers.forEach(layer => {
      this.app.stage.removeChild(layer);
    });

    this.app.stage.removeChild(this.#spritesContainer);
    this.#spritesContainer = new PIXI.Container();
    this.#spritesContainer.zIndex = 0;
    this.app.stage.addChild(this.#spritesContainer);
  }

  loadNextLevel() {
    this.clear();
    this.nextLevelCallback();
  }

  start() {
    this.onStart();
    this.app.ticker.add(delta => {
      this.#elapsed += delta;
      this.update(delta, this.#elapsed);
      this.render(delta, this.#elapsed);
    });
  }
}

export { PIXOentity, PIXOcollidorSpace, PIXOinput, PIXOtiledMap, PIXOtileSet, PIXOspriteSheetSet };