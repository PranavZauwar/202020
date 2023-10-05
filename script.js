let mainTimer = 1200; // 20 minutes in seconds
let timerInterval;
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const message = document.querySelector(".message");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const audio = document.getElementById("audio"); // Get the audio element

function updateTimerText() {
    const minutes = Math.floor(mainTimer / 60);
    const seconds = mainTimer % 60;
    minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function startMainTimer() {
    if (!timerInterval && mainTimer > 0) {
        timerInterval = setInterval(() => {
            mainTimer--;
            updateTimerText();

            if (mainTimer === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                showLookAwayMessage();
            }
        }, 1000);
        startButton.disabled = true;
        stopButton.disabled = false;
    }
}

function showLookAwayMessage() {
    message.style.display = "block";
    audio.play(); // Start playing the background music
    setTimeout(() => {
        message.style.display = "none";
        audio.pause(); // Pause the background music
        mainTimer = 1200; // Reset to 20 minutes
        updateTimerText();
        startMainTimer(); // Start the timer again
    }, 20000); // Show message for 20 seconds
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    mainTimer = 1200; // Reset to 20 minutes
    updateTimerText();
    startButton.disabled = false;
    stopButton.disabled = true;
    message.style.display = "none";
    audio.pause(); // Pause the background music
}

startButton.addEventListener("click", startMainTimer);
stopButton.addEventListener("click", stopTimer);

// Initial update of the timer text
updateTimerText();
