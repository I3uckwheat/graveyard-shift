import { PIXOentity } from "./engine/PIXOentity";

export class PlayerCharacter extends PIXOentity {
  constructor({PIXISprite, x=0, y=0, input}) {
    super({PIXISprite, x, y, input});
  }

  update(dt) {
    const speed = 1
    if(this.components.input.keys["w"]) {
      this.y -= dt * speed;
    }

    if(this.components.input.keys["a"]) {
      this.x -= dt * speed;
    }

    if(this.components.input.keys["s"]) {
      this.y += dt * speed;
    }

    if(this.components.input.keys["d"]) {
      this.x += dt * speed;
    }
  }

  render(dt) {
    this.components.sprite.x = this.x;
    this.components.sprite.y = this.y;
  }
}
