import * as PIXI from "pixi.js";

export class PIXOcollidorSpace {
  components = {};
  #dynamicCollidors = [];
  #staticCollidors = [];
  #hitboxRenders = [];
  context;

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
    this.#hitboxRenders[0].x = this.#dynamicCollidors[0].entity.x
    this.#hitboxRenders[0].y = this.#dynamicCollidors[0].entity.y

    // Static vs dynamic collisions
    for(const dynamicCollidor of this.#dynamicCollidors) {
      for(const staticCollidor of this.#staticCollidors) {
        const entity = dynamicCollidor.entity;
        const hitbox = {
          x: entity.x, 
          y: entity.y, 
          width: dynamicCollidor.width, 
          height: dynamicCollidor.height
        }

        const isColliding = this.isColliding(hitbox, staticCollidor);

        if(isColliding) console.log("collision!!");
      }
    }
  }

  isColliding(a, b) {
    if (a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.height + a.y > b.y) {
      return true;
    }
    return false;
  }

  showHitboxes(value) {
    if(value) {
      this.showHitboxes = value;
      const hitbox = new PIXI.Graphics();
      hitbox.lineStyle(1, 0xFF000);
      hitbox.drawRect(0, 0, 16, 16);
      hitbox.zIndex = 9999;

      this.#hitboxRenders.push(hitbox);
      this.context.app.stage.addChild(hitbox);

      for(const staticCollidor of this.#staticCollidors) {
        const hitbox = new PIXI.Graphics();
        hitbox.lineStyle(1, 0x00FF00);
        hitbox.drawRect(staticCollidor.x, staticCollidor.y, staticCollidor.width, staticCollidor.height);
        hitbox.zIndex = 9999;

        this.context.app.stage.addChild(hitbox);
      }
    }
  }

  render(dt) {
  }
}