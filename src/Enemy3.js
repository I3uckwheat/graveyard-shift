import { PIXOentity } from "./engine/PIXOentity";

export class Enemy3 extends PIXOentity {
  #unhandledCollisions = [];
  dead = false;
  direction = 'left';
  directions = ["up", "down", "left", "right"];
  steps = 0;

  constructor({PIXISprite, x=0, y=0, input}) {
    super({PIXISprite, x, y, input});
    this.components.collidor.hitbox = {box: {x: 0, y: 0, height: 16, width: 16}, name: "enemy"};
    this.components.collidor.handler = this.collisionHandler;
    this.health = 210;
    this.startingHealth = 210;
    this.direction = this.chooseDirection();
    this.directionChanges = 0;
  }

  collisionHandler = (collidorName, entity) => {
    this.#unhandledCollisions.push({collidorName, entity});
  }

  takeTurn() {
    const lastPosition = {x: this.x, y: this.y};
    switch(this.direction) {
      case "up": 
        this.y -= 16;
        break;
      case "down": 
        this.y += 16;
        break;
      case "left": 
        this.x -= 16;
        break;
      case "right": 
        this.x += 16;
        break;
    }

    if(this.directionChanges % 2 === 0) {
      if(this.steps > 2) {
        this.direction = this.chooseDirection();
        this.steps = 0;
      }
    } else {
      this.direction = this.chooseDirection();
      this.steps = 0;
    }

    const collisions = this.components.collidor.getCollisions();
    if(collisions.length > 0) {
      this.direction = this.chooseDirection();
      this.steps = 0;

      this.x = lastPosition.x;
      this.y = lastPosition.y;
    }
  }

  chooseDirection() {
    return this.directions[Math.floor(Math.random() * this.directions.length)];
    this.directionChanges++;
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
