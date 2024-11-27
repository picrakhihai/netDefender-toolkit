const flashcards = document.querySelectorAll('.flash-card');
let isActivated = false;

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Activate flashcards near the bottom
    if (scrollTop + winHeight >= docHeight - 800 && !isActivated) {
        isActivated = true;
        flashcards.forEach(card => {
            card.classList.add('active');
        });
    }

    // Deactivate flashcards when scrolling up
    if (scrollTop + winHeight < docHeight - 500 && isActivated) {
        isActivated = false;
        flashcards.forEach(card => {
            card.classList.remove('active');
        });
    }
});