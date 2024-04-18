// Fonction pour simuler le lancer d'un dé
function getRandomValue() {

    return Math.floor(Math.random() * 6) + 1;
}

// Fonction rollTheDices : Réinitialise les valeurs des dés avec de nouvelles valeurs aléatoires
function rollTheDices(dice = [0, 0, 0, 0, 0]) {
    // Créer un nouveau tableau pour stocker les nouvelles valeurs des dés
    let newDice = [];

    // Parcourir le tableau de dés initial
    for (let i = 0; i < dice.length; i++) {
        newDice.push(getRandomValue());
    }

    return newDice;
}
// console.log(rollTheDices([1,3,5]));

function displayDice(dice) {
    // Sélectionner l'élément HTML qui contient les dés
    const diceContainer = document.querySelector('#dice');

    // Nettoyer le contenu précédent
    diceContainer.innerHTML = '';

    // Parcourir le tableau de dés
    dice.forEach((value, index) => {
        // Créer un élément pour représenter le dé
        const diceElement = document.createElement('div');
        diceElement.classList.add('face');
        diceElement.classList.add('face' + value); // Ajouter une classe pour représenter la face du dé
        diceElement.textContent = value; // Afficher la valeur du dé
        diceContainer.appendChild(diceElement); // Ajouter le dé au conteneur des dés
    });
}

// Exemple d'utilisation de la fonction displayDice
const dice = rollTheDices(); // Exemple de tableau de dés
displayDice(dice); // Appel de la fonction pour afficher les dés sur la page

let resultatDes = rollTheDices();
console.log("Résultats des lancers des dés :", resultatDes);


let newDice = rollTheDices(dice); // Appel de la fonction rollTheDices avec le tableau initial
console.log("Nouveau tableau de dés :", newDice);

// Opérations pour les points
let diceValue;
// Fonction pour calculer les totaux pour chaque valeur de dé
function calculateTotalForDiceValue(diceResults, diceValue) {
    return diceResults.filter(value => value === diceValue).length * diceValue;
}

// Simuler le lancer des dés, afficher les résultats, et calculer les totaux
let diceResults = rollTheDices();
displayDice(diceResults);
console.log("Résultats des lancers des dés :", diceResults);

// Afficher les totaux pour chaque valeur de dé de 1 à 6
Array.from({ length: 6 }, (_, i) => i + 1).forEach(value => {
    console.log(`Total pour les dés de valeur ${value}:`, calculateTotalForDiceValue(diceResults, value));
});

if (diceResults.includes((diceValue === diceValue) * 3)) {
    console.log('Brelan')

}