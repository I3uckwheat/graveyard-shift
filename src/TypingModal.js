import * as PIXI from 'pixi.js';

export class TypingModal {
  onComplete;
  modal;
  typeTime = 4000;
  typed = '';
  mistakes = false;

  constructor({onComplete}) {
    this.onComplete = onComplete;
    document.addEventListener('click', this.documentClickHandler.bind(this));
  }

  runTypingEncounter(entity) {
    if(this.modal) return;
    const words = this.generateWords(entity.health);

    const wrapper = document.createElement('div');
    wrapper.classList.add('overlay');
    wrapper.innerHTML = `
    <div class="overlay-content">
      <h2>Fight!!</h2>
      <!--<img src=${undefined}/>-->
      <p class="words"></p>
      <input></input>
    </div>
    `;

    const wordPara = wrapper.querySelector('.words');
    wordPara.appendChild(this.createWordElements(this.typed, words));

    const input = wrapper.querySelector("input");
    input.addEventListener('input', (e) => {
      this.typed = e.target.value;
      wordPara.innerHTML = '';
      wordPara.appendChild(this.createWordElements(this.typed, words));

      if(!e.data) return; // Assume backspace
      if(words[this.typed.length - 1] !== e.data) { // assume correct letter
        this.mistakes += 1;
      }
    });

    document.body.appendChild(wrapper);
    input.focus();

    this.modal = wrapper;


    const timeout = setTimeout(() => {
      this.onComplete({
        mistakes: this.mistakes, 
        charactersTyped: this.typed, 
        charactersToType: words
      });

      this.removeElements();
    }, this.typeTime);
  }

  createWordElements(typed, word) {
    const words = document.createDocumentFragment();
    word.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.innerText = char;
      if(typed[index]) {
        if(typed[index] === char) {
          span.classList.add("correct");
        } else {
          span.classList.add("incorrect");
        }
      }

      words.appendChild(span);
    });

    return words;
  }

  removeElements() {
    document.body.removeChild(this.modal);
    this.modal = undefined;
    this.typed = '';
    this.mistakes = false;
  }

  documentClickHandler(e) {
    if(this.modal) {
      this.modal.querySelector('input').focus();
    }
  }

  generateWords(health) {
    return "hello world foo bar baz";
  } 
}