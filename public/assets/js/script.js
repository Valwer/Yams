// Déclaration de variables-------------
let dices = [];
let keptDices = [];
rollsLeft = 3;
//--------------------------------------

// Les sélecteurs
const diceIcon = document.getElementById("dice-icon");
const scoreCells = document.querySelectorAll(".space-col");

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
        // Appeler calculatePoint() pour chaque combinaison possible et afficher les résultats
        const combinations = ["brelan", "carre", "full", "petite_suite", "grande_suite", "yams", "chance", "cumul_1", "cumul_2", "cumul_3", "cumul_4", "cumul_5", "cumul_6"];
        combinations.forEach(combination => {
            const points = calculatePoint(combination, keptDices);
            console.log(`Points pour ${combination} : ${points}`);
        });

        
        rollsLeft--; // Réduire le nombre de lancers restants
        console.log(`Lancers restants : ${rollsLeft}`);
        console.log(keptDices);
        updateDiceDisplay(keptDices);
    } else {
        console.log("Vous avez atteint le nombre maximal de lancers pour ce tour.");
    }
}

// Fonction pour calculer le score pour une catégorie donnée
function calculateScoreForCategory(category, dices) {
    // Utilisez la fonction calculatePoint avec la catégorie et les dés pour obtenir le score
    return calculatePoint(category, dices);
}

// Calculer les points en fonction de l'opération et des dés rentrés en paramètre

function calculatePoint(operation, dices) {
    let total = 0;

    // Utilisation d'un switch pour évaluer l'opération
    switch (operation) {
        case "brelan":
            let brelan = false;
            // itération sur chaque valeur de dès possibles
            for (let i = 1; i <= 6; i++) {
                if (dices.filter(dice => dice === i).length >= 3) {
                    brelan = true;
                    break;
                }
            }
            if (brelan) {
                // Trouver les dés faisant partie du brelan
                let brelanDice = dices.filter(dice => dices.filter(d => d === dice).length >= 3);
                // Calculer le total comme la somme de tous les dés faisant partie du brelan
                total = brelanDice.reduce((acc, curr) => acc + curr, 0);
            }
            break;
        case "carre":
            let carre = false;
            for (let i = 1; i <= 6; i++) {
                if (dices.filter(dice => dice === i).length >= 4) {
                    carre = true;
                    break;
                }
            }
            if (carre) {
                // Trouver les dés faisant partie du brelan
                let carreDice = dices.filter(dice => dices.filter(d => d === dice).length >= 4);
                // Calculer le total comme la somme de tous les dés faisant partie du brelan
                total = carreDice.reduce((acc, curr) => acc + curr, 0);
            }
            break;
        case "full":
            let full = false;
            let count = Array.from({ length: 7 }, () => 0); // Initialiser un tableau de comptage pour chaque valeur de dé
            dices.forEach(dice => count[dice]++); // Compter le nombre de chaque valeur de dé
            if (count.includes(2) && count.includes(3)) {
                full = true;
                // Calculer le total comme la somme de tous les dés
                total = 25;
            }
            break;
        case "petite_suite":
            // Vérifier s'il y a une petite suite
            let smallStraight = false;
            if (new Set(dices).size >= 4 && (!dices.includes(6) || !dices.includes(1))) {
                smallStraight = true;
                total = 30;
            }
            break;
        case "grande_suite":
            // Vérifier s'il y a une grande suite
            let largeStraight = false;
            if (new Set(dices).size === 5 && (!dices.includes(6) || !dices.includes(1))) {
                largeStraight = true;
                total = 40;
            }
            break;
        case "yams":
            // Vérifier si il y a un yams
            let yams = false;
            if (new Set(dices).size === 1) {
                yams = true;
                total = 50; // La valeur d'un yams est de 50 points
            }
            break;
        case "chance":
            // Calculer le total comme la somme de tous les dés
            total = dices.reduce((acc, curr) => acc + curr, 0);
            break;
        case "cumul_1":
        case "cumul_2":
        case "cumul_3":
        case "cumul_4":
        case "cumul_5":
        case "cumul_6":
            // Calculer le total comme la somme des dés ayant la valeur correspondante
            total = dices.filter(dice => dice == parseInt(operation.split('_')[1])).reduce((acc, curr) => acc + curr, 0);
            break;
        default:
            console.log("opération non prise en charge")
    }
    return total
}



//--------------------------------------
// Script principal
arrayNumbers = [6, 1, 3, 6, 6]
console.log(calculatePoint("cumul_6", arrayNumbers))

const result = lancerDe()
console.log(lancerDe())
let newDice = rollTheDices(dices); // Appel de la fonction rollTheDices avec le tableau initial
console.log("Nouveau tableau de dés :", newDice);


// Ecouteurs
diceIcon.addEventListener("click", lancerDes); // Gestionnaire d'événement pour le bouton de relance
// Parcourir chaque cellule et ajoutez un événement de clic à chacune
scoreCells.forEach((cell) => {
    cell.addEventListener("click", function() {
        // Récupérez la catégorie de la cellule
        const category = cell.querySelector("td:first-child").textContent.trim();
        // Calculez le score pour cette catégorie
        const score = calculateScoreForCategory(category, keptDices); // Utilisez keptDices comme dés pour le calcul
        // Mettez à jour le contenu de la cellule avec le score calculé
        cell.querySelector("td:last-child").textContent = score;
        // Ajoutez la classe "filled" pour indiquer que la cellule est remplie avec un score
        cell.classList.add("filled");
    });
});
