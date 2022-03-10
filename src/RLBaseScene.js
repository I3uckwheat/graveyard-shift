export class RLBaseScene {
  player;
  enemies = [];
  input;
  #enemiesNeedTurns = false;

  constructor({player, enemies=[], input}) {
    this.player = player;
    this.enemies = enemies;
    this.input = input;
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

  render() {}
}