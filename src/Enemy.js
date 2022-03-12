import { PIXOentity } from "./engine/PIXOentity";

export class Enemy extends PIXOentity {
  #unhandledCollisions = [];
  dead = false;
  direction = 'left';
  directions = ["up", "down", "left", "right"];

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

    const changeDirections = Math.random() > 0.80;
    if(changeDirections) {
      this.direction = this.chooseDirection();
    }

    const collisions = this.components.collidor.getCollisions();
    if(collisions.length > 0) {
      this.direction = this.chooseDirection();

      this.x = lastPosition.x;
      this.y = lastPosition.y;
    }
  }

  chooseDirection() {
    return this.directions[Math.floor(Math.random() * this.directions.length)];
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
