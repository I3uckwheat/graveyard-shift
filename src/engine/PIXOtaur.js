import * as PIXI from "pixi.js";

import { PIXOentity } from "./PIXOentity";
import { PIXOcollidor } from "./PIXOcollidor";
import { PIXOinput } from "./PIXOinput";
import { PIXOtiledLoader } from "./PIXOtiledMap";
import { PIXOtileSet } from "./PIXOtileSet";

export class PIXOtaur {
  #elapsed = 0;
  #entities = [];

  constructor({width=640, height=360}) {
    this.app = new PIXI.Application({ width, height });
    document.body.appendChild(this.app.view);
  }

  addEntity(entity) {
    this.#entities.push(entity);
    if(entity.components.sprite) this.app.stage.addChild(entity.components.sprite);
  }

  update(dt, elapsed) {
    this.#entities.forEach(entity => entity.update(dt, elapsed));
  }

  render(dt, elapsed) {
    this.#entities.forEach(entity => entity.render(dt, elapsed));
  }

  setMap() {
    // const map = new PIXI.extras.TiledMap(baseMap);
  }

  start() {
    this.app.ticker.add(delta => {
      this.#elapsed += delta;
      this.update(delta, this.#elapsed);
      this.render(delta, this.#elapsed);
    });
  }
}

export { PIXOentity, PIXOcollidor, PIXOinput, PIXOtiledLoader, PIXOtileSet };