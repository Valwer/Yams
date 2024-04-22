// Déclaration de variables-------------
let dices = [];
let keptDices = [];
let selectedCategory = false;
let nextRound = true;
rollsLeft = 3;
//--------------------------------------

// Les sélecteurs
const diceTableTop = document.getElementById("dice-table-top");
const diceIcon = document.getElementById("dice-icon");
const diceInfo = document.querySelector(".dice-info");
const scoreCells = document.querySelectorAll(".score-cell");

// --------------------------------------
//              Fonctions
// --------------------------------------

/**
 * Récupérer une valeur aléatoire
 * @returns une valeur aléatoire
 */
function getRandomValue() {
    return Math.floor(Math.random() * 6) + 1;
}

/**
 * Fonction pour réinitialiser les valeurs des dés avec de nouvelles valeurs aléatoires
 * @param {number[]} dices 
 * @returns un tableau avec des valeurs aléatoires
 */
function rollTheDices(dices = [0, 0, 0, 0, 0]) {
    let newDice = [];
    for (let i = 0; i < dices.length; i++) {
        newDice.push(getRandomValue());
    }
    return newDice;
}

/**
 * Fonction pour mettre à jour l'affichage des Dés avec les nouvelles valeurs fourni en paramètre
 * 
 * @param {number[]} dices 
 */
function updateDicesDisplay(dices) {
    dices.forEach((value, index) => {
        let dice = diceTableTop.querySelector(`.des${index}`);
        if (dice == null) {
            dice = createDiceElement(index);
        }
        dice.alt = `Dé ${value}`;
        dice.dataset.value = value;
        dice.classList.remove("selected-dice");
        animate(dice, value);
    });
}

/**
 * Fonction pour créer un élément HTML représentant un dé.
 * Le dé est ajouté au Tabletop.
 * Chaque dé a un listener sur le click pour selectionner/déselectionner
 * @param {number} index 
 * @returns Un element HTML
 */
function createDiceElement(index) {
    let dice = document.createElement("img");
    dice.classList.add("dice", `des${index}`);
    dice.addEventListener("click", function (event) {
        // Ajouter ou retirer la classe .selected-dice lorsqu'on clique sur un dé
        event.target.classList.toggle("selected-dice");
    });
    diceTableTop.appendChild(dice);
    return dice;
}

/**
 * Fonction pour animer les faces des dés
 * @param {HTMLElement} diceElement 
 * @param {number} finalDiceValue 
 */
async function animate(diceElement, finalDiceValue) {
    const numberOfRolls = 10;
    let interval = 200;
    // image initial (pour eviter le lien mort)
    diceElement.src = `./public/assets/img/icons/dices/dic${getRandomValue()}.png`;
    for (let i = numberOfRolls; i >= 0; i--) {
        if (i > 0) {
            // Afficher une image basée sur une valeur aléatoire pour simuler le roulement du dé
            // Sleep à chaque fois pour laisser le temps d'afficher chaque "pseudo" roulement
            await sleep(interval);
            let randomDisplayValue = getRandomValue();
            diceElement.src = `./public/assets/img/icons/dices/dic${randomDisplayValue}.png`;
        } else {
            // Affiche la vraie valeur qui a été retenu (fin du roulement aléatoire)
            diceElement.src = `./public/assets/img/icons/dices/dic${finalDiceValue}.png`;
        }
    }
}

/**
 * Simule un temps d'attente en ms
 * @param {number} ms 
 * @returns une promesse
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Lancer de dés
 */
function lancerDes() {
    const selectedDiceElements = document.querySelectorAll(".selected-dice");
    if (selectedDiceElements.length == 0 && !nextRound) {
        return;
    }

    if (nextRound) {
        nextRound = false;
        selectedCategory = false;
        rollsLeft = 3;
        keptDices = [];
    }

    if (rollsLeft > 0) {
        // Vérifie le nombre de lancers restants
        // Obtenir les dés sélectionnés
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
        if (selectedDiceIndexes.length == 0) {
            newDices = rollTheDices();
        } else if (selectedDiceIndexes.length > 0) {
            newDices = rollTheDices(selectedDiceIndexes);
        }

        console.log(`Nouveau lancé : ${newDices}`);
        keptDices = keptDices.concat(newDices);

        // Appeler calculatePoint() pour chaque combinaison possible et afficher les résultats
        const combinations = ["brelan", "carre", "full", "petite_suite", "grande_suite", "yams", "chance", "cumulAs", "deux", "trois", "quatre", "cinq", "six"];
        combinations.forEach(combination => {
            const points = calculatePoint(combination, keptDices);
            console.log(`Points pour ${combination} : ${points}`);
        });


        rollsLeft--; // Réduire le nombre de lancers restants
        console.log(`Lancers restants : ${rollsLeft}`);
        console.log(keptDices);
        diceInfo.innerHTML = rollsLeft;
        updateDicesDisplay(keptDices);
    } else {
        console.log("Vous avez atteint le nombre maximal de lancers pour ce tour.");
    }
}

