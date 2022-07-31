import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
  daysValueEl: document.querySelector('span[data-days]'),
  hoursValueEl: document.querySelector('span[data-hours]'),
  minutesValueEl: document.querySelector('span[data-minutes]'),
  secondsValueEl: document.querySelector('span[data-seconds]'),
};

refs.buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr(refs.inputEl, options);

function onClose(selectedDates) {
  const currentTime = Date.now();
  const deltaTime = selectedDates[0] - currentTime;
  const alertMaessage = 'Please choose a date in the future';
  if (deltaTime < 0) {
    alert(alertMaessage);
  } else {
    refs.buttonStart.disabled = false;
    refs.buttonStart.addEventListener('click', () =>
      setInterval(countdownStart, 1000)
    );
    const properTime = convertMs(deltaTime);
    console.log(properTime);
  }
}

function countdownStart({ days, hours, minutes, seconds }) {
  refs.daysValueEl.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutesValueEl.textContent = `${minutes}`;
  refs.secondsValueEl.textContent = `${seconds}`;
}

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
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
