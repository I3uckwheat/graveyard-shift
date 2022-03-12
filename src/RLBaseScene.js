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
  #points = 0;

  constructor({player, enemies=[], input, collidorSpace, game}) {
    this.player = player;
    this.player.components.rlController = {};
    this.player.components.rlController.encounterHandler = this.encounterHandler.bind(this);

    this.enemies = enemies;
    this.input = input;
    this.collidorSpace = collidorSpace;

    this.#typingModal = new TypingModal({onComplete: this.onTypingComplete.bind(this)});
    this.game = game;
  }

  addPlayer(playerEntity) {
    this.player = playerEntity;
  }

  addEnemy(enemyEntity) {
    this.enemies.push(enemyEntity);
  }

  onTypingComplete(results) {
    console.log(results);
    if(results.mistakes > 0) {
      this.player.lostEncounter(results.mistakes * 5); // TODO: fair damage
    }

    const correct = results.charactersTyped.length - results.mistakes;
    results.entity.entity.encounterCompleteHandler(correct * 4); 
    if(results.entity.entity.dead === true) {
      this.#points += results.entity.entity.points;
    }
    setTimeout(() => {
      this.#encounterInProgress = false
      this.checkWin();
    }, 1000);
  }
  
  update(dt) {
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
    if(this.#points >= 1) {
      this.game.loadNextLevel();
    }
  }

  encounterHandler(collision) {
    this.#encounterInProgress = true;
    const result = this.#typingModal.runTypingEncounter({entity: collision.entity});
  }

  render() {}
}