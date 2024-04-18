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