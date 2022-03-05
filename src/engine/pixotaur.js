import * as PIXI from "pixi.js";
import spriteSheet from "../assets/spritesheets/16x16_tileset.png";

export class PIXOtaur {
  elapsed = 0;
  constructor() {
    this.app = new PIXI.Application({ width: 640, height: 360 });
    document.body.appendChild(this.app.view);

    this.sprite = PIXI.Sprite.from(spriteSheet);
    this.app.stage.addChild(this.sprite);
  }

  update(dt, elapsed) {

  }

  render(dt, elapsed) {
    this.sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
  }

  start() {
    this.app.ticker.add(delta => {
      this.elapsed += delta;
      this.update(delta, this.elapsed);
      this.render(delta, this.elapsed);
    });
  }
}
