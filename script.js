// wachten op het laden
document.addEventListener('DOMContentLoaded', function () {
    // Selecteer de hoofdcontent element
    const mainContent = document.querySelector('.main-content');

    // Verberg de hoofdcontent door opacity op 0 te zetten
    mainContent.style.opacity = '0';

    // Na 100ms fade de hoofdcontent in en verwijder 'hidden' class
    setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.classList.remove('hidden');
    }, 100);

    // Contact cards - maak het hele blokje clickable
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        // Voeg cursor pointer toe voor UX
        card.style.cursor = 'pointer';

        // Voeg click event toe aan hele card
        card.addEventListener('click', function (e) {
            // Als er een link in de card is, voer deze uit
            const link = this.querySelector('a');
            if (link) {
                // Check of het een externe link is
                if (link.target === '_blank') {
                    window.open(link.href, '_blank');
                } else {
                    // Interne link (mailto of tel)
                    window.location.href = link.href;
                }
            }
        });
    });


});

// Profiel modal functionaliteit
// wanneer je op de pfp klikt, opent hij de geheime menu met extra informatie
document.querySelector('.profile-picture').addEventListener('click', function () {
    document.querySelector('.profile-info').classList.toggle('hidden');
});

// Verberg profiel info modal wanneer op de achtergrond wordt geklikt
document.querySelector('.profile-info').addEventListener('click', function (event) {
    if (event.target === this) {  // Alleen sluiten als op de achtergrond wordt geklikt, niet op de inhoud
        this.classList.add('hidden');
    }
});