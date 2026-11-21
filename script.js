const soundCards = document.querySelectorAll('.sound-card');
const stopAllBtn = document.getElementById('stop-all-btn');

soundCards.forEach(card => {
    const playBtn = card.querySelector('.toggle-btn');
    const volumeSlider = card.querySelector('.volume-slider');
    const audio = card.querySelector('audio');

    audio.volume = volumeSlider.value;

    playBtn.addEventListener('click', async () => {
        if (audio.paused) {
            playBtn.textContent = 'Loading...';
            try {
                await audio.play();
                card.classList.add('active');
                playBtn.textContent = 'Pause';
            } catch (error) {
                if (error.name === 'AbortError') return;

                console.error('Audio playback failed:', error.name, audio.src);
                playBtn.textContent = 'Play';
                alert('Unable to play this sound. Check that the file exists.');
            }
        } else {
            audio.pause();
            card.classList.remove('active');
            playBtn.textContent = 'Play';
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });
});

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
let currentDuration = 25;
let timeLeft = currentDuration * 60;
let endTime = 0;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start-timer');
const pauseBtn = document.getElementById('pause-timer');
const resetBtn = document.getElementById('reset-timer');
const modeButtons = document.querySelectorAll('.mode-btn');

function updateDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    minutesDisplay.textContent = minutes;
    secondsDisplay.textContent = seconds;
    document.title = isRunning ? `${minutes}:${seconds} - Soundscape` : 'Soundscape Mixer';
}

function tick() {
    timeLeft = Math.max(0, Math.round((endTime - Date.now()) / 1000));
    updateDisplay();

    if (timeLeft === 0) {
        clearInterval(countdown);
        isRunning = false;
        document.title = 'Soundscape Mixer';
        alert('Time is up! Take a break or start a new session.');
    }
}

function startTimer() {
    if (isRunning) return;

    if (timeLeft <= 0) {
        timeLeft = currentDuration * 60;
    }

    isRunning = true;
    endTime = Date.now() + timeLeft * 1000;
    countdown = setInterval(tick, 250);
    tick();
}

function pauseTimer() {
    clearInterval(countdown);
    isRunning = false;
    updateDisplay();
}

function resetTimer(duration = currentDuration) {
    clearInterval(countdown);
    isRunning = false;
    currentDuration = duration;
    timeLeft = duration * 60;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', () => resetTimer(currentDuration));

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (customInput) customInput.value = '';
        if (customError) customError.textContent = '';

        resetTimer(parseInt(btn.dataset.time, 10));
    });
});

const customInput = document.getElementById('custom-minutes');
const setCustomBtn = document.getElementById('set-custom');
const customError = document.getElementById('custom-error');

function setCustomTime() {
    const minutes = parseInt(customInput.value, 10);

    if (isNaN(minutes) || minutes < 1 || minutes > 180) {
        customError.textContent = 'Enter a whole number from 1 to 180.';
        return;
    }

    customError.textContent = '';
    modeButtons.forEach(b => b.classList.remove('active'));
    resetTimer(minutes);
}

if (setCustomBtn && customInput) {
    setCustomBtn.addEventListener('click', setCustomTime);

    customInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') setCustomTime();
    });
}

updateDisplay();
