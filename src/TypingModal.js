import * as PIXI from 'pixi.js';

export class TypingModal {
  onComplete;
  modal;

  constructor({onComplete}) {
    this.onComplete = onComplete;
    document.addEventListener('click', this.documentClickHandler.bind(this));
  }

  runTypingEncounter(entity) {
    if(this.modal) return;
    const wrapper = document.createElement('div');
    wrapper.classList.add('overlay');
    wrapper.innerHTML = `
    <div class="overlay-content">
      <h2>Type fast!</h2>
      <!--<img src=${undefined}/>-->
      <p>afed fjdksl fiiif</p>
      <input></input>
    </div>
    `;

    const input = wrapper.querySelector("input");

    document.body.appendChild(wrapper);
    input.focus();

    this.modal = wrapper;

    setTimeout(() => {
      this.onComplete({madeMistake: false, timeLeft: 33, charactersTyped: "jkl;hhh", charactersToType: "jkl;hhh fff eeee"});
      this.removeElements();
    }, 4000);
  }

  removeElements() {
    document.body.removeChild(this.modal);
    this.modal = undefined;
  }

  documentClickHandler(e) {
    if(this.modal) {
      this.modal.querySelector('input').focus();
    }
  }
}