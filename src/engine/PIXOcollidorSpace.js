export class PIXOcollidorSpace {
  components = {};
  #dynamicCollidors = [];
  #staticCollidors = [];

  constructor() {}

  // x and y are adjustments from the entity position
  addDynamicCollidor(entity, {x=0, y=0, width=entity.width, height=entity.height}={}) {
    this.#dynamicCollidors.push({entity, x, y, width, height});
  }

  addStaticCollidor({x, y, width, height}) {
    this.#staticCollidors.push({x, y, width, height});
  }

  addStaticCollidors(collidors) {
    collidors.forEach(collidor => this.#staticCollidors.push(collidor));
  }

  update(dt) {

    // Static vs dynamic collisions
    for(const dynamicCollidor of this.#dynamicCollidors) {
      for(const staticCollidor of this.#staticCollidors) {
        const entity = dynamicCollidor.entity;
        const isColliding = this.isColliding(entity, staticCollidor);
        if(isColliding) console.log("collision!!");
      }
    }
  }

  isColliding(a, b) {
    if (a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.h + a.y > b.y) {
      return true;
    }
    return false;
  }

  render(dt) {}
}