document.addEventListener('DOMContentLoaded', function() {
    const rulesButton = document.getElementById('rulesButton'); // Utilisation de l'ID 'rulesButton'
    const restartButton = document.getElementById('restartButton'); // Utilisation de l'ID 'rulesButton'
    const modal = new bootstrap.Modal(document.getElementById('rulesModal')); // Créer une instance de la modal Bootstrap
    const modaal = new bootstrap.Modal(document.getElementById('restartModal')); // Créer une instance de la modal Bootstrap


    rulesButton.addEventListener('click', function() {
        modal.show(); // Afficher la modal lorsque le bouton est cliqué
    });
    restartButton.addEventListener('click', function() {
        modaal.show(); // Afficher la modal lorsque le bouton est cliqué
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

let keptDices = [3, 1, 4, 4, 4];


// afficher le cumul des 1

let total = 0;
keptDices.forEach(dice => {
    if (dice === 1) {
        total += dice;
    }
});
console.log('Total des dés 1 : ' + total);

// afficher le cumul des 4

total = 0;
keptDices.forEach(dice => {
    if (dice === 4) {
        total += 1;
    }
})
console.log('Total des dés 4 : ' + total);

// afficher le cumul des 5

total = 0;
keptDices.forEach(dice => {
    if (dice === 5) {
        total += 1;
    }
})

console.log('Total des dés 5 : ' + total);

// afficher le cumul des 6

total = 0;
keptDices.forEach(dice => {
    if (dice === 6) {
        total += 1;
    }
})
console.log('total des dés 6 :' + total)

// afficher le cumul des 3

total = 0;
keptDices.forEach(dice => {
    if (dice === 3) {
        total += 1;
    }
});
console.log('Total des dés 3 : ' + total);

// afficher le cumul des 2


function cumul(array, diceValue) {
    total = 0;
    array.forEach(dice => {
        if (dice === diceValue) {
            total += dice;
        }
    });
    console.log('Total des dés : ' + total);
}
cumul(keptDices, 4)

function calculate(diceRolls) {
    const diceCounts = {};

    // Compter les occurrences de chaque valeur de dé
    diceRolls.forEach(diceValue => {
        if (diceCounts[diceValue]) {
            diceCounts[diceValue]++;
        } else {
            diceCounts[diceValue] = 1;
        }
    });

    // Vérifier s'il y a un brelan
    for (let value in diceCounts) {
        if (diceCounts[value] === 3) {
            console.log('Brelan');
            return;
        }
    }

    // Lancer l'animation
    animate();
}

