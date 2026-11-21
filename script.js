const soundCards = document.querySelectorAll('.sound-card');
const stopAllBtn = document.getElementById('stop-all-btn');

soundCards.forEach(card => {
    const playBtn = card.querySelector('.toggle-btn');
    const volumeSlider = card.querySelector('.volume-slider');
    const audio = card.querySelector('audio');

    // Set initial volume based on slider default
    audio.volume = volumeSlider.value;

    // Play/Pause toggle with async error handling
    playBtn.addEventListener('click', async () => {
        try {
            if (audio.paused) {
                await audio.play();
                card.classList.add('active');
                playBtn.textContent = 'Pause';
            } else {
                audio.pause();
                card.classList.remove('active');
                playBtn.textContent = 'Play';
            }
        } catch (error) {
            console.error("Audio playback failed:", error);
            alert("Unable to play this audio file. Try using a local .mp3 file instead!");
        }
    });

    // Volume adjustment
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });
});

// Stop all sounds button
stopAllBtn.addEventListener('click', () => {
    soundCards.forEach(card => {
        const playBtn = card.querySelector('.toggle-btn');
        const audio = card.querySelector('audio');
        
        audio.pause();
        audio.currentTime = 0;
        card.classList.remove('active');
        playBtn.textContent = 'Play';
    });
});
let countdown;
let timeLeft = 25 * 60; // default 25 minutes in seconds
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start-timer');
const pauseBtn = document.getElementById('pause-timer');
const resetBtn = document.getElementById('reset-timer');
const modeButtons = document.querySelectorAll('.mode-btn');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(countdown);
            isRunning = false;
            alert('Time is up! Take a break or start a new session.');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(countdown);
    isRunning = false;
}

function resetTimer(duration = 25) {
    clearInterval(countdown);
    isRunning = false;
    timeLeft = duration * 60;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', () => {
    const activeMode = document.querySelector('.mode-btn.active');
    resetTimer(activeMode.dataset.time);
});

modeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        modeButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const duration = parseInt(e.target.dataset.time);
        resetTimer(duration);
    });
});