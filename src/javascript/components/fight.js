import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    let healthSecond = 100,
      healthFirst = 100,
      defenceOne = firstFighter.defense,
      defenceTwo = secondFighter.defense;

    let Winner;

    document.addEventListener('keyup', (event) => {
      const keyName = event.code;

      if (keyName === controls.PlayerOneAttack) {

        const damage = getDamage(firstFighter, secondFighter);
        firstFighter.defense = defenceOne;

        healthSecond = healthSecond - ((damage * 100) / secondFighter.health);

        if (healthSecond < 0) {
          healthSecond = 0;
        }

        document.getElementById('right-fighter-indicator').style.width = `${healthSecond}%`;

      }

      if (keyName === controls.PlayerTwoAttack) {

        const damage = getDamage(secondFighter, firstFighter);
        secondFighter.defense = defenceTwo;
        healthFirst = healthFirst - ((damage * 100) / firstFighter.health);

        if (healthFirst < 0) {
          healthFirst = 0;
        }

        document.getElementById('left-fighter-indicator').style.width = `${healthFirst}%`;

      }
      
      if (healthSecond === 0) {
        Winner = firstFighter;
        resolve(Winner);

      }
      if (healthFirst === 0) {
        Winner = secondFighter;
        resolve(Winner);
      }
    });

    document.addEventListener('keydown', (event) => {
      const keyName = event.code;

      if (keyName === controls.PlayerOneBlock) {
        firstFighter.defense = 100;
      }

      if (keyName === controls.PlayerTwoBlock) {
        secondFighter.defense = 100;
      }
    });

    let CriticalKeyOne = new Map();
    let CriticalKeyTwo = new Map();
    let CanCriticalOne = true;
    let CanCriticalTwo = true;


    document.addEventListener('keydown', (event) => {


      if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
        CriticalKeyOne.set(event.code, true);

        if (CriticalKeyOne.get('KeyQ') && CriticalKeyOne.get('KeyW') && CriticalKeyOne.get('KeyE')) {

          CriticalKeyOne.set('KeyQ', false) && CriticalKeyOne.set('KeyW', false) && CriticalKeyOne.set('KeyE', false);

          if (CanCriticalOne) {
            CanCriticalOne = false;

            let damage = firstFighter.attack * 2;
            healthSecond = healthSecond - ((damage * 100) / secondFighter.health);
            if (healthSecond < 0) {
              healthSecond = 0;
            }

            document.getElementById('right-fighter-indicator').style.width = `${healthSecond}%`;
          }

          setTimeout(() => {
            CanCriticalOne = true;
          }, 10000);
        }


      }

      if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
        CriticalKeyTwo.set(event.code, true);

        if (CriticalKeyTwo.get('KeyU') && CriticalKeyTwo.get('KeyI') && CriticalKeyTwo.get('KeyO')) {

          CriticalKeyTwo.set('KeyU', false) && CriticalKeyTwo.set('KeyI', false) && CriticalKeyTwo.set('KeyO', false);

          if (CanCriticalTwo) {
            CanCriticalTwo = false;

            let damage = secondFighter.attack * 2;
            healthFirst = healthFirst - ((damage * 100) / firstFighter.health);
            if (healthFirst < 0) {
              healthFirst = 0;
            }

            document.getElementById('left-fighter-indicator').style.width = `${healthFirst}%`;
          }

          setTimeout(() => {
            CanCriticalTwo = true;
          }, 10000);
        }
      }
    });
  });
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  return fighter.attack * (Math.random() + 1);
}

export function getBlockPower(fighter) {
  return fighter.defense * (Math.random() + 1);
}
