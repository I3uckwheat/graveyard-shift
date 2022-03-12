import TitleScreen from "./assets/TitleScreen.png";

export class WelcomeScreen {
  screen;
  startCallback;

  constructor(startCallback) {
    this.startCallback = startCallback;
  }

  show() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('overlay');
    wrapper.innerHTML = `
      <img src=${TitleScreen} />
      <p id="press-space">Press Space to continue</p>
    `;

    this.screen = wrapper;
    document.body.appendChild(wrapper);
    document.addEventListener('keydown', this.onKeyPress);
  }

  onKeyPress = (e) => {
    if(e.key === ' ') {
      this.startCallback();
      this.destroy();
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.onKeyPress);
    document.body.removeChild(this.screen);
  }
}