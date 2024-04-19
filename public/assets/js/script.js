// Déclaration de variables-------------
let dices = [];
let keptDices = [];
rollsLeft = 3;
//--------------------------------------

// Les sélecteurs
const diceIcon = document.getElementById("dice-icon");

// Toutes les Fonctions-------------

function openModal() {
    const rulesButton = document.getElementById('rulesButton'); // Utilisation de l'ID 'rulesButton'
    const restartButton = document.getElementById('restartButton'); // Utilisation de l'ID 'rulesButton'
    const infoButton = document.getElementById('infoButton'); // Utilisation de l'ID 'rulesButton'
    const rulesModal = new bootstrap.Modal(document.getElementById('rulesModal')); // Créer une instance de la modal Bootstrap
    const restartModal = new bootstrap.Modal(document.getElementById('restartModal')); // Créer une instance de la modal Bootstrap
    const infoModal = new bootstrap.Modal(document.getElementById('infoModal')); // Créer une instance de la modal Bootstrap


    rulesButton.addEventListener('click', function() {
        rulesModal.show(); // Afficher la modal lorsque le bouton est cliqué
    });
    restartButton.addEventListener('click', function() {
        restartModal.show(); // Afficher la modal lorsque le bouton est cliqué
    });
    infoButton.addEventListener('click', function() {
        infoModal.show(); // Afficher la modal lorsque le bouton est cliqué
    });
}

const lancerDe = function () {
    const numberDecimal = (Math.random() * 6) + 1
    const number = Math.trunc(numberDecimal)
    return number
};

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
            setTimeout(function() {
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

function lancerDes() {
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
}
//--------------------------------------

// Script principal
const result = lancerDe()
console.log(lancerDe())
let newDice = rollTheDices(dices); // Appel de la fonction rollTheDices avec le tableau initial
console.log("Nouveau tableau de dés :", newDice);


// Ecouteurs
document.addEventListener('DOMContentLoaded', openModal);
diceIcon.addEventListener("click", lancerDes); // Gestionnaire d'événement pour le bouton de relance
