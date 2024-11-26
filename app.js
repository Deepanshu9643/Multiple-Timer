let timers = [];
let timerId = 0;

const timerContainer = document.getElementById('timer-container');
const startTimerButton = document.getElementById('start-timer');

// Function to format seconds into HH:MM:SS format
function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours > 0 ? `${String(hours).padStart(2, '0')}:` : '';
  return `${formattedHours}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to render the list of timers
function renderTimers() {
  timerContainer.innerHTML = '';

  if (timers.length === 0) {
    const noTimersMessage = document.createElement('div');
    noTimersMessage.classList.add('no-timers-message');
    noTimersMessage.textContent = 'You have no timers currently';
    timerContainer.appendChild(noTimersMessage);
    return;
  }

  timers.forEach(timer => {
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    timerElement.id = `timer-${timer.id}`;
    timerElement.innerHTML = `
      <div class="timer-display">
        <div class="timer-time-left">${timer.isTimeUp ? 'Timer Is Up!' : formatTime(timer.totalSeconds)}</div>
      </div>
      <button class="stop-button" data-id="${timer.id}">${timer.isTimeUp ? 'Delete' : 'Stop'}</button>
    `;
    timerContainer.appendChild(timerElement);

    timerElement.querySelector('.stop-button').addEventListener('click', () => {
      stopTimer(timer);
    });
  });
}

// Function to update the timer display
function updateTimerDisplay(timer) {
  const timerElement = document.getElementById(`timer-${timer.id}`);
  if (timerElement) {
    const timeLeftElement = timerElement.querySelector('.timer-time-left');
    timeLeftElement.textContent = timer.isTimeUp ? 'Timer Is Up!' : formatTime(timer.totalSeconds);

    if (timer.isTimeUp) {
      timerElement.classList.add('time-up');
    }
  }
}

// Function to add a new timer
function addTimer(hours, minutes, seconds) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds <= 0) {
    alert('Please enter a valid time.');
    return;
  }

  const newTimer = {
    id: ++timerId,
    totalSeconds,
    intervalId: null,
    isTimeUp: false,
  };

  timers.push(newTimer);
  renderTimers();

  // Start the countdown
  newTimer.intervalId = setInterval(() => {
    if (newTimer.totalSeconds > 0) {
      newTimer.totalSeconds--;
      updateTimerDisplay(newTimer);
    } else {
      clearInterval(newTimer.intervalId);
      newTimer.isTimeUp = true;
      updateTimerDisplay(newTimer);

      // Play sound when timer ends
      const timerEndSound = document.getElementById('timer-end-sound');
      timerEndSound.play();
    }
  }, 1000);
}

// Function to stop and remove a timer
function stopTimer(timer) {
  clearInterval(timer.intervalId);
  timers = timers.filter(t => t.id !== timer.id);
  renderTimers();
}

// Event listener for the "Set" button
startTimerButton.addEventListener('click', () => {
  const hours = parseInt(document.getElementById('hours').value, 10) || 0;
  const minutes = parseInt(document.getElementById('minutes').value, 10) || 0;
  const seconds = parseInt(document.getElementById('seconds').value, 10) || 0;

  addTimer(hours, minutes, seconds);

  // Clear input fields
  document.getElementById('hours').value = '';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
});

// Initial render of timers (empty state)
renderTimers();
