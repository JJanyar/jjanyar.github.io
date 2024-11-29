// Add fade-in animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('.main-content');
    
    // Start with opacity 0
    mainContent.style.opacity = '0';
    
    // After a small delay, fade in the content
    setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.classList.remove('hidden');
    }, 100);
});

// Profile picture click handler
document.querySelector('.profile-picture').addEventListener('click', function() {
    document.querySelector('.profile-info').classList.toggle('hidden');
});

// Profile info background click handler
document.querySelector('.profile-info').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('hidden');
    }
});