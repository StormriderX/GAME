const ATTACK = 10;
const ENEMY_ATTACK = 14;
const STRONG_ATTACK = 17;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_ATTACK = 'ATTACK';
const LOG_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_PLAYER_WIN = 'PLAYER WINS';
const LOG_ENEMY_WON = 'ENEMY WINS';

let maxHp = 100; //to be changed in prompt;
let playerHp = maxHp;
let enemyHp = maxHp;
let bonusLife = true;
let entryLogs = [];

adjustHealthBars(maxHp);

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', logHandler);

attackBtn.addEventListener('touchstart', attackHandler);

function writeToLog(ev, val) {
  const logs = {
    event: ev,
    value: val
  };
  entryLogs.push(logs);
  console.log(entryLogs);
}

function reset() {
  resetGame(maxHp);
  playerHp = maxHp;
  enemyHp = maxHp;
}

function consumeBonusLife() {
  if (playerHp <= 0 && enemyHp > 0 && bonusLife) {
    alert('Bonus life has saved you!');
    removeBonusLife();
    increasePlayerHealth(HEAL_VALUE);
    playerHp += HEAL_VALUE;
    bonusLife = false;
  }
}

function endTurn() {
  const damageDealtByEnemy = dealPlayerDamage(ENEMY_ATTACK);
  playerHp -= damageDealtByEnemy;
}

function healPlayer() {
  let healValue = HEAL_VALUE;
  if (playerHp >= 80 && playerHp < 100) {
    healValue = maxHp - playerHp;
    increasePlayerHealth(healValue);
    playerHp += healValue;
    endTurn();
  } else if (playerHp === 100) {
    alert('Max hp already reached');
    endTurn();
  } else {
    increasePlayerHealth(healValue);
    playerHp += healValue;
    console.log(playerHp);
    endTurn();
    console.log(playerHp);
  }
}

function winCondition() {
  if (bonusLife === false && playerHp <= 0) {
    alert('You lost!');
    reset();
  } else if (enemyHp <= 0 && playerHp > 0) {
    alert('You have won!');
    reset();
  } else if (playerHp <= 0 && enemyHp <= 0) {
    alert('Draw');
    reset();
  }
  consumeBonusLife();
}

function attack(mode) {
  const damageDealtByEnemy = dealPlayerDamage(ENEMY_ATTACK);
  if (mode === ATTACK) {
    const damageDealtByPlayer = dealMonsterDamage(ATTACK);
    enemyHp -= damageDealtByPlayer;
    writeToLog(LOG_ATTACK, damageDealtByPlayer);
  } else {
    const cryticalDamageDealt = dealMonsterDamage(STRONG_ATTACK);
    enemyHp -= cryticalDamageDealt;
  }
  playerHp -= damageDealtByEnemy;
  winCondition();
}

function attackHandler() {
  attack(ATTACK);
}

function strongAttackHandler() {
  attack(ENEMY_ATTACK);
}

function healHandler() {
  healPlayer();
}
