let dices = [];
let keptDices = [];
rollsLeft = 3;

document.addEventListener('DOMContentLoaded', function () {
    const rulesButton = document.getElementById('rulesButton'); // Utilisation de l'ID 'rulesButton'
    const restartButton = document.getElementById('restartButton'); // Utilisation de l'ID 'rulesButton'
    const infoButton = document.getElementById('infoButton'); // Utilisation de l'ID 'rulesButton'
    const rulesModal = new bootstrap.Modal(document.getElementById('rulesModal')); // Créer une instance de la modal Bootstrap
    const restartModal = new bootstrap.Modal(document.getElementById('restartModal')); // Créer une instance de la modal Bootstrap
    const infoModal = new bootstrap.Modal(document.getElementById('infoModal')); // Créer une instance de la modal Bootstrap


    rulesButton.addEventListener('click', function () {
        rulesModal.show(); // Afficher la modal lorsque le bouton est cliqué
    });
    restartButton.addEventListener('click', function () {
        restartModal.show(); // Afficher la modal lorsque le bouton est cliqué
    });
    infoButton.addEventListener('click', function () {
        infoModal.show(); // Afficher la modal lorsque le bouton est cliqué
    });
});

const lancerDe = function () {
    const numberDecimal = (Math.random() * 6) + 1
    const number = Math.trunc(numberDecimal)
    return number
};


const result = lancerDe()

console.log(lancerDe())


// Fonction pour simuler le lancer de dés
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Fonction pour animer le lancer de dés
function animateRoll() {
    let diceElement = document.getElementById('dice');
    let rolls = 10; // Nombre de lancers de dés
    let interval = 200; // Intervalle de temps entre chaque lancer en millisecondes

    // Fonction récursive pour mettre à jour l'affichage des dés à chaque lancer
    function animate() {
        rolls--;
        if (rolls >= 0) {
            setTimeout(function () {
                let result = rollDice();
                diceElement.src = `./public/assets/img/icons/dices/dic${result}.png`;
                animate();
            }, interval);
        } else {
            // Lorsque tous les lancers sont terminés, afficher le résultat final
            let result = rollDice();
            diceElement.src = `./public/assets/img/icons/dices/dic${result}.png`;
        }
    }

    // Lancer l'animation
    animate();
}



// Fonction pour simuler le lancer d'un dé
function getRandomValue() {
    return Math.floor(Math.random() * 6) + 1;
}

// Fonction pour réinitialiser les valeurs des dés avec de nouvelles valeurs aléatoires
function rollTheDices(dice = [0, 0, 0, 0, 0], selectedIndexes) {
    let newDice = [];
    for (let i = 0; i < dice.length; i++) {
        newDice.push(getRandomValue());
    }
    return newDice;
}

function updateDiceDisplay(dice) {
    // Sélectionner l'élément HTML qui contient les dés
    const diceContainer = document.querySelector("#dice");

    // Nettoyer le contenu précédent
    diceContainer.innerHTML = "";
    dice.forEach((value, index) => {
        let diceElement = `<img class="dice des${index}" src="./public/assets/img/icons/dices/dic${value}.png" alt="Dé" data-value="${value}" />`;
        diceContainer.innerHTML += diceElement;
    });

  selectedDices = document.querySelectorAll(".dice");

  selectedDices.forEach((selectedDice) => {
    selectedDice.addEventListener("click", function () {
      // Ajouter ou retirer la classe .selected-dice lorsqu'on clique sur un dé
      selectedDice.classList.toggle("selected-dice");
    });
  });
}

// Gestionnaire d'événement pour le bouton de relance
const diceIcon = document.getElementById("dice-icon");
diceIcon.addEventListener("click", function () {
  if (rollsLeft > 0) {
    // Vérifie le nombre de lancers restants
    // Obtenir les dés sélectionnés
    const selectedDiceElements = document.querySelectorAll(".selected-dice");
    const selectedDiceIndexes = Array.from(selectedDiceElements).map(
      (element) => parseInt(element.textContent)
    );
    console.log(`Dès initiaux : ${keptDices}`);
    // Supprimer les dés sélectionnés de keptDices
    selectedDiceIndexes.forEach((el) => {
      foundedIndex = keptDices.indexOf(el);
      keptDices.splice(foundedIndex, 1);
    });
    console.log(`Dès après suppression : ${keptDices}`);
    console.log(selectedDiceIndexes);
    // Vérifier si aucun dé n'est sélectionné
    if (selectedDiceIndexes.length == 0 && keptDices.length < 5) {
      newDices = rollTheDices();
      console.log(newDices);
      keptDices = keptDices.concat(newDices);
    } else if (selectedDiceIndexes.length > 0) {
      newDices = rollTheDices(selectedDiceIndexes);
      console.log(`Nouveau lancé : ${newDices}`);
      keptDices = keptDices.concat(newDices);
    }
    rollsLeft--; // Réduire le nombre de lancers restants
    console.log(`Lancers restants : ${rollsLeft}`);
    console.log(keptDices);
    updateDiceDisplay(keptDices);
} else {
    console.log("Vous avez atteint le nombre maximal de lancers pour ce tour.");
}
});

let newDice = rollTheDices(dices); // Appel de la fonction rollTheDices avec le tableau initial
console.log("Nouveau tableau de dés :", newDice);

// afficher le cumul des 1

let total = 0;
keptDices.forEach((dice) => {
    if (dice === 1) {
        total += dice;
    }
});
console.log("Total des dés 1 : " + total);

// afficher le cumul des 4

total = 0;
keptDices.forEach((dice) => {
    if (dice === 4) {
        total += 1;
    }
});
console.log("Total des dés 4 : " + total);

// afficher le cumul des 5

total = 0;
keptDices.forEach((dice) => {
    if (dice === 5) {
        total += 1;
    }
});

console.log("Total des dés 5 : " + total);

// afficher le cumul des 6

total = 0;
keptDices.forEach((dice) => {
    if (dice === 6) {
        total += 1;
    }
});
console.log("total des dés 6 :" + total);

// afficher le cumul des 3

total = 0;
keptDices.forEach((dice) => {
    if (dice === 3) {
        total += 1;
    }
});
console.log("Total des dés 3 : " + total);

// afficher le cumul des 2

function cumul(array, diceValue) {
  total = 0;
  array.forEach((dice) => {
    if (dice === diceValue) {
      total += dice;
    }
  });
  console.log("Total des dés : " + total);
}
cumul(keptDices, 4);

function calculate(diceRolls) {
  const diceCounts = {};

  // Compter les occurrences de chaque valeur de dé
  diceRolls.forEach((diceValue) => {
    if (diceCounts[diceValue]) {
      diceCounts[diceValue]++;
    } else {
      diceCounts[diceValue] = 1;
    }
  });

  // Vérifier s'il y a un brelan
  for (let value in diceCounts) {
    if (diceCounts[value] === 3) {
      console.log("Brelan");
      return;
    }
  }

  console.log("Pas de brelan");
}

// Exemple d'utilisation
calculate([3, 3, 3, 1, 4]); // Affichera "Brelan"
