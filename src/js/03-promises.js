import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  delayInputEl: document.querySelector('input[name="delay"]'),
  stepInputEl: document.querySelector('input[name="step"]'),
  amountInputEl: document.querySelector('input[name="amount"]'),
};

console.log(refs.formEl);
console.log(refs.delayInputEl);
console.log(refs.stepInputEl);
console.log(refs.amountInputEl);

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  let delay = Number(refs.delayInputEl.value);
  const step = Number(refs.stepInputEl.value);
  const amount = Number(refs.stepInputEl.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
