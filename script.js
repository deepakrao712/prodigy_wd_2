let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapTime = 0;
let lapCount = 1;

function format(ms) {
  const date = new Date(ms);
  const h = String(date.getUTCHours()).padStart(2, '0');
  const m = String(date.getUTCMinutes()).padStart(2, '0');
  const s = String(date.getUTCSeconds()).padStart(2, '0');
  const cs = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${h}:${m}:${s}.${cs}`;
}

function updateDisplay() {
  document.getElementById('display').textContent = format(elapsedTime);
}

function start() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

function pause() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  lapTime = 0;
  lapCount = 1;
  updateDisplay();
  document.getElementById("laps").innerHTML = '';
}

function lap() {
  if (timerInterval) {
    const lapNow = elapsedTime;
    const lapDuration = lapNow - lapTime;
    const lapText = `Lap ${lapCount++}: ${format(lapDuration)} (Total: ${format(lapNow)})`;
    const li = document.createElement("li");
    li.textContent = lapText;
    document.getElementById("laps").prepend(li);
    lapTime = lapNow;
  }
}

function playSound() {
  document.getElementById('clickSound').play();
}

function setBackground() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) {
    document.body.classList.add("night");
    document.body.classList.remove("day");
  } else {
    document.body.classList.add("day");
    document.body.classList.remove("night");
  }
}

setBackground();