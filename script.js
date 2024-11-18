        // reset bij elke refresh zodat de start engine button niet het zelfde blijft.
        window.onload = function() {
            document.getElementById('engineButton').checked = false;
        };

        document.querySelector('.container input').addEventListener('change', function() {
            if (this.checked) {
                // speelt de carengine alsje op het knop drukt.
                const engineSound = document.getElementById('engineSound');
                engineSound.currentTime = 0; // Reset sound to start
                engineSound.play();

                // Stop the sound after 3 seconds
                setTimeout(() => {
                    engineSound.pause();
                    engineSound.currentTime = 0;
                }, 3400);

                // speelt de animatie alsje op het knop drukt.
                document.querySelector('.circle').classList.add('push-animation');
                
                setTimeout(() => {
                    document.querySelector('.loading-screen').style.opacity = '0';
                    document.querySelector('.main-content').classList.remove('hidden');
                    setTimeout(() => {
                        document.querySelector('.loading-screen').style.display = 'none';
                    }, 1000);
                }, 500);
            }
        });

        document.querySelector('.profile-picture').addEventListener('click', function() {
            document.querySelector('.profile-info').classList.toggle('hidden');
        });

        // Add this event listener to close the profile info when clicking outside
        document.querySelector('.profile-info').addEventListener('click', function(event) {
            if (event.target === this) { // Check if the click is on the background
                this.classList.add('hidden'); // Hide the profile info
            }
        });