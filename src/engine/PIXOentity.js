export class PIXOentity {
  x;
  y;

  components = {
    sprite: undefined, // Sprite to display
    collidor: undefined, // Global collidor instnace reference
    input: undefined // input instance
  };

  constructor({x=0, y=0, PIXISprite, collidor, input}) {
    this.x = x;
    this.y = y;

    this.components.sprite = PIXISprite;
    this.components.collidor = collidor;
    this.components.input = input;
  }
  
  update(dt, elapsed) {}
  render(dt, elapsed) {}
}