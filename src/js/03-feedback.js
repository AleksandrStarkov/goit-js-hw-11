import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('textarea');
const LOCAL_TITLE_KEY = 'feedback-form-state';
const input = document.querySelector('input');

form.addEventListener('input', throttle(onInputText, 500));
form.addEventListener('submit', onFormSubmit);
onFormData();

const dataForm = { email: `${input.value}`, message: `${textarea.value}` };

function onInputText(event) {
  dataForm[event.target.name] = event.target.value;
  localStorage.setItem(LOCAL_TITLE_KEY, JSON.stringify(dataForm));
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(LOCAL_TITLE_KEY);
}

function onFormData() {
  const formData = JSON.parse(localStorage.getItem(LOCAL_TITLE_KEY));
  //   console.log(formData.email);
  if (formData) {
    input.value = formData.email || '';
    textarea.value = formData.message || '';
    // console.log(formData);
  }
}
