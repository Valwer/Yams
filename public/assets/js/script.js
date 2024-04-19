// Déclaration de variables-------------
let dices = [];
let keptDices = [];
rollsLeft = 3;
//--------------------------------------

// Les sélecteurs
const diceIcon = document.getElementById("dice-icon");

// Toutes les Fonctions-------------

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

function lancerDes() {
    if (rollsLeft > 0) {
        // Vérifie le nombre de lancers restants
        // Obtenir les dés sélectionnés
        const selectedDiceElements = document.querySelectorAll(".selected-dice");
        const selectedDiceIndexes = Array.from(selectedDiceElements).map(
            (element) => parseInt(element.dataset.value)
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

// Calculer les points en fonction de l'opération et des dés rentrés en paramètre

function calculatePoint(operation, dices) {
    let total = 0;
    let brelan = false, carre = false, full = false, smallStraight = false, largeStraight = false, yams = false;
    let scoreToAdd = 0;

    // Utilisation d'un switch pour évaluer l'opération
    switch (operation) {
        case "brelan":
            for (let i = 1; i <= 6; i++) {
                if (dices.filter(dice => dice === i).length >= 3) {
                    brelan = true;
                    scoreToAdd = dices.filter(dice => dice === i).reduce((acc, curr) => acc + curr, 0);
                    break;
                }
            }
            if (brelan) {
                categoriesScores.Brelan.push(scoreToAdd);
                total = scoreToAdd;
            }
            break;
        case "carré":
            for (let i = 1; i <= 6; i++) {
                if (dices.filter(dice => dice === i).length >= 4) {
                    carre = true;
                    scoreToAdd = dices.filter(dice => dice === i).reduce((acc, curr) => acc + curr, 0);
                    break;
                }
            }
            if (carre) {
                categoriesScores.Carré.push(scoreToAdd);
                total = scoreToAdd;
            }
            break;
        case "full":
            let count = Array.from({ length: 7 }, () => 0);
            dices.forEach(dice => count[dice]++);
            if (count.includes(2) && count.includes(3)) {
                full = true;
                scoreToAdd = 25;
            }
            if (full) {
                categoriesScores.Full.push(scoreToAdd);
                total = scoreToAdd;
            }
            break;
        case "petite_suite":
            if (new Set(dices).size >= 4 && (!dices.includes(6) || !dices.includes(1))) {
                smallStraight = true;
                scoreToAdd = 30;
            }
            if (smallStraight) {
                categoriesScores.PetiteSuite.push(scoreToAdd);
                total = scoreToAdd;
            }
            break;
        case "grande_suite":
            if (new Set(dices).size === 5 && (!dices.includes(6) || !dices.includes(1))) {
                largeStraight = true;
                scoreToAdd = 40;
            }
            if (largeStraight) {
                categoriesScores.GrandeSuite.push(scoreToAdd);
                total = scoreToAdd;
            }
            break;
        case "yams":
            if (new Set(dices).size === 1) {
                yams = true;
                scoreToAdd = 50;
            }
            if (yams) {
                categoriesScores.Yams.push(scoreToAdd);
                total = scoreToAdd;
            }
            break;
        case "chance":
            scoreToAdd = dices.reduce((acc, curr) => acc + curr, 0);
            categoriesScores.Chance.push(scoreToAdd);
            total = scoreToAdd;
            break;
        default:
            console.log("opération non prise en charge");
            return;
    }
    console.log(`Score pour ${operation}: ${total}`);
    console.log(`Total général: ${categoriesScores.getTotal()}`);
    return total;
}

//--------------------------------------
// Script principal

const result = lancerDe()
console.log(lancerDe())
let newDice = rollTheDices(dices); // Appel de la fonction rollTheDices avec le tableau initial
console.log("Nouveau tableau de dés :", newDice);


// Ecouteurs
diceIcon.addEventListener("click", lancerDes); // Gestionnaire d'événement pour le bouton de relance

// Objet yamsScores contenant des tableaux

let yamsScores = {
    As: null,
    Deux: null,
    Trois: null,
    Quatre: null,
    Cinq: null,
    Six: null,
    Total: null,
    Bonus: null,
    Total1: null,
    Brelan: null,
    Carré: null,
    Full: null,
    PetiteSuite: null,
    GrandeSuite: null,
    Yams: null,
    Chance: null,
    Total2: null,
    Score: null,

    getTotal: function () {
        let total = 0;
        for (let key in this) {
            if (Array.isArray(this[key])) {
                total += this[key].reduce((acc, val) => acc + val, 0);
            }
        }
        return total;
    }
};

function ajouterScore(categorie, score) {
    if (yamsScores.hasOwnProperty(categorie)) {
        yamsScores[categorie].push(score);
    } else {
        console.error("Catégorie non valide");
    }
}

// Ajouter des scores aux catégories
ajouterScore("Brelan", 25);

// Afficher le score total
console.log("Score Total:", yamsScores.getTotal());

