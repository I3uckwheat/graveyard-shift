export class PIXOinput {
  isActive = true;
  keys = {};

  constructor() {
    document.addEventListener('keydown', e => this.handleKeyDown(e));
    document.addEventListener('keyup', e => this.handleKeyUp(e));
  }

 handleKeyDown(e) {
  const key = e.key;
  this.keys[key] = true;
 }

 handleKeyUp(e) {
  const key = e.key;
  this.keys[key] = false;
 }
}
