import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');

const starBtn = document.querySelector('[data-start]');
const daysVelue = document.querySelector('[data-days]');
const hoursVelue = document.querySelector('[ data-hours]');
const minutesVelue = document.querySelector('[data-minutes]');
const secondsVelue = document.querySelector('[ data-seconds]');
const options = document.querySelector('#datetime-picker');

// console.log(Date.now());

starBtn.setAttribute('disabled', 'disabled');

starBtn.addEventListener('click', () => {
  startTimer = setInterval(() => {
    if (selectedDate < Date.now()) {
      clearInterval(startTimer);
      options.removeAttribute('disabled');
      return;
    }
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysVelue.textContent = `${days}`;
    hoursVelue.textContent = `${hours}`;
    minutesVelue.textContent = `${minutes}`;
    secondsVelue.textContent = `${seconds}`;
    starBtn.setAttribute('disabled', 'disabled');
    options.setAttribute('disabled', 'disabled');
    convertMs(deltaTime);
  }, 1000);
});

let selectedDate = null;

flatpickr(options, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0) {
      Notiflix.Report.warning(
        'Warning! Dear consumer!!!',
        'Please choose a date in the future',
        'Choose another date',
      );
      return;
    } else {
      selectedDate = selectedDates[0];
      starBtn.removeAttribute('disabled');
    }
  },
});

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
