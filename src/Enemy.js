import { PIXOentity } from "./engine/PIXOentity";

export class Enemy extends PIXOentity {
  #unhandledCollisions = [];
  health = 100;

  constructor({PIXISprite, x=0, y=0, input}) {
    super({PIXISprite, x, y, input});
    this.components.collidor.hitboxes = [{hitbox: {x: 0, y: 0, height: 16, width: 16}, name: "enemy"}];
    this.components.collidor.handler = this.collisionHandler;
  }

  collisionHandler = (collidorName, entity) => {
    this.#unhandledCollisions.push({collidorName, entity});
  }

  takeTurn() {
    const lastPosition = {x: this.x, y: this.y};
    this.y -= 16;

    const collisions = this.components.collidor.getCollisions();
    if(collisions.length > 0) {
      this.x = lastPosition.x;
      this.y = lastPosition.y;
    }
  }

  update(dt) {

    // if(this.#unhandledCollisions.length > 0) {
    //   for(const collision of this.#unhandledCollisions) {
    //   }

    //   this.#unhandledCollisions = [];
    // }
  }

  render(dt) {
    this.components.sprite.x = this.x;
    this.components.sprite.y = this.y;
  }
}
