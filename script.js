// DOM Elements
const display   = document.getElementById('display');
const startBtn  = document.getElementById('startBtn');
const pauseBtn  = document.getElementById('pauseBtn');
const resetBtn  = document.getElementById('resetBtn');
const lapBtn    = document.getElementById('lapBtn');
const lapsList  = document.getElementById('laps');

// State variables
let startTime     = 0;
let elapsedTime   = 0;
let timerInterval = null;
let isRunning     = false;
let lastLapTime   = 0;

// Format milliseconds into readable time string
function formatTime(ms) {
  const totalMs     = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const seconds     = totalSeconds % 60;
  const minutes     = Math.floor(totalSeconds / 60) % 60;
  const hours       = Math.floor(totalSeconds / 3600);

  const pad = (n) => String(n).padStart(2, '0');
  const msStr = String(Math.floor(totalMs / 10)).padStart(2, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${msStr}`;
  }
  return `${pad(minutes)}:${pad(seconds)}.${msStr}`;
}

// Update display using DOM manipulation (core skill)
function updateDisplay() {
  const currentTime = isRunning 
    ? Date.now() - startTime + elapsedTime 
    : elapsedTime;
  
  // Direct DOM textContent manipulation
  display.textContent = formatTime(currentTime);
}

// Start / Resume
function startTimer() {
  if (!isRunning) {
    startTime = Date.now();
    
    // Using setInterval (required skill)
    timerInterval = setInterval(updateDisplay, 10);
    
    isRunning = true;

    // DOM manipulation: enable/disable buttons
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled   = false;
    resetBtn.disabled = false;
  }
}

// Pause
function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime + elapsedTime;
    isRunning = false;

    // DOM manipulation
    startBtn.disabled = false;
    startBtn.textContent = "Resume";
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
  }
}

// Reset
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  startTime = 0;
  lastLapTime = 0;

  // DOM manipulation
  display.textContent = "00:00:00.00";
  lapsList.innerHTML = "";

  startBtn.disabled = false;
  startBtn.textContent = "Start";
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
  resetBtn.disabled = true;
}

// Record Lap
function recordLap() {
  if (!isRunning) return;

  const now = Date.now();
  const currentElapsed = now - startTime + elapsedTime;
  const lapDuration = currentElapsed - lastLapTime;
  lastLapTime = currentElapsed;

  // Create new lap item using DOM manipulation (core skill)
  const li = document.createElement('li');
  li.className = 'lap-item';

  li.innerHTML = `
    <span class="lap-number">Lap ${lapsList.children.length + 1}</span>
    <span class="lap-time">${formatTime(currentElapsed)}</span>
    <span class="lap-diff">+${formatTime(lapDuration)}</span>
  `;

  // Append to list (DOM manipulation)
  lapsList.appendChild(li);

  // Auto-scroll to bottom
  lapsList.scrollTop = lapsList.scrollHeight;
}

// Event Listeners (required skill)
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);