/**
 * Calculer le score pour une catégorie donnée
 * @param {string} category 
 * @param {number[]} dices 
 * @returns 
 */
function calculateScoreForCategory(category, dices) {
    // Utilisez la fonction calculatePoint avec la catégorie et les dés pour obtenir le score
    return calculatePoint(category, dices);
}

function cumul(array, diceValue) {
    total = 0;
    array.forEach(dice => {
        if (dice === diceValue) {
            total += dice;
        }
    });
    return total
}


/**
 * Calculer les points en fonction de l'opération et des dés rentrés en paramètre
 * 
 * @param {string} operation 
 * @param {number[]} dices 
 * @returns Un score relatif à l'opération choisie
 */
function calculatePoint(operation, dices) {
    let total = 0;
    let cumulAs = false, deux = false, trois = false, quatre = false, cinq = false, six = false, brelan = false, carre = false, full = false, smallStraight = false, largeStraight = false, yams = false;
    let scoreToAdd = 0;

    // Utilisation d'un switch pour évaluer l'opération
    switch (operation) {
        case "cumulAs":
            total = cumul(dices, 1);
            break;
        case "deux":
            total = cumul(dices, 2);
            break;
        case "trois":
            total = cumul(dices, 3);
            break;
        case "quatre":
            total = cumul(dices, 4);
            break;
        case "cinq":
            total = cumul(dices, 5);
            break;
        case "six":
            total = cumul(dices, 6);
            break;
        case "brelan":
            for (let i = 1; i <= 6; i++) {
                if (dices.filter(dice => dice === i).length >= 3) {
                    brelan = true;
                    scoreToAdd = dices.filter(dice => dice === i).reduce((acc, curr) => acc + curr, 0);
                    break;
                }
            }
            if (brelan) {
                total = scoreToAdd;
            }
            break;
        case "carre":
            for (let i = 1; i <= 6; i++) {
                if (dices.filter(dice => dice === i).length >= 4) {
                    carre = true;
                    scoreToAdd = dices.filter(dice => dice === i).reduce((acc, curr) => acc + curr, 0);
                    break;
                }
            }
            if (carre) {
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
                total = scoreToAdd;
            }
            break;
        case "petite_suite":
            if (dices.includes(1) && dices.includes(2) && dices.includes(3) && dices.includes(4) && dices.includes(5)) {
                smallStraight = true;
                scoreToAdd = 30;
            }
            if (smallStraight) {
                total = scoreToAdd;
            }
            break;
        case "grande_suite":
            if (dices.includes(2) && dices.includes(3) && dices.includes(4) && dices.includes(5) && dices.includes(6)) {
                largeStraight = true;
                scoreToAdd = 40;
            }
            if (largeStraight) {
                total = scoreToAdd;
            }
            break;
        case "yams":
            if (new Set(dices).size === 1) {
                yams = true;
                scoreToAdd = 50;
            }
            if (yams) {
                total = scoreToAdd;
            }
            break;
        case "chance":
            scoreToAdd = dices.reduce((acc, curr) => acc + curr, 0);
            total = scoreToAdd;
            break;
        default:
            console.log("opération non prise en charge");
            return 0;
    }
    console.log(`Score pour ${operation}: ${total}`);
    console.log(`Total général: ${categoriesScores.getGlobalScore()}`);
    return total;
}

/**
 * Ajouter le score dans l'objet des scores
 * @param {string} categorie 
 * @param {number} score 
 */
function ajouterScore(categorie, score) {
    if (categoriesScores.hasOwnProperty(categorie)) {
        categoriesScores[categorie] = score;
    } else {
        console.error("Catégorie non valide");
    }
}
/**
 * Actualise le jeu
 */
function refreshGame() {
    refreshTableScores();
    //TODO: Ici rajouter l'appel à la méthode IsAllCompleted de l'objet
    // Et conditionner l'affichage ou non du score 
}

/**
 * Actualise le tableau des scores
 */
