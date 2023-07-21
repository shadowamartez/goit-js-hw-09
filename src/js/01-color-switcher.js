const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener("click", startChanging);
stopBtn.addEventListener("click", stopChanging);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let changeColorInterval;

function toggleButtonState(change) {
    startBtn.disabled = change;
    stopBtn.disabled = !change;
}

function startChanging() {
    toggleButtonState(true);

    changeColorInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopChanging() {
    toggleButtonState(false);

    clearInterval(changeColorInterval);
}
