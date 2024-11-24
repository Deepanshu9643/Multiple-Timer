document.getElementById('set').addEventListener('click', function() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (totalSeconds > 0) {
        createTimer(totalSeconds);
    }
});

function createTimer(duration) {
    const timerSection = document.getElementById('timers-section');
    const timerElement = document.createElement('div');
    timerElement.className = 'timer';
    
    const timeDisplay = document.createElement('span');
    const stopButton = document.createElement('button');
    stopButton.textContent = 'Stop Timer';
    // stopButton.style.backgroundColor="#34344A";

    // if(timeDisplay=="Time is up!")
    // {
    //     stopButton.style.backgroundColor="#34344A";
    //     stopButton.style.color="white";

    // }
    stopButton.className="stopbtn";
    // stopButton.style.backgroundColor="black";
    timerElement.appendChild(timeDisplay);
    timerElement.appendChild(stopButton);
    timerSection.appendChild(timerElement);

    let remainingSeconds = duration;
    const intervalId = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            const hrs = Math.floor(remainingSeconds / 3600);
            const mins = Math.floor((remainingSeconds % 3600) / 60);
            const secs = remainingSeconds % 60;
            timeDisplay.textContent =`${hrs}h ${mins}m ${secs}s`;
        } else {
            clearInterval(intervalId);
            timerElement.className = 'timer end';
            timeDisplay.textContent = 'Time is up!';
            playAlert();
        }
    }, 1000);

    stopButton.addEventListener('click', function() {
        clearInterval(intervalId);
        timerSection.removeChild(timerElement);
    });
}

function playAlert() {
    const audio = new Audio('https://storage.googleapis.com/acciojob-open-file-collections/ab49cbce-b4a4-42c9-bf99-8952f45bdf04_image.gif.mp3'); // Ensure you have an alert.mp3 file in your project directory
    audio.play();
}
function displayGif(timerElement) {
    const gifElement = document.createElement("img");
    gifElement.src = "https://storage.googleapis.com/acciojob-open-file-collections/ab49cbce-b4a4-42c9-bf99-8952f45bdf04_image.gif";
    gifElement.alt = "Timer Ended";
    gifElement.style.width = "100%";
    gifElement.style.borderRadius = "5px";
  
    // Replace timer display with GIF
    timerElement.innerHTML = ""; // Clear existing content
    timerElement.appendChild(gifElement);
  }