import { PIXOentity } from "./engine/PIXOentity";

export class PlayerCharacter extends PIXOentity {
  turnTaken = false;
  #unhandledCollisions = [];
  health = 100;
  lastPosition;
  dead = false;
  #healthElement;

  constructor({PIXISprite, x=0, y=0, input, rlHandler}) {
    super({PIXISprite, x, y, input});
    const healthElement = document.querySelector("#health");
    if(!healthElement) {
      this.#healthElement = document.createElement('p');
      document.body.appendChild(this.#healthElement);
      this.#healthElement.id = "health";
    } else {
      this.#healthElement = healthElement;
    }

    this.components.collidor.hitbox = {box: {x: 0, y: 0, height: 16, width: 16}, name: "player"};
    this.components.collidor.handler = this.collisionHandler;
  }

  collisionHandler = (collidorName, entity) => {
    this.#unhandledCollisions.push({collidorName, entity});
  }

  update(dt) {
    this.#healthElement.innerText = `Health: ${this.health}`
    if(!this.turnTaken) {
      this.lastPosition = {x: this.x, y: this.y};
      if(this.components.input.keysDown["w"] || this.components.input.keysDown["k"]) {
        this.y -= 16;
        this.turnTaken = true;
      }

      if(this.components.input.keysDown["a"] || this.components.input.keysDown["h"]) {
        this.x -= 16;
        this.turnTaken = true;
      }

      if(this.components.input.keysDown["s"] || this.components.input.keysDown["j"]) {
        this.y += 16;
        this.turnTaken = true;
      }

      if(this.components.input.keysDown["d"] || this.components.input.keysDown["l"]) {
        this.x += 16;
        this.turnTaken = true;
      }

      const movementCollisions = this.components.collidor.areaCollisions({
          x: this.x,
          y: this.y,
          width: this.components.collidor.hitbox.box.width,
          height: this.components.collidor.hitbox.box.height
        }, this);

      if(movementCollisions.length > 0) {
        for(const collision of movementCollisions) {
          if(collision.collidorName !== "PIXOstaticCollidor") {
            this.components.rlController.encounterHandler(collision);
          }
        }
      }

      const collisions = this.components.collidor.getCollisions();
      if(collisions.length > 0) {
        this.x = this.lastPosition.x;
        this.y = this.lastPosition.y;
        this.turnTaken = false;
      }
    }
  }

  lostEncounter = (damage) => {
    this.health -= damage;
    this.x = this.lastPosition.x;
    this.y = this.lastPosition.y;
    if(this.health <= 0) {
      this.dead = true;
    }
  }

  wonEncounter(damage) {
    this.health - damage;
    if(this.health <= 0) {
      this.dead = true;
    }
  }

  render(dt) {
    this.components.sprite.x = this.x;
    this.components.sprite.y = this.y;
  }
}