function refreshTableScores() {
    const uncategorizedTotal = document.querySelector("#uncategorized-total");
    const bonus = document.querySelector("#uncategorized-bonus");
    const uncategorizedTotalWithBonus = document.querySelector("#uncategorized-full");
    const categorizedTotal = document.querySelector("#categorized-total");
    const globalScore = document.querySelector("#global-score");

    uncategorizedTotal.innerHTML = categoriesScores.getUncategorizedTotal();
    bonus.innerHTML = categoriesScores.getBonus();
    uncategorizedTotalWithBonus.innerHTML = categoriesScores.getUncategorizedTotalWithBonus();
    categorizedTotal.innerHTML = categoriesScores.getCategorizedTotal();
    globalScore.innerHTML = categoriesScores.getGlobalScore();
}

// Déclaration Objet conteneur des scores
let categoriesScores = {
    cumulAs: null,
    deux: null,
    trois: null,
    quatre: null,
    cinq: null,
    six: null,
    brelan: null,
    carre: null,
    full: null,
    petiteSuite: null,
    grandeSuite: null,
    yams: null,
    chance: null,

    getBonus: function () {
        console.log(this);
        const uncategorizedTotal = this.getUncategorizedTotal();
        if (uncategorizedTotal > 63) {
            return 35;
        }

        return 0;
    },
    getUncategorizedTotal: function () {
        return this.cumulAs + this.deux + this.trois + this.quatre + this.cinq + this.six;
    },
    getUncategorizedTotalWithBonus: function () {
        return this.getUncategorizedTotal() + this.getBonus();
    },
    getCategorizedTotal: function () {
        return this.brelan + this.carre + this.full + this.petiteSuite + this.grandeSuite + this.yams + this.chance;
    },
    getGlobalScore: function () {
        return this.getUncategorizedTotalWithBonus() + this.getCategorizedTotal();
    },
    isAllCompleted: function () {
        // Verifier si toutes propriétés sont différentes de null alors on a fini (true) sinon non (false)
        return false;
    }
};

//--------------------------------------
//          Script principal
//--------------------------------------
diceInfo.innerHTML = rollsLeft;
let newDices = rollTheDices(dices); // Appel de la fonction rollTheDices avec le tableau initial

// Ecouteurs
diceIcon.addEventListener("click", lancerDes); // Gestionnaire d'événement pour le bouton de relance

// Parcourir chaque cellule et ajoutez un événement de clic à chacune
scoreCells.forEach((cell) => {
    cell.addEventListener("mouseenter", function () {
        if (cell.classList.contains("filled") || selectedCategory || nextRound) {
            return;
        }

        // Récupérez la catégorie de la cellule
        const category = cell.dataset.category;
        // Calculez le score pour cette catégorie
        const score = calculateScoreForCategory(category, keptDices); // Utilisez keptDices comme dés pour le calcul

        // Mettez à jour le contenu de la cellule avec le score calculé (uniquement affichage ici)
        cell.innerHTML = score;
        cell.dataset.value = score;
    });
    cell.addEventListener("mouseout", function () {

        // Si l'utilisateur a choisi cette case (click), on evite de supprimer son contenu
        if (cell.classList.contains("filled")) {
            return;
        }

        cell.innerHTML = "";
        delete cell.dataset.value;
    });
    cell.addEventListener("click", (event) => {
        // Si la case est déjà rempli précédemment ou que la catégorie a déjà été selectionné sur cette manche
        // On ne continue pas
        if (cell.classList.contains("filled") || selectedCategory) {
            return;
        }

        // Indicateur permet d'identifier si l'utilisateur a déjà selectionné une catégorie sur ce tour
        selectedCategory = true;
        const category = cell.dataset.category;
        // Ajout du score dans l'objet des scores
        categoriesScores[category] = Number(cell.dataset.value);
        // Ajout de la classe pour eviter l'affichage/calcul superflu
        cell.classList.add("filled");
        cell.innerHTML = categoriesScores[category];
        rollsLeft = 3
        diceInfo.innerHTML = rollsLeft;

        // On indique que la prochaine manche sera une nouvelle
        // Afin de pouvoir réinitialiser les tentatives
        nextRound = true;
        refreshGame();
    })
});


// TODO: Identifier quand le jeu est terminé et afficher le score du joueur en conséquence
// TODO: (Fait ?) Rajouter le controle de séléction des dés pour éviter d'incrémenter le compteur de lancement de dés lorsqu'il n'y a aucune selection du joueur
// TODO: Revoir l'animation, le refresh reactulise l'affichage tout les dés même les non selectionnés

