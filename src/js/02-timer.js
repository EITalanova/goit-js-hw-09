import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('input#datetime-picker');
const daysCount = document.querySelector('span[data-days]');
const hoursCount = document.querySelector('span[data-hours]');
const minutesCount = document.querySelector('span[data-minutes]');
const secondsCount = document.querySelector('span[data-seconds]');
const timerBox = document.querySelector('.timer');
const numberBox = document.querySelectorAll('.field');

const options = {
  isActive: false,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    const onTimer = () => {
      if (this.isActive) {
        return;
      }
      const intervalId = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(
          selectedDates[0].getTime() - Date.now()
        );
         this.isActive = true;

        if (selectedDates[0].getTime() < Date.now()) {
          clearInterval(intervalId);
          this.isActive = true;
          return;
        }

        time({ days, hours, minutes, seconds });
      }, 1000);
    };
    startBtn.addEventListener('click', onTimer);
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return ({ days, hours, minutes, seconds });
}

function time({ days, hours, minutes, seconds }) {
  daysCount.textContent = addLeadingZero(days);
  hoursCount.textContent = addLeadingZero(hours);
  minutesCount.textContent = addLeadingZero(minutes);
  secondsCount.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  if (String(value).length <= 1) {
    return String(value).padStart(2, '0');
  }
  return `${value}`;
}

timerBox.style.display = 'flex';
timerBox.style.marginTop = '30px';
timerBox.style.gap = '15px';
timerBox.style.fontSize = '20px';

numberBox.forEach(number => {
  number.style.display = 'flex';
  number.style.flexDirection = 'column';
  number.style.alignItems = 'center';
});
