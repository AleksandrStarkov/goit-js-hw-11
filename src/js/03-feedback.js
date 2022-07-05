import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const textarea = document.querySelector('.feedback-form textarea');
const LOCAL_TITLE_KEY = 'feedback-form-state';
const input = document.querySelector('input');

form.addEventListener('input', throttle(onInputText, 500));
form.addEventListener('submit', onFormSubmit);

onFormData();
function onInputText(event) {
  const dataForm = { email: `${input.value}`, message: `${textarea.value}` };
  //   dataForm[event.target.name] = event.target.value;
  localStorage.setItem(LOCAL_TITLE_KEY, JSON.stringify(dataForm));
}

function onFormSubmit(event) {
  console.log({ email: `${input.value}`, message: `${textarea.value}` });
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(LOCAL_TITLE_KEY);
}

function onFormData() {
  const formData = JSON.parse(localStorage.getItem(LOCAL_TITLE_KEY));
  //   console.log(formData.email);
  if (formData) {
    input.value = formData.email;
    textarea.value = formData.message;
    // console.log(formData);
  }
}
