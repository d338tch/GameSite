document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.memory-card');
    let flippedCards = [];
    let matchedPairs = 0; // Tracks the number of matched pairs
    const revealButton = document.getElementById('reveal-button');

    cards.forEach(card => card.addEventListener('click', flipCard));

    revealButton.addEventListener('click', () => {
        // Reveal all cards
        cards.forEach(card => card.classList.add('flip'));
        
        // Hide all cards after 5 seconds
        setTimeout(() => {
            cards.forEach(card => card.classList.remove('flip'));
        }, 1500); // 5000 milliseconds = 5 seconds
    });

    function flipCard() {
        if (flippedCards.includes(this) || flippedCards.length >= 2 || this.classList.contains('flip')) {
            return; // Prevents flipping more than two cards, re-flipping a card, or flipping during reveal
        }

        this.classList.add('flip');
        flippedCards.push(this);

        // Check for Joker selection
        if (this.dataset.framework === 'joker') {
            setTimeout(() => {
                alert('Game over! You selected the Joker.');
                restartGame();
            }, 500);
            return;
        }

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        if (flippedCards[0].dataset.framework === flippedCards[1].dataset.framework) {
            disableCards();
            matchedPairs++;
            if (matchedPairs === 4) { // Assuming 4 pairs to win
                document.getElementById('congratsModal').style.display = "flex"; // Show modal
                setupNextButton();
            }
        } else {
            // Incorrect pair selected
            setTimeout(() => {
                alert("You've selected the wrong pair. Please start again.");
                unflipCards();
            }, 500); // Gives time to memorize the cards
        }
    }

    function disableCards() {
        flippedCards.forEach(card => card.removeEventListener('click', flipCard));
        flippedCards = [];
    }

    function unflipCards() {
        flippedCards.forEach(card => {
            card.classList.remove('flip');
        });
        flippedCards = [];
    }

    function restartGame() {
        // Ensure there's time to see the Joker card before restarting
        setTimeout(() => {
            cards.forEach(card => {
                card.classList.remove('flip');
                card.addEventListener('click', flipCard);
            });
            matchedPairs = 0;
            flippedCards = [];
        }, 500);
    }

    function setupNextButton() {
        // Add the event listener for the 'Next' button only once
        const nextButton = document.getElementById('nextButton');
        nextButton.removeEventListener('click', handleNextButtonClick); // Remove any existing listener to avoid duplicates
        nextButton.addEventListener('click', handleNextButtonClick);
    }

    function handleNextButtonClick() {
        window.location.href = 'code.html'; // Redirects to 'code.html'
    }
});
