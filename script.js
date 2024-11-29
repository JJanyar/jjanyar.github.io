// reset bij elke refresh zodat de start engine button niet ingedrukt blijft.
        window.onload = function() {
            document.getElementById('engineButton').checked = false;
        };

        document.querySelector('.container input').addEventListener('change', function() {
            if (this.checked) {
                // speelt de carengine sound alsje op het knop drukt.
                const engineSound = document.getElementById('engineSound'); // Pakt de engineSound var van html (gelinkt aan carengine.mp3).
                engineSound.currentTime = 0; // Reset
                engineSound.play();

                // stopt de start up sound, want daarna rijd hij weg
                setTimeout(() => {
                    engineSound.pause();
                    engineSound.currentTime = 0;
                }, 3400); // Hoelang de geluid afspeelt - 3.4 seconde

                // speelt de animatie alsje op het knop drukt
                document.querySelector('.circle').classList.add('push-animation'); // Pakt de gegevens van css voor de animatie
                
                setTimeout(() => {
                    document.querySelector('.loading-screen').style.opacity = '0';
                    document.querySelector('.main-content').classList.remove('hidden');
                    setTimeout(() => {
                        document.querySelector('.loading-screen').style.display = 'none';
                    }, 1000);
                }, 500);
            }
        });
        // Alsje op mijn profiel foto klikt, verschijnt er een menu.
        document.querySelector('.profile-picture').addEventListener('click', function() {
            document.querySelector('.profile-info').classList.toggle('hidden'); // Verandert "hidden" de tegenovergestelde
        });

        // Alsje op het achtergrond klikt, dan maakt hij de menu weer hidden.
        document.querySelector('.profile-info').addEventListener('click', function(event) {
            if (event.target === this) { // Bekijkt of het de achtergrond is of niet
                this.classList.add('hidden');
            }
        });