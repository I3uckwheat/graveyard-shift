export class RLBaseScene {
  player;
  enemies = [];
  input;
  collidorSpace;
  #enemiesNeedTurns = false;

  constructor({player, enemies=[], input, collidorSpace}) {
    this.player = player;
    this.player.components.rlController = {};
    this.player.components.rlController.encounterHandler = this.encounterHandler.bind(this);

    this.enemies = enemies;
    this.input = input;
    this.collidorSpace = collidorSpace;
  }

  addPlayer(playerEntity) {
    this.player = playerEntity;
  }

  addEnemy(enemyEntity) {
    this.enemies.push(enemyEntity);
  }
  
  update(dt) {
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

  encounterHandler(collision) {
    debugger;
    console.log("OMG an encounter with", collision.collidorName);
  }

  render() {}
}