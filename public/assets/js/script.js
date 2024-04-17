// // repositionnement de la navbar
// document.addEventListener('DOMContentLoaded', function() {
//     const navLinks = document.querySelectorAll('nav ul li');

//     navLinks.forEach(function(link) {
//         link.addEventListener('click', function() {
//             // Ajoute une classe pour activer l'animation
//             this.classList.add('active');

//             // Supprime la classe après 2 secondes
//             setTimeout(function() {
//                 link.classList.remove('active');
//             }, 1000);
//         });
//     });
// });

const lancerDe = function () {
    const numberDecimal = (Math.random() * 6) + 1
    const number = Math.trunc(numberDecimal)
    return number
};

 
const result = lancerDe()

console.log(lancerDe())