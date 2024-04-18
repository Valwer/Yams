let dices = [];
let keptDices = [];
rollsLeft = 3;

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

// Fonction pour mettre à jour l'affichage des dés
function updateDiceDisplay(dice) {
    const diceContainer = document.querySelector('.gameZone');
    diceContainer.innerHTML = '';
    dice.forEach((value, index) => {
        const diceElement = document.createElement('div');
        diceElement.classList.add('face');
        diceElement.classList.add('face' + value);
        diceElement.classList.remove('d-none');
        diceElement.textContent = value;
        diceElement.addEventListener('click', function() {
            // Ajouter ou retirer la classe .selected-dice lorsqu'on clique sur un dé
            diceElement.classList.toggle('selected-dice');
        });
        diceContainer.appendChild(diceElement);
    });
}



// Gestionnaire d'événement pour le bouton de relance
const diceIcon = document.getElementById('dice-icon');
diceIcon.addEventListener('click', function() {
    if (rollsLeft > 0) { // Vérifie le nombre de lancers restants
        // Obtenir les dés sélectionnés
        const selectedDiceElements = document.querySelectorAll('.selected-dice');
        const selectedDiceIndexes = Array.from(selectedDiceElements).map(element => parseInt(element.textContent));
        console.log(`Dès initiaux : ${keptDices}`);
        // Supprimer les dés sélectionnés de keptDices
        selectedDiceIndexes.forEach(el => {
            foundedIndex = keptDices.indexOf(el);
            keptDices.splice(foundedIndex,1);
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

