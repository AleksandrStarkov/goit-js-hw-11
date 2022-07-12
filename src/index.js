import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onFormInputClick, DEBOUNCE_DELAY));

function onFormInputClick(evt) {
  evt.preventDefault();
  const search = evt.target.value.trim();

  if (search === '') {
    clearForm();
    return;
  }

  fetchCountries(search)
    .then(arr => {
      if (arr.length > 10) {
        clearForm();

        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          {
            width: '450px',
            position: 'center-center',
            borderRadius: '30px',
          },
        );

        return;
      }

      if (arr.length >= 2 && arr.length <= 10) {
        createCountryList(arr);
        clearInfo();
        return;
      } else {
        createCountryList(arr);
        createCountryCard(arr);
        const countryName = document.querySelector('.name-country');
        countryName.classList.add('name-country-card');
      }
    })
    .catch(error => {
      clearForm();
      console.log(error);
      // Notiflix.Notify.failure('Oops, there is no country with that name');
      Notiflix.Notify.failure('Oops, there is no country with that name', {
        width: '450px',
        position: 'center-center',
        borderRadius: '30px',
      });
    });
}

function createCountryList(arr) {
  const createElements = arr
    .map(el => {
      return `<li class="item">
                <img class="flag" src="${el.flags.svg}" alt="country-flag"   width="400" />
                <h1 class="name-country">${el.name.official}</h1>
              </li>`;
    })
    .join('');

  listEl.innerHTML = createElements;
}

function createCountryCard(arr) {
  const { capital, population, languages } = arr[0];
  const valueLang = Object.values(languages);

  const createCard = `
                            <h2 class="data"> Capital: ${capital}</h2>
                            <h3 class="data"> Population: ${population}</h3>
                            <h3 class="data"> Languages: ${valueLang}</h3>
                           `;

  infoEl.innerHTML = createCard;
}

function clearInfo() {
  inputEl.innerHTML = '';
}

function clearForm() {
  listEl.innerHTML = '';
  infoEl.innerHTML = '';
}

// li class="country-item">
//                             <h2 class="data"> Population: ${population}</h2>
//                         </li>

//                         <li class="country-item">
//                             <h2 class="data"> Languages: ${valueLang}</h2>
//                         </li>
