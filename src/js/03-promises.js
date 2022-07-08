import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');
const btnSubmitEl = document.querySelector('button');

let delay = null;
let step = null;
let amount = [];
let position = 0;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formEl.addEventListener('submit', hendlerSubmit);

function hendlerSubmit(evt) {
  evt.preventDefault();
  amount.splice(0);
  btnSubmitEl.disabled = true;

  const input = evt.currentTarget.elements;

  delay = Number(input.delay.value);
  step = Number(input.step.value);
  const inputValue = Number(input.amount.value);

  for (let i = 1; i <= inputValue; i += 1) {
    amount.push(i);
  }

  amount.map(number => {
    position = number;
    if (position !== 1) {
      delay += step;
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `🥳 Fulfilled promise ${position} in ${delay}ms`,
        );
      })

      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `💥 Rejected promise ${position} in ${delay}ms`,
        );
      });
  });
}
