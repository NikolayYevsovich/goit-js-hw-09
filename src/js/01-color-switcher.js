const refs = {
  startButtonEl: document.querySelector('button[data-start]'),
  stopButtonEl: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

let timerOn = null;
refs.startButtonEl.addEventListener('click', onStartButtonClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartButtonClick() {
  timerOn = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startButtonEl.disabled = true;
  refs.stopButtonEl.disabled = false;
}

refs.stopButtonEl.addEventListener('click', onStopButtonClick);

function onStopButtonClick() {
  clearInterval(timerOn);
  refs.startButtonEl.disabled = false;
  refs.stopButtonEl.disabled = true;
}
