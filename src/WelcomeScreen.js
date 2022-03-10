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
      <div class="overlay-content">
        <img src=${TitleScreen} />
        <p>Press space to continue</p>
      </div>
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