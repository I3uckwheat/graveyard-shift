export class TypingModal {
  onComplete;
  modal;

  constructor({onComplete}) {
    this.onComplete = onComplete;
    document.addEventListener('click', this.documentClickHandler.bind(this));
  }

  drawElements() {
    console.log('draw');
    const wrapper = document.createElement('div');
    wrapper.classList.add('overlay');
    wrapper.innerHTML = `
    <div class="overlay-content">
      <h2>Type fast!</h2>
      <img src=${undefined}/>
      <p>afed fjdksl fiiif</p>
      <input></input>
    </div>
    `;

    const input = wrapper.querySelector("input");

    document.body.appendChild(wrapper);
    input.focus();

    this.modal = wrapper;
  }

  removeElements() {
    console.log('remove');
    document.body.removeChild(this.modal);
  }

  documentClickHandler(e) {
    if(this.modal) {
      this.modal.querySelector('input').focus();
    }
  }
}