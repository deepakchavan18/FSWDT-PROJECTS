let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

function displayTime() {
  const display = document.querySelector('.display');
  display.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}<span class="milliseconds">.${milliseconds.toString().padStart(2, '0')}</span>`;
}

function startTimer() {
  timer = setInterval(function () {
    milliseconds++;
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    displayTime();
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  stopTimer();
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  displayTime();
}

document.querySelector('.start').addEventListener('click', startTimer);
document.querySelector('.stop').addEventListener('click', stopTimer);
document.querySelector('.reset').addEventListener('click', resetTimer);
