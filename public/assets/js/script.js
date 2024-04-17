// Fonction pour simuler le lancer d'un dé
function lancerDe() {

    return Math.floor(Math.random() * 6) + 1;
}

// Fonction pour simuler un lancer de tous les dés
function lancerDes() {
    let resultats = [];

    // Effectuer 5 lancers de dés et stocker les résultats dans le tableau
    for (let i = 0; i < 5; i++) {
        resultats.push(lancerDe());
    }

    // Retourner le tableau contenant les résultats des lancers
    return resultats;
}


// Fonction ReRollTheDice : Réinitialise les valeurs des dés avec de nouvelles valeurs aléatoires
function ReRollTheDice(dice) {
    // Créer un nouveau tableau pour stocker les nouvelles valeurs des dés
    let newDice = [];

    // Parcourir le tableau de dés initial
    for (let i = 0; i < dice.length; i++) {
        let newDiceValue = Math.floor(Math.random() * 6) + 1;
        newDice.push(newDiceValue);
    }

    return newDice;
}

function displayDice(dice) {
    // Sélectionner l'élément HTML qui contient les dés
    const diceContainer = document.querySelector('.gameZone');

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
const dice = lancerDes(); // Exemple de tableau de dés
displayDice(dice); // Appel de la fonction pour afficher les dés sur la page

let resultatDes = lancerDes();
console.log("Résultats des lancers des dés :", resultatDes);


let newDice = ReRollTheDice(dice); // Appel de la fonction ReRollTheDice avec le tableau initial
console.log("Nouveau tableau de dés :", newDice);








