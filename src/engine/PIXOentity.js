export class PIXOentity {
  x;
  y;
  components = {};
  points = 1;
  health = 100;

  constructor({x=0, y=0, PIXISprite, input}) {
    this.x = x;
    this.y = y;

    this.components.sprite = PIXISprite;
    this.components.input = input;

    this.components.collidor = {
      hitbox: {box: {x: 0, y: 0, width: 0, height: 0}, name: "hitbox"},
      handler: () => {},
      getCollisions: () => [],
    }
  }
  
  update(dt, elapsed) {}
  render(dt, elapsed) {}
}