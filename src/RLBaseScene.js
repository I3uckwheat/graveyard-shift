import { TypingModal } from "./TypingModal";

export class RLBaseScene {
  player;
  enemies = [];
  input;
  collidorSpace;
  #encounterInProgress = false;
  #enemiesNeedTurns = false;
  #typingModal;
  game;
  #levelHealth;
  #levelHealthElement;

  constructor({player, enemies=[], input, collidorSpace, game, levelHealth=100}) {
    this.player = player;
    this.player.components.rlController = {};
    this.player.components.rlController.encounterHandler = this.encounterHandler.bind(this);

    this.enemies = enemies;
    this.input = input;
    this.collidorSpace = collidorSpace;

    this.#typingModal = new TypingModal({onComplete: this.onTypingComplete.bind(this)});
    this.game = game;
    this.#levelHealth = levelHealth;

    const levelHealthElement = document.querySelector("#levelHealth");
    if(!levelHealthElement) {
      this.#levelHealthElement = document.createElement('p');
      document.body.appendChild(this.#levelHealthElement);
      this.#levelHealthElement.id = "levelHealth";
    } else {
      this.#levelHealthElement = levelHealthElement;
    }
  }

  addPlayer(playerEntity) {
    this.player = playerEntity;
  }

  addEnemy(enemyEntity) {
    this.enemies.push(enemyEntity);
  }

  onTypingComplete(results) {
    if(results.mistakes > 0) {
      this.player.lostEncounter(results.mistakes * 8); // TODO: fair damage
    }

    const correct = results.charactersTyped.length - results.mistakes;
    results.entity.encounterCompleteHandler(correct * 4); 
    if(results.entity.dead === true) {
      this.#levelHealth -= results.entity.startingHealth;
    }
    setTimeout(() => {
      this.#encounterInProgress = false
      this.checkWin();
    }, 1000);
  }
  
  update(dt) {
    this.#levelHealthElement.innerText = `Level Health: ${this.#levelHealth}`
    if(this.#encounterInProgress) return;
    if(this.player.turnTaken) { // Enemies take turns
      if(this.#enemiesNeedTurns) {
        this.enemies.forEach(enemy => enemy.takeTurn());
        this.#enemiesNeedTurns = false;
      }

      if(!Object.values(this.input.keysDown).some(key => key)) {
        this.player.turnTaken = false;
        this.#enemiesNeedTurns = true;
      }
    }
  }

  checkWin() {
    if(this.#levelHealth < 1) {
      this.game.loadNextLevel();
    }
  }

  encounterHandler(collision) {
    this.#encounterInProgress = true;
    const result = this.#typingModal.runTypingEncounter({entity: collision.entity});
  }

  render() {}
}