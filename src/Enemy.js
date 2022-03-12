import { PIXOentity } from "./engine/PIXOentity";

export class Enemy extends PIXOentity {
  #unhandledCollisions = [];
  dead = false;

  constructor({PIXISprite, x=0, y=0, input}) {
    super({PIXISprite, x, y, input});
    this.components.collidor.hitbox = {box: {x: 0, y: 0, height: 16, width: 16}, name: "enemy"};
    this.components.collidor.handler = this.collisionHandler;
    this.health = 100;
    this.startingHealth = 100;
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

  encounterCompleteHandler(damage) {
    this.health -= damage;
    if(this.health < 0) this.dead = true;
  }

  update(dt) {
  }

  render(dt) {
    this.components.sprite.x = this.x;
    this.components.sprite.y = this.y;
  }
}
