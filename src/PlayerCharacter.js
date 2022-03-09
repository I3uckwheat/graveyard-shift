import { PIXOentity } from "./engine/PIXOentity";

export class PlayerCharacter extends PIXOentity {
  needsMove = true;

  constructor({PIXISprite, x=0, y=0, input}) {
    super({PIXISprite, x, y, input});
    this.components.collidor.hitboxes = [{hitbox: {x: 0, y: 0, height: 16, width: 16}, name: "player-feet"}];
    this.components.collidor.handler = this.collisionHandler;
  }

  collisionHandler(collidorName, entity) {
    console.log("Collided with", collidorName);
  }

  update(dt) {
    if(this.needsMove) {
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

      this.needsMove = false;
    }

    if(!Object.values(this.components.input.keysDown).some(key => key)) {
      this.needsMove = true;
    }
  }

  render(dt) {
    this.components.sprite.x = this.x;
    this.components.sprite.y = this.y;
  }
}
