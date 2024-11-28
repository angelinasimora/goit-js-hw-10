import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let selectedDate = null;
let timerId = null;

// Налаштування для Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    selectedDate = selectedDates[0];

    if (selectedDate <= now) {
      iziToast.error({
        title: "Invalid Date",
        message: "Please choose a date in the future.",
        position: "topRight",
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// Ініціалізація Flatpickr
flatpickr(dateInput, options);

// Обробник для кнопки "Start"
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  dateInput.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const timeDiff = selectedDate - now;

    if (timeDiff <= 0) {
      clearInterval(timerId);
      resetUI(); // Активує інпут та залишає кнопку неактивною
      alert("Time is up!");
      return;
    }

    const time = convertMs(timeDiff);
    updateTimerUI(time);
  }, 1000);
});

// Функція для конвертації мілісекунд у дні, години, хвилини, секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

// Оновлення інтерфейсу
function updateTimerUI({ days, hours, minutes, seconds }) {
  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

// Скидання інтерфейсу після завершення таймера
function resetUI() {
  dateInput.disabled = false; // Інпут стає активним
  startButton.disabled = true; // Кнопка залишається неактивною
}

// Початкове повідомлення від iziToast
iziToast.show({
  title: "Hey :)",
  message: "How much time do you need?",
});
