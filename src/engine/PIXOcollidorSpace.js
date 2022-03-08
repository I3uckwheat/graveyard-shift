export class PIXOcollidorSpace {
  #dynamic = [];
  #static = [];

  constructor() {}

  addDynamicCollidor({entity, offsetX, offsetY, width, height}) {
    this.#dynamic.push({entity, offsetX, offsetY, width, height});
  }

  addStaticCollidor({x, y, width, height}) {
    this.#static.push({x, y, width, height});
  }

  update(dt) {
  }
}