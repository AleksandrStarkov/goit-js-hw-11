function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', 'disabled');
  btnStop.removeAttribute('disabled', 'null');
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    btnStop.style.backgroundColor = getRandomHexColor();
    btnStart.style.backgroundColor = getRandomHexColor();
  }, 1000);
});
btnStop.setAttribute('disabled', 'disabled');
btnStop.addEventListener('click', () => {
  btnStop.setAttribute('disabled', 'null');
  clearInterval(timerId);
  console.log(btnStop);
  btnStart.removeAttribute('disabled', 'null');
});
