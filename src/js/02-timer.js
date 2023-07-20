import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("[data-start]");
const timerEl = document.querySelector(".timer");

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

document.addEventListener("DOMContentLoaded", function () {
    const datePicker = flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
            window.alert("Please choose a date in the future");
        } else {
            startBtn.removeAttribute("disabled");
        }
    },
});

startBtn.addEventListener("click", function () {
    const selectedDate = datePicker.selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
        return;
    }

    const intervalId = setInterval(() => {
        const timeDifference = selectedDate.getTime() - new Date().getTime();

        if (timeDifference <= 0) {
        clearInterval(intervalId);
        timerEl.innerHTML = "00:00:00:00";
        return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        const formattedTime = `${addLeadingZero(days)}:${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
        timerEl.innerHTML = formattedTime;
        }, 1000);
    });
});
