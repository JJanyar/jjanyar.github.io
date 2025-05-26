
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.style.opacity = '0';
    
    setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.classList.remove('hidden');
    }, 100);
});

document.querySelector('.profile-picture').addEventListener('click', function() {
    document.querySelector('.profile-info').classList.toggle('hidden');
});

document.querySelector('.profile-info').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('hidden');
    }
});