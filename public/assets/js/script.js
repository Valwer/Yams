// repositionnement de la navbar
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Ajoute une classe pour activer l'animation
            this.classList.add('active');
            
            // Supprime la classe après 2 secondes
            setTimeout(function() {
                link.classList.remove('active');
            }, 1000);
        });
    });
});
