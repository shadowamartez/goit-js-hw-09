const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener("click", startChanging);
stopBtn.addEventListener("click", stopChanging);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let changeColorInterval;

function startChanging() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    changeColorInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopChanging() {
    startBtn.disabled = false;
    stopBtn.disabled = true;

    clearInterval(changeColorInterval);
}
