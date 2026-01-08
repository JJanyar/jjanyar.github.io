// wachten op het laden
document.addEventListener('DOMContentLoaded', function() {
    // Selecteer de hoofdcontent element
    const mainContent = document.querySelector('.main-content');
    
    // Verberg de hoofdcontent door opacity op 0 te zetten
    mainContent.style.opacity = '0';
    
    // Na 100ms fade de hoofdcontent in en verwijder 'hidden' class
    setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.classList.remove('hidden');
    }, 100);

    // Projecten navigatie slider
    const slider = document.querySelector('.projects-slider');
    if (slider) {
        // Maak linker navigatiepijl aan met Tabler icon
        const leftArrow = document.createElement('button');
        leftArrow.innerHTML = '<i class="ti ti-chevron-left"></i>'; 
        leftArrow.className = 'slider-arrow left-arrow'; 
        
        // Maak rechter navigatiepijl aan met Tabler icon
        const rightArrow = document.createElement('button');
        rightArrow.innerHTML = '<i class="ti ti-chevron-right"></i>'; 
        rightArrow.className = 'slider-arrow right-arrow'; 
        
        // Zet de parent container op relative voor positionering van pijlen
        slider.parentElement.style.position = 'relative';
        // Voeg pijlen toe aan de parent container
        slider.parentElement.appendChild(leftArrow);
        slider.parentElement.appendChild(rightArrow);
        
        // EventListener voor linker pijl: scroll slider naar links
        leftArrow.addEventListener('click', () => {
            slider.scrollBy({ left: -slider.offsetWidth * 0.8, behavior: 'smooth' });
        });
        
        // EventListener voor rechter pijl: scroll slider naar rechts
        rightArrow.addEventListener('click', () => {
            slider.scrollBy({ left: slider.offsetWidth * 0.8, behavior: 'smooth' });
        });
    }

    // Carousel functionaliteit voor oneindige scroll
    const track = document.querySelector('.carousel-track'); 
    let cards = Array.from(track.children); // Alle kaarten in een array
    let current = 1;  // Start met de tweede kaart als actief
    let isAnimating = false;  // Voorkom overlappende animaties

    // Render de carousel met drie kaarten: vorige, huidige, volgende
    function renderCarousel() {
        track.innerHTML = '';
        const total = cards.length;  // Totaal aantal kaarten
        
        // Bereken indexen van vorige en volgende kaart
        const prevIdx = (current - 1 + total) % total;
        const nextIdx = (current + 1) % total;
        
        // Maak kopieën van de kaarten
        const prevCard = cards[prevIdx].cloneNode(true);
        const activeCard = cards[current].cloneNode(true);
        const nextCard = cards[nextIdx].cloneNode(true);

        // Alleen de actieve kaart krijgt de 'active' class
        prevCard.classList.remove('active');
        activeCard.classList.add('active');
        nextCard.classList.remove('active');
        
        // Voeg kaarten toe aan de track
        track.appendChild(prevCard);
        track.appendChild(activeCard);
        track.appendChild(nextCard);
    }
    
    // Render carousel bij laden van de pagina
    renderCarousel();

    // Animatie voor het wisselen van actieve kaart
    function animateActiveCard(direction) {
        if (isAnimating) return; // Voorkom dubbele animaties
        isAnimating = true;
        
        // Selecteer zichtbare kaarten in de carousel
        const cardsOnTrack = track.querySelectorAll('.project-card');
        const activeCard = cardsOnTrack[1];  // Middelste kaart is actief
        
        // Voeg animatie class toe afhankelijk van richting
        activeCard.classList.add(direction === 'left' ? 'card-animate-out-left' : 'card-animate-out-right');
        
        // Wacht tot animatie klaar is (350ms)
        setTimeout(() => {
            // Verwijder animatie classes
            activeCard.classList.remove('card-animate-out-left', 'card-animate-out-right');
            
            // Update index van actieve kaart
            if (direction === 'left') {
                current = (current - 1 + cards.length) % cards.length;
            } else {
                current = (current + 1) % cards.length;
            }
            
            // Render carousel opnieuw
            renderCarousel();
            
            // Voeg animatie toe aan nieuwe actieve kaart
            const newActiveCard = track.querySelectorAll('.project-card')[1];
            newActiveCard.classList.add(direction === 'left' ? 'card-animate-in-left' : 'card-animate-in-right');
            
            // Wacht tot animatie klaar is (350ms)
            setTimeout(() => {
                newActiveCard.classList.remove('card-animate-in-left', 'card-animate-in-right');
                isAnimating = false; // Animatie klaar
            }, 350);
        }, 350);
    }

    // Event listeners voor carousel navigatiepijlen
    // Linker pijl: beweeg carousel naar links
    document.querySelector('.carousel-arrow.left-arrow').addEventListener('click', function() {
        animateActiveCard('left');
    });

    // Rechter pijl: beweeg carousel naar rechts
    document.querySelector('.carousel-arrow.right-arrow').addEventListener('click', function() {
        animateActiveCard('right');
    });
});

// Profiel modal functionaliteit
// wanneer je op de pfp klikt, opent hij de geheime menu met extra informatie
document.querySelector('.profile-picture').addEventListener('click', function() {
    document.querySelector('.profile-info').classList.toggle('hidden');
});

// Verberg profiel info modal wanneer op de achtergrond wordt geklikt
document.querySelector('.profile-info').addEventListener('click', function(event) {
    if (event.target === this) {  // Alleen sluiten als op de achtergrond wordt geklikt, niet op de inhoud
        this.classList.add('hidden');
    }
});