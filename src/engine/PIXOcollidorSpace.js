import * as PIXI from "pixi.js";

// Static positions
export class PIXOstaticCollidorHitbox {
  collidorName;
  x;
  y;
  width;
  height;

  constructor(hitboxName, {x, y, width, height}) {
    this.collidorName = hitboxName;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get hitbox() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }
}

// Based on offsets of entity
export class PIXOdynamicCollidorHitbox extends PIXOstaticCollidorHitbox {
  entity;
  constructor(entity, collidorName, {x, y, width, height}) {
    super(collidorName, {x, y, width, height});
    this.entity = entity;
  }

  get hitbox() {
    return { 
      x: this.entity.x + this.x, 
      y: this.entity.y + this.y, 
      width: this.width, 
      height: this.height
    }
  }
}

export class PIXOcollidorSpace {
  components = {};
  #dynamicCollidors = [];
  #staticCollidors = [];
  #hitboxRenders = [];
  context;

  constructor() {}

  // x and y are adjustments from the entity position
  addDynamicCollidorsFromEntity(entity) {
    const hitbox = {
      name: entity.components.collidor.hitbox.name,
      box: entity.components.collidor.hitbox.box,
    }

    const collidor = new PIXOdynamicCollidorHitbox(entity, hitbox.name, hitbox.box);
    this.#dynamicCollidors.push(collidor);

    entity.components.collidor.getCollisions = () => this.getEntityCollisions(entity);
    entity.components.collidor.areaCollisions = this.areaCollisions.bind(this);
    entity.components.collidor.collidorObject = collidor;
  }

  removeDynamicCollidorFromEntity(entity) {
    this.#dynamicCollidors = this.#dynamicCollidors.filter(collidor => collidor !== entity.components.collidor.collidorObject);
  }

  getEntityCollisions(entity) {
    const collidor = this.#dynamicCollidors.find(collidor => collidor.entity === entity);
    if(!collidor) return [];

    const collisions = [];
    for(const staticCollidor of this.#staticCollidors) {

      const isColliding = this.isColliding(collidor.hitbox, staticCollidor.hitbox);

      if(isColliding) {
        collisions.push({collidorName: staticCollidor.collidorName, entity: null});
      }
    }

    return collisions;
  }

  addStaticCollidor({x, y, width, height}) {
    const staticCollidor = new PIXOstaticCollidorHitbox("PIXOstaticCollidor", {x, y, width, height});
    this.#staticCollidors.push(staticCollidor);
  }

  addStaticCollidors(hitboxes) {
    hitboxes.forEach(hitbox => this.addStaticCollidor(hitbox));
  }

  update(dt) {
    // Display hitboxes
    // this.#dynamicCollidors.forEach((collidor, index) => {
    //   this.#hitboxRenders[index].x = collidor.entity.x + collidor.x;
    //   this.#hitboxRenders[index].y = collidor.entity.y + collidor.y;
    // })

    // Static vs dynamic collisions
    // TODO: Only handle for dynamic collidors using events or something

    for(const dynamicCollidor of this.#dynamicCollidors) {
      for(const staticCollidor of this.#staticCollidors) {
        const entity = dynamicCollidor.entity;

        const isColliding = this.isColliding(dynamicCollidor.hitbox, staticCollidor.hitbox);

        if(isColliding) {
          entity.components.collidor.handler(staticCollidor.collidorName);
          entity.components.collidor.isColliding = true;
        } else {
          entity.components.collidor.isColliding = false;
        }
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

  areaCollisions(hitbox, entity) {
    const collisions = [];
    for(const staticCollidor of this.#staticCollidors) {

      const isColliding = this.isColliding(hitbox, staticCollidor.hitbox);

      if(isColliding) {
        collisions.push({collidorName: staticCollidor.collidorName, entity: null});
      }
    }

    for(const dynamicCollidor of this.#dynamicCollidors) {
      if(dynamicCollidor.entity === entity) continue;
      const isColliding = this.isColliding(hitbox, dynamicCollidor.hitbox);

      if(isColliding) {
        collisions.push({collidorName: dynamicCollidor.collidorName, entity: dynamicCollidor.entity});
      }
    }

    return collisions;
  }

  showHitboxes(value) {
    if(value) {
      this.showHitboxes = value;
      this.#dynamicCollidors.forEach((collidor, index) => {
        const hitbox = new PIXI.Graphics();
        hitbox.lineStyle(1, 0xFF000);
        hitbox.drawRect(0, 0, collidor.width, collidor.height);
        hitbox.zIndex = 9999;

        this.#hitboxRenders.push(hitbox);
        this.context.app.stage.addChild(hitbox);
      })

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