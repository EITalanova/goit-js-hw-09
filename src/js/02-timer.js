import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('input#datetime-picker');
const daysCount = document.querySelector('span[data-days]');
const hoursCount = document.querySelector('span[data-hours]');
const minutesCount = document.querySelector('span[data-minutes]');
const secondsCount = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentTime = Date.now();

    if (selectedDates[0].getTime() <= currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', 'true');
    } else {
      startBtn.removeAttribute('disabled');

      const g = () => {
        const k = setInterval(() => {

          // console.log(selectedDates[0]);
          // console.log(convertMs(selectedDates[0].getTime() - Date.now()));

          const { days, hours, minutes, seconds } = convertMs(
            selectedDates[0].getTime() - Date.now()
          );
          m({ days, hours, minutes, seconds });
        }, 1000);
      };

      startBtn.addEventListener('click', g);
    }
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

function m({ days, hours, minutes, seconds }) {
  daysCount.textContent = `${days}`;
  hoursCount.textContent = `${hours}`;
  minutesCount.textContent = `${minutes}`;
  secondsCount.textContent = `${seconds}`;
}

// console.log(convertMs(ms)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
