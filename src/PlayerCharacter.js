import { PIXOentity } from "./engine/PIXOentity";

export class PlayerCharacter extends PIXOentity {
  needsMove = true;
  #unhandledCollisions = [];

  constructor({PIXISprite, x=0, y=0, input}) {
    super({PIXISprite, x, y, input});
    this.components.collidor.hitboxes = [{hitbox: {x: 0, y: 0, height: 16, width: 16}, name: "player"}];
    this.components.collidor.handler = this.collisionHandler;
  }

  collisionHandler = (collidorName, entity) => {
    this.#unhandledCollisions.push({collidorName, entity});
  }

  update(dt) {
    if(this.needsMove) {
      const lastPosition = {x: this.x, y: this.y};
      if(this.components.input.keysDown["w"]) {
        this.y -= 16;
      }

      if(this.components.input.keysDown["a"]) {
        this.x -= 16;
      }

      if(this.components.input.keysDown["s"]) {
        this.y += 16;
      }

      if(this.components.input.keysDown["d"]) {
        this.x += 16;
      }

      const collisions = this.components.collidor.getCollisions();
      if(collisions.length > 0) {
        this.x = lastPosition.x;
        this.y = lastPosition.y;
        this.needsMove = true;
      }
      this.needsMove = false;
    }

    if(!Object.values(this.components.input.keysDown).some(key => key)) {
      this.needsMove = true;
    }

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
