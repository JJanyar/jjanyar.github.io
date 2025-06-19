document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.style.opacity = '0';
    
    setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.classList.remove('hidden');
    }, 100);

    // Project slider navigation
    const slider = document.querySelector('.projects-slider');
    if (slider) {
        // Always show arrows on desktop
        const leftArrow = document.createElement('button');
        leftArrow.innerHTML = '<i class="ti ti-chevron-left"></i>';
        leftArrow.className = 'slider-arrow left-arrow';
        const rightArrow = document.createElement('button');
        rightArrow.innerHTML = '<i class="ti ti-chevron-right"></i>';
        rightArrow.className = 'slider-arrow right-arrow';
        slider.parentElement.style.position = 'relative';
        slider.parentElement.appendChild(leftArrow);
        slider.parentElement.appendChild(rightArrow);
        leftArrow.addEventListener('click', () => {
            slider.scrollBy({ left: -slider.offsetWidth * 0.8, behavior: 'smooth' });
        });
        rightArrow.addEventListener('click', () => {
            slider.scrollBy({ left: slider.offsetWidth * 0.8, behavior: 'smooth' });
        });
    }

    // Infinite carousel logic
    const track = document.querySelector('.carousel-track');
    let cards = Array.from(track.children);
    let current = 1; // Start with the second card as center
    let isAnimating = false;

    function renderCarousel() {
        // Only show 3 cards: prev, active, next
        track.innerHTML = '';
        const total = cards.length;
        // Get indices for prev, active, next
        const prevIdx = (current - 1 + total) % total;
        const nextIdx = (current + 1) % total;
        // Clone for display
        const prevCard = cards[prevIdx].cloneNode(true);
        const activeCard = cards[current].cloneNode(true);
        const nextCard = cards[nextIdx].cloneNode(true);
        prevCard.classList.remove('active');
        activeCard.classList.add('active');
        nextCard.classList.remove('active');
        track.appendChild(prevCard);
        track.appendChild(activeCard);
        track.appendChild(nextCard);
    }
    renderCarousel();

    function animateActiveCard(direction) {
        if (isAnimating) return;
        isAnimating = true;
        const cardsOnTrack = track.querySelectorAll('.project-card');
        const activeCard = cardsOnTrack[1]; // always the center
        // Animate out
        activeCard.classList.add(direction === 'left' ? 'card-animate-out-left' : 'card-animate-out-right');
        setTimeout(() => {
            // Remove out animation
            activeCard.classList.remove('card-animate-out-left', 'card-animate-out-right');
            // Update current index
            if (direction === 'left') {
                current = (current - 1 + cards.length) % cards.length;
            } else {
                current = (current + 1) % cards.length;
            }
            renderCarousel();
            // Animate in
            const newActiveCard = track.querySelectorAll('.project-card')[1];
            newActiveCard.classList.add(direction === 'left' ? 'card-animate-in-left' : 'card-animate-in-right');
            setTimeout(() => {
                newActiveCard.classList.remove('card-animate-in-left', 'card-animate-in-right');
                isAnimating = false;
            }, 350);
        }, 350);
    }
    document.querySelector('.carousel-arrow.left-arrow').addEventListener('click', function() {
        animateActiveCard('left');
    });
    document.querySelector('.carousel-arrow.right-arrow').addEventListener('click', function() {
        animateActiveCard('right');
    });
});

document.querySelector('.profile-picture').addEventListener('click', function() {
    document.querySelector('.profile-info').classList.toggle('hidden');
});

document.querySelector('.profile-info').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('hidden');
    }
});