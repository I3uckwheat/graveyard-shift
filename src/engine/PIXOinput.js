export class PIXOinput {
  isActive = true;
  keysDown = {};
  keysUp = {};

  constructor() {
    document.addEventListener('keydown', e => this.handleKeyDown(e));
    document.addEventListener('keyup', e => this.handleKeyUp(e));
  }

 handleKeyDown(e) {
  const key = e.key;
  this.keysDown[key] = true;
  this.keysUp[key] = false;
 }

 handleKeyUp(e) {
  const key = e.key;
  this.keysDown[key] = false;
  this.keysUp[key] = true;
 }
}
