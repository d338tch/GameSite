// Tracking the completion of each challenge
var challenge1Completed = false;
var challenge2Completed = false;
var challenge3Completed = false;

function checkAnswer1() {
    var answer = document.getElementById("answer1").value.toLowerCase();
    if (answer === "pen") {
        document.getElementById("feedback1").innerText = "Correct!";
        challenge1Completed = true; 
        checkAllChallengesCompleted(); 
    } else {
        document.getElementById("feedback1").innerText = "Try again.";
    }
}

function checkAnswer2() {
    var answer = document.getElementById("answer2").value.toLowerCase();
    if (answer === "book") {
        document.getElementById("feedback2").innerText = "Correct!";
        challenge2Completed = true; // Update the completion status
        checkAllChallengesCompleted(); // Check if all challenges are completed
    } else {
        document.getElementById("feedback2").innerText = "Try again.";
    }
}

function checkSentence() {
    var blank1 = document.getElementById("blank1").value.toLowerCase();
    var blank2 = document.getElementById("blank2").value.toLowerCase();
    if (blank1 === "hunger games" && blank2 === "cardio") {
        document.getElementById("feedback3").innerText = "Well done!";
        challenge3Completed = true; 
        checkAllChallengesCompleted(); 
    } else {
        document.getElementById("feedback3").innerText = "Not quite right. Think about the hidden red text.";
    }
}

function checkAllChallengesCompleted() {
    if (challenge1Completed && challenge2Completed && challenge3Completed) {
        showCongratsPopup();
    }
}

function showCongratsPopup() {
    document.getElementById("congratsPopup").style.display = "block";
    addBasicConfetti(); 
}

function closePopup() {
    document.getElementById("congratsPopup").style.display = "none";
    
}

// Function for confetti effect
function addBasicConfetti() {
    for (let i = 0; i < 200; i++) { //  200 pieces of confetti
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti');
        confettiPiece.style.left = `${Math.random() * 100}vw`; // Randomize starting position
        confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Randomize color
        confettiPiece.style.animationDuration = `${Math.random() * 2 + 1}s`; // Randomize animation duration
        document.body.appendChild(confettiPiece);
        
        
        confettiPiece.addEventListener('animationend', function() {
            confettiPiece.remove();
        });
    }
}